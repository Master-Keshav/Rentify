import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    images: {
        type: [String],
        validate: {
            validator: function (imagesArray) {
                return imagesArray.length >= 5;
            },
            message: "Please provide at least 5 images",
        },
        required: [true, "Please provide at least 5 images"],
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    about: {
        type: String,
        required: [true, "Please provide a description"],
    },
    amenities: {
        type: [String],
        required: true,
        default: [],
    },
    houseType: {
        type: String,
        required: [true, "Please provide a houseType"],
    },
    tag: {
        type: String,
        required: [true, "Please provide a tag"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide the owner's ID"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    location: {
        type: String,
        required: [true, "Please provide a location"],
    },
    area: {
        type: Number,
        required: [true, "Please provide the area of the property in square feet"],
    },
    builtYear: {
        type: Number,
        required: [true, "Please provide the year the property was built"],
    },
    parkingSpaces: {
        type: Number,
        required: [true, "Please provide the number of parking spaces"],
    },
    beds: {
        type: Number,
        required: [true, "Please provide the number of parking spaces"],
    },
    bedrooms: {
        type: Number,
        required: [true, "Please provide the number of parking spaces"],
    },
    washrooms: {
        type: Number,
        required: [true, "Please provide the number of parking spaces"],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

propertySchema.virtual('totalReviews').get(function () {
    return this.reviews.length;
});

propertySchema.virtual('averageReviews').get(function () {
    if (this.reviews.length === 0) {
        return 5;
    } else {
        const sumOfRatings = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        return sumOfRatings / this.reviews.length;
    }
});

const Property = mongoose.models.properties || mongoose.model("properties", propertySchema);

export default Property;