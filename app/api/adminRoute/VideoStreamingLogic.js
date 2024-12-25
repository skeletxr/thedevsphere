import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import { supabase } from '@/supabase';
 

dotenv.config(); // Load environment variables

// Paths for credentials and tokens
const TOKEN_PATH = path.resolve('./token.json');  // Ensure it's resolved to an absolute path

// Helper to authorize and return Google Drive instance
export async function authorize() {
  try {
    const credentials = {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uris: process.env.GOOGLE_REDIRECT_URIS.split(','),
    };

    const oAuth2Client = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0]
    );
console.log('Resolved token path:', TOKEN_PATH);

console.log("oAuth2Client",fs.existsSync(TOKEN_PATH))
    if (fs.existsSync(TOKEN_PATH)) {
      const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
      console.log("tokens",token)
      oAuth2Client.setCredentials(token);

      if (new Date() >= new Date(token.expiry_date)) {
        console.log('Token expired. Refreshing...');
        await refreshAccessToken(oAuth2Client);
      }
    } else {
      await getAccessToken(oAuth2Client);
    }

    return google.drive({ version: 'v3', auth: oAuth2Client });
  } catch (error) {
    console.error('Authorization error:', error.message);
    throw error;
  }
}

// Refresh the access token
async function refreshAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    oAuth2Client.refreshAccessToken((err, tokens) => {
      if (err) return reject(`Error refreshing access token: ${err.message}`);
      oAuth2Client.setCredentials(tokens);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens)); // Save new token
      resolve(oAuth2Client);
    });
  });
}

// Get a new access token using the OAuth flow
function getAccessToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file'],
    });
    console.log('Authorize this app by visiting this URL:', authUrl);

    const input = require('prompt-sync')();
    const code = input('Enter the code from that page here: ').trim();

    if (!code) {
      return reject("No code entered.");
    }

    console.log("Inputted code:", code);

    oAuth2Client.getToken(code, (err, token) => {

      console.log("tokes",token)
      if (err) {
        console.error('Error retrieving access token:', err.response?.data || err.message);
        return reject(err);
      }

      console.log('Access token retrieved successfully:', token);
      oAuth2Client.setCredentials(token);

      // Save the token to token.json
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log('Token stored to', TOKEN_PATH);

      resolve(oAuth2Client);
    });
  });
}




// List all folders
export async function listAllFolders(folderId) {
  try {
    const drive = await authorize();
    let allFiles = [];
    let pageToken = null;

    do {

      const res = await drive.files.list({
        q: folderId 
          ? `'${folderId}' in parents and (mimeType = 'video/mp2t' or mimeType = 'application/vnd.apple.mpegurl')`
          : "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
        fields: "nextPageToken, files(id, name)",
        pageToken: pageToken,
      });

      if (res?.data?.files) {
        allFiles = allFiles.concat(res.data.files);
        pageToken = res.data.nextPageToken;
      } else {
        throw new Error('Unexpected response format or no files found');
      }
    } while (pageToken);

    return allFiles;
  } catch (error) {
    console.error('Error listing folders:', error.message);
    throw error;
  }
}

// Create a folder in Google Drive
export async function createDriveFolder(drive, folderName) {
  try {
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };
    const folder = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    return folder.data.id;
  } catch (error) {
    console.error('Error creating folder:', error.message);
    throw error;
  }
}

// Upload a file to a specific folder
export async function uploadFile(drive, filePath, fileName, folderId) {
  try {
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };
    const media = {
      mimeType: fileName.endsWith('.m3u8')
        ? 'application/vnd.apple.mpegurl'
        : 'video/mp2t',
      body: fs.createReadStream(filePath),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id',
    });
    return file.data.id;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
}

// Upload all files in a local folder
export async function uploadFolder(drive, localFolderPath, driveFolderId) {
  const files = fs.readdirSync(localFolderPath);

  for (const file of files) {
    const filePath = path.join(localFolderPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      await uploadFile(drive, filePath, file, driveFolderId);
    }
  }
}

// Stream a .ts file from Google Drive
export async function streamTsFile(file, res) {
  try {
    const drive = await authorize();
    const response = await drive.files.get(
      { fileId: file.id, alt: 'media' },
      { responseType: 'stream' }
    );

    response.data.pipe(res);
  } catch (error) {
    console.error('Error streaming .ts file:', error.message);
    res.status(500).send('Error streaming the file');
  }
}

// Fetch file contents
export async function fetchFileContents(fileId) {
  try {
    const drive = await authorize();
    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    let content = '';
    return new Promise((resolve, reject) => {
      response.data
        .on('data', (chunk) => {
          content += chunk.toString();
        })
        .on('end', () => resolve(content))
        .on('error', (err) => reject(err));
    });
  } catch (error) {
    console.error('Error fetching file contents:', error.message);
    throw error;
  }
}






export async function upsertPlaylists(users, doc, videoType) {
  try {
    // Convert doc object to an array of video objects
    const videos = Object.values(doc)
      .filter(item => item.id && item.title) // Ensure valid video objects
      .map(item => ({ id: item.id, title: item.title, type: videoType }));

    const results = []; // Array to hold results for all users

    // Iterate over each userId in the users array
    for (const userId of users) {
      const userIdText = userId.toString(); // Ensure userId is treated as TEXT

      // Iterate over each video
      for (const video of videos) {
        // First, check if the video already exists for the user and videoType
        const { data: existingVideos, error: fetchError } = await supabase
          .from('playlist')
          .select('video_id')
          .eq('user_id', userIdText)  // Ensure user_id is treated as TEXT
          .eq('video_type', videoType) // Filter by video type
          .eq('video_id', video.id);  // Filter by video ID

        if (fetchError) throw fetchError;

        // If the video already exists for this user and video type, skip adding it
        if (existingVideos.length > 0) {
          console.log(`Video ${video.title} of type ${videoType} already exists for user ${userIdText}. Skipping.`);
        } else {
          // Insert the new video if it does not exist
          const { error: upsertError } = await supabase
            .from('playlist')
            .upsert([
              {
                user_id: userIdText,    // Ensure user_id is correctly passed as TEXT
                video_id: video.id,     // Insert the video ID
                title: video.title,     // Insert the video title
                video_type: videoType,  // Insert the video type (HTML, CSS, etc.)
                updated_at: new Date().toISOString(), // Add server timestamp
              }
            ]);

          if (upsertError) throw upsertError;

          console.log(`Video ${video.title} of type ${videoType} for user ${userIdText} inserted.`);
        }
      }

      results.push({ userId: userIdText, message: 'Playlist upserted successfully' });
    }

    return { message: 'Playlists upserted successfully', results };
  } catch (error) {
    console.error('Error upserting playlists:', error.message);
    return { error: error.message };
  }
}

