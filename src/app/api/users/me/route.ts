import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("username name email properties phonenumber experience imageUrl about password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const hasPassword = !!user.password;

        const userObject = user.toObject();
        delete userObject.password;

        return NextResponse.json({
            message: "User found",
            user: {
                ...userObject,
                hasPassword
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}