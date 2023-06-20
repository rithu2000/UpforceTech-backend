import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    gender: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        match: /^\d{10}$/,
    },
    status: {
        type: String,
        required: true,
    },
    locaton: {
        type: String,
        required: true,
        maxlength: 50,
        match: /^[A-Za-z\s]+$/,
    },
}, {
    timestamps: true,
});

export const userModel = mongoose.model('User', userSchema);