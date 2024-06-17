import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Property from "@/models/propertyModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const properties = await Property.aggregate([
            {
                $project: {
                    image: { $first: "$images" },
                    price: 1,
                    averageReviews: "$averageReviews",
                    // totalReviews: { $size: "reviews?.[]" },
                    tag: 1,
                    houseType: 1,
                    location: 1
                }
            }
        ]);
        return NextResponse.json({ properties }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching properties:", error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
