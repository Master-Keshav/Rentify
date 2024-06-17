import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Review from "@/models/reviewModel";
import User from "@/models/userModel";
import Property from "@/models/propertyModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { property, rating, comment } = reqBody;
        console.log(reqBody);
        console.log(property, rating, comment);

        const userId = getDataFromToken(request);
        const currentUser = await User.findById(userId);
        if (!currentUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log("currentUser")
        console.log(currentUser)

        const propertyExists = await Property.findById(property);
        if (!propertyExists) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }
        console.log("propertyExists")
        console.log(propertyExists)

        const existingReview = await Review.findOne({ user: userId, property });
        if (existingReview) {
            existingReview.reviews.push({
                rating,
                comment,
                createdAt: new Date()
            });
            await existingReview.save();

            console.log("Review acknowledged", existingReview.reviews);

            return NextResponse.json({
                message: "Review acknowledged",
                success: true,
                reviews: existingReview.reviews 
            }, { status: 200 });
        }

        console.log(rating, comment)

        const newReview = new Review({
            user: userId,
            property,
            reviews: [{
                rating,
                comment
            }]
        });

        await newReview.save();

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
