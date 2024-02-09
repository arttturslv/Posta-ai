import mongoose from "mongoose";

const PostItSchema = mongoose.Schema(
    {
        note: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: false,
        }, 
        image: {
            type: String,
            required: false,
        }, 
    }, 
    {
        timestamp: true,
    }
);


export const PostIt = mongoose.model("PostIt", PostItSchema);