import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const queryParams = new URLSearchParams(request.url.split('?')[1] || '');
        const email = queryParams.get('email');

        if (!email) {
            return NextResponse.json({ message: "Email parameter is missing" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        await sendEmail({ email: user.email, emailType: "RESET", userId: user._id });

        return NextResponse.json({ message: "Reset password email sent" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { token, newPassword } = await request.json();

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 404 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password reset successfully" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}