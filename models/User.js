import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    password: String,
});


export const UserModel = mongoose.model(
    "UserModel",
    userschema,
    "users",
);