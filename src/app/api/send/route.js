import { NextResponse } from "next/server";
import { Resend } from "resend";

// Get the API key and the sender email from the environment variables
const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
  try {
    // Parse the request body to get email, subject, and message
    const { email, subject, message } = await req.json();
    console.log(email, subject, message);

    // Send the email using Resend API
    const data = await resend.emails.send({
      from: fromEmail, // Sender's email
      to: [fromEmail, email], // Recipients: sender + user
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting us!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
        </>
      ),
    });

    // Return the response in JSON format
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
