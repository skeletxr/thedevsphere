




import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { doc as firestoreDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export async function POST(req) {
  try {
    const formData = await req.formData();
    let type = null, fileBuffer = null, subject = null, text = null, html = null, file = null;
    type = formData.get('type');

    subject = formData.get('subject');
    text = formData.get('text');
    html = formData.get('html');


    if(type == "notify"){ 
     file = formData.get('file');
  fileBuffer = Buffer.from(await file.arrayBuffer());
  //  const id = formData.get('id');
  //      const userUpdateRef = firestoreDoc(db, "users", id);
  //   await updateDoc(userUpdateRef, {
       
  //    });
    }

console.log( subject, text, html);
    const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Example: Gmail's SMTP server
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,  // Sender email
    to: type === "notify" ? process.env.TO : process.env.TO1,                       // Recipient email
    subject,                  // Subject from the form
    text,                     // Plain-text body
    html,                     // HTML body
    attachments: file && [
      {
        filename: file.name,  // Use the name from the file object
        content: fileBuffer,        // Use the file object directly
        cid: 'imagecid',      // Optional: If you want to embed the image inline
      },
    ],
  };


  try {
    // Send the email with the attachment
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return NextResponse.json({ status: 200, body: "File received successfully" });
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Error sending email');
  }

  } catch (error) {
    console.error('Error receiving file:', error.message);
    return NextResponse.json({ status: 500, body: "Error receiving file" });
  }
}