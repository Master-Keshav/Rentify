import { NextRequest, NextResponse } from "next/server";

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Property from "@/models/propertyModel";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { propertyData } = reqBody;
        console.log(reqBody)

        const userId = getDataFromToken(request);
        console.log(userId)

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        console.log(user)

        const existingProperty = await Property.findOne({ title: propertyData.title, owner: userId });
        if (existingProperty) {
            console.log("Property already exists for this user:", existingProperty);
            return NextResponse.json({
                message: "Property already exists for this user",
                success: true,
                existingProperty
            }, { status: 200 });
        }
        console.log(existingProperty)

        const newProperty = new Property({
            ...propertyData,
            owner: user._id
        });
        console.log(newProperty)

        await newProperty.save();

        user.properties.push(newProperty._id);
        await user.save();

        console.log("Property created successfully:", newProperty);

        return NextResponse.json({
            message: "Property created successfully",
            success: true,
            newProperty
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating property:", error);

        let errorMessage = "Failed to create property";
        if (error.errors) {
            const errorMessages: string[] = [];
            for (const key in error.errors) {
                if (error.errors[key].message) {
                    errorMessages.push(error.errors[key].message);
                }
            }
            errorMessage = errorMessages.join(", ");
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

}