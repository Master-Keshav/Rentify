import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Property from "@/models/propertyModel";
import Review from "@/models/reviewModel";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { property_id, rating, comment } = reqBody;
        console.log("reqBody", reqBody);

        const userId = getDataFromToken(request);
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log("user", user)

        const property = await Property.findById(property_id);
        if (!property) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }
        console.log("property", property);

        const existingReview = await Review.findOne({ user: userId, property });
        if (existingReview) {
            existingReview.rating = rating
            existingReview.comment = comment
            await existingReview.save();

            console.log("Review updated", existingReview.reviews);

            return NextResponse.json({
                message: "Review Updated",
                success: true,
                reviews: existingReview
            }, { status: 200 });
        }

        console.log(rating, comment)

        const newReview = new Review({
            user: userId,
            property,
            rating: rating,
            comment: comment,
        });

        await newReview.save();

        property.reviews.push(newReview._id);
        await property.save();

        console.log("New review created:", newReview);

        return NextResponse.json({
            message: "New review created",
            success: true,
            reviews: newReview.reviews
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating review:", error);
        let errorMessage = "Failed to create review";
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}