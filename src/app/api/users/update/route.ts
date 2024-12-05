import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const data = await request.json();

        const { username, name, email, phonenumber, experience, about, imageUrl } = data;

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        user.username = username || user.username;
        user.name = name || user.name;
        user.email = email || user.email;
        user.phonenumber = phonenumber || user.phonenumber;
        user.experience = experience || user.experience;
        user.about = about || user.about;
        user.imageUrl = imageUrl || user.imageUrl;

        await user.save();

        return NextResponse.json({
            message: "User updated successfully",
            success: true,
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
