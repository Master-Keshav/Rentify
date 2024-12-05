import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const agents = await User.find({ properties: { $exists: true, $not: { $size: 0 } } })
            .select("_id name email imageUrl about phonenumber experience properties");

        return NextResponse.json({
            message: "Agents found",
            agents: agents
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}