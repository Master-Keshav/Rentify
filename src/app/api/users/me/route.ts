import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("username name email properties phonenumber experience imageUrl about");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log(user)

        return NextResponse.json({
            message: "User found",
            user: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}