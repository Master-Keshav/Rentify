import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        let emailContent = "";
        let subject = "";

        if (emailType === "VERIFY") {
            subject = "Verify your email"
            emailContent = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            subject = "Reset your password"
            emailContent = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.TRANSPORT_USER,
                pass: process.env.TRANSPORT_PASS
            }
        });

        const mailOptions = {
            from: 'one@gmail.com',
            to: email,
            subject: subject,
            html: emailContent
        }

        const mailresponse = await transport.sendMail(mailOptions);
        console.log("Mail Response: ", mailresponse);
        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}