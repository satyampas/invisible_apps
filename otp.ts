import twilio from 'twilio';
import nodemailer from 'nodemailer';
const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
export const sendPhoneOTP = async (phone: string, otp: string) => {
  await client.messages.create({ body: `Your Invisible OTP: ${otp}`, to: phone, from: process.env.TWILIO_PHONE });
};
export const sendEmailOTP = async (email: string, otp: string) => {
  await emailTransporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject: 'Invisible Login OTP', text: `OTP: ${otp}` });
};