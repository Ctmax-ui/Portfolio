'use server'
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message }: { name: string; email: string; message: string } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"From: ${name}" <${email}>`,
      to: process.env.EMAIL_RECEIVER,
      subject: `Portfolio Contact Form Submission from, Sender ${name}`,
      text: `You have a new message from ( ${name} ) email:( ${email} )\n\n${message}`
      //   html: `You have a new message from <b>${name}</b> email:(${email})<br/><br/>${message}`
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Thank you for reaching me out." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email, Try again later!!" },
      { status: 500 }
    );
  }
}
