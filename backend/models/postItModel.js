import mongoose from "mongoose";

const PostItSchema = mongoose.Schema(
    {
        note: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: false,
        }
    }, 
    {
        timestamp: true,
    }
);


export const PostIt = mongoose.model("PostIt", PostItSchema);