import nodemailer from 'nodemailer';
import formidable from 'formidable';


export async function sendEmailWithAttachment({ to, subject, text, html, file }) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Example: Gmail's SMTP server
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options, including the image attachment
  const mailOptions = {
    from: process.env.EMAIL,  // Sender email
    to,                       // Recipient email
    subject,                  // Subject from the form
    text,                     // Plain-text body
    html,                     // HTML body
    attachments: [
      {
        filename: file.originalFilename,  // Use the original filename from the upload
        path: file.filepath,  // Path to the uploaded file
        cid: 'imagecid',  // Optional: If you want to embed the image inline
      },
    ],
  };

  try {
    // Send the email with the attachment
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email');
  }
}
