import mongoose from "mongoose";
export const connectdb=()=>{
    return mongoose.connect("mongoose://localhost:27017/my-blog");
}