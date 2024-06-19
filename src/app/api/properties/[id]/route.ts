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
            return NextResponse.json({ message: "Property ID is required" }, { status: 400 });
        }

        const property = await Property.findById(id);

        if (!property) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }

        const user = await User.findById(property.owner)

        if (!user) {
            return NextResponse.json({ message: "Registered User not found" }, { status: 404 });
        }

        const customizedProperty = {
            id: property._id,
            images: property.images,
            description: property.about,
            title: property.title,
            tags: [
                `${property.parkingSpaces} Parkings`,
                `${property.bedrooms} Bedrooms`,
                `${property.beds} Beds`,
                `${property.washrooms} Washrooms`
            ],
            amenities: property.amenities,
            price: property.price,
            totalReviews: property.totalReviews === 0 ? 2 : property.totalReviews,
            averageReviews: property.averageReviews === 0 ? 5 : property.averageReviews,
            owner: {
                profilePhoto: user.imageUrl,
                about: user.about,
                name: user.name,
                email: user.email,
                phone: user.phonenumber,
            }
        };

        return NextResponse.json({ status: "success", message: "Property Data Fetched", property: customizedProperty });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
