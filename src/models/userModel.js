import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: null,
    },
    imageUrl: {
        type: String,
        default: null
    },
    phonenumber: {
        type: Number,
        default: null,
    },
    experience: {
        type: Number,
        default: null,
    },
    about: {
        type: String,
        default: null,
    },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;