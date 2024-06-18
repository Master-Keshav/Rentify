import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide the user's ID"],
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: [true, "Please provide the property's ID"],
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating"],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

const Review = mongoose.models.reviews || mongoose.model("reviews", reviewSchema);

export default Review;
