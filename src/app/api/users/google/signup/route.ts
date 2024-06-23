import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, username, imageUrl, googleId } = reqBody;

        // Check if user with the Google ID already exists
        let user = await User.findOne({ googleId });

        if (user && user.isVerified) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // If user exists but not verified, send verification email
        if (user) {
            await sendEmail({ email, emailType: "VERIFY", userId: user._id });
            return NextResponse.json({ message: "Verification Mail Sent" });
        }

        // If user does not exist, create a new user
        const newUser = new User({
            username,
            email,
            googleId,
            imageUrl,
            source: 1,
            isVerified: true,
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User signed up successfully",
            success: true,
            savedUser,
        });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
