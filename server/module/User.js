import mongoose from "mongoose";
const UserScheme = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        require: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: ''
    },
    friend: {
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
}, {
    timestamps: true
})
const User = mongoose.model('User', UserScheme)
export default User