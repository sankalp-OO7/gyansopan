// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { ServerClient } from 'postmark';

export async function POST(request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'Name, email, and message are required.' }, { status: 400 });
  }

  const postmarkClient = new ServerClient(process.env.POSTMARK_API_KEY);
  const fromEmail = process.env.POSTMARK_FROM_EMAIL;
  const toEmail = process.env.POSTMARK_TO_EMAIL || fromEmail; // You can set a different recipient in .env.local if needed

  try {
    await postmarkClient.sendEmail({
      From: fromEmail,
      To: toEmail,
      Subject: `Contact Form Submission from ${name}`,
      HtmlBody: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      TextBody: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      MessageStream: "outbound",
    });

    console.log('Email sent successfully via Postmark!');
    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email via Postmark:', error);
    return NextResponse.json({ success: false, message: 'Failed to send message.', error: error.message }, { status: 500 });
  }
}