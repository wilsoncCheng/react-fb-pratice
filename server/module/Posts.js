import mongoose from "mongoose";
const PostScheme = mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        types: Array,
        default: []
    },
}, { timeStamps: true })

const Post = mongoose.model("Post", PostScheme)
export default Post