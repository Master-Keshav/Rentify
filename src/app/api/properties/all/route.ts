import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/propertyModel";
import Review from "@/models/reviewModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const properties = await Property.find({}).populate({ path: 'reviews', model: Review });

        const customizedProperties = properties.map(property => {
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
            };
        });

        return NextResponse.json({ properties: customizedProperties }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching properties:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
