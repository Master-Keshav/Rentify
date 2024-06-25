import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Property from "@/models/propertyModel";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const properties = await Property.find({ _id: { $in: user.likes } });

        const customizedProperties = properties.map((property: any) => {
            return {
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
                likedBy: property.likedBy
            };
        });

        return NextResponse.json({ properties: customizedProperties }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching properties:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}