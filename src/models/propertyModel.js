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
    tags: {
        type: [String],
        required: true,
        default: [],
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
    totalReviews: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            review: {
                type: String,
                required: true
            }
        }],
        default: [],
    },
    averageReviews: {
        type: Number,
        default: 0,
        get: function () {
            if (this.totalReviews.length === 0) {
                return 4;
            } else {
                const sumOfReviews = this.totalReviews.reduce((acc, review) => acc + review.review, 0);
                return sumOfReviews / this.totalReviews.length;
            }
        }
    },
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
    }
});

const Property = mongoose.models.properties || mongoose.model("properties", propertySchema);

export default Property;
