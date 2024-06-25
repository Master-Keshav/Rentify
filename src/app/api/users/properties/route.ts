import { NextRequest, NextResponse } from 'next/server';

import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Property from '@/models/propertyModel';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const { propertyId, liked } = await request.json();
        const userId = await getDataFromToken(request);

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const property = await Property.findOne({ _id: propertyId });
        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        if (liked) {
            if (!user.likes.includes(propertyId)) {
                user.likes.push(propertyId);
            }
            if (!property.likedBy.includes(userId)) {
                property.likedBy.push(userId);
            }
        } else {
            user.likes = user.likes.filter((id: any) => id.toString() !== propertyId);
            property.likedBy = property.likedBy.filter((id: any) => id.toString() !== userId);
        }

        await user.save();
        await property.save();

        return NextResponse.json({ status: 'success', message: 'Property like status updated' });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}
