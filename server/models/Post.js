import mongoose from "mongoose";

const PostSchema =mongoose.Schema({
    firstName:{
        type: String, 
        required: true,
    },
    lastName:{
        type: String, 
        required: true,
    },
    picturePath:{
        type: String, 
        default: ""
    },
    userPicturePath:{
        type: String, 
        default: ""
    },
    userId: {
        type: String,
        required: true,
    },
    location : String,
    description : String,
    likes: {
        type:Map,
        of: Boolean
    },
    comments : {
        type: Array,
        default: []
    },
   
},{timestamps: true})

const Post =mongoose.model("Post",PostSchema)

export default Post;