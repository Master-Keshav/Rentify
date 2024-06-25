import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/propertyModel";
import User from "@/models/userModel";

connect();

interface Params {
    id: string;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: "Agent ID is required" }, { status: 400 });
        }

        const agent = await User.findById(id).select('_id name imageUrl about phonenumber email experience properties');
        const properties = await Property.find({ _id: { $in: agent.properties } });

        const agentData = {
            _id: agent._id,
            name: agent.name,
            imageUrl: agent.imageUrl,
            about: agent.about,
            phonenumber: agent.phonenumber,
            email: agent.email,
            experience: agent.experience,
            properties: properties.map(property => ({
                id: property._id,
                averageReviews: property.averageReviews,
                createdAt: property.createdAt,
                houseType: property.houseType,
                image: property.images.length > 0 ? property.images[0] : null,
                location: property.location,
                price: property.price,
                tag: property.tag,
                totalReviews: property.totalReviews,
                updatedAt: property.updatedAt,
            })),
        };

        if (!agent) {
            return NextResponse.json({ message: "Agent not found" }, { status: 404 });
        }

        return NextResponse.json({ status: "success", message: "Agent Fetched", agent: agentData });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
