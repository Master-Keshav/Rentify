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
        required: true,
        default: [],
    },
    tag: {
        type: String,
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
    reviews: {
        type: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            review: {
                type: Number,
                required: true
            }
        }],
        default: function () {
            return [{
                user: this.owner,
                review: 5
            }];
        }
    },
    averageReviews: {
        type: Number,
        default: 5,
        get: function () {
            if (this.reviews.length === 0) {
                return 5;
            } else {
                const sumOfReviews = this.reviews.reduce((acc, review) => acc + review.review, 0);
                return sumOfReviews / this.reviews.length;
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
