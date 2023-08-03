import mongoose from "mongoose";
const { Schema } = mongoose

const usersSchema = new Schema({
    name: String,
    email: String,
    image: String,
    emailVerified: Boolean
})

const accountsSchema = new Schema({
    provider: String,
    type: String,
    providerAccountId: String,
    access_token: String,
    expires_at: Number,
    scope: String,
    token_type: String,
    id_token: String,
    // userId: String 
})

const sessionsSchema = new Schema({
    sessionToken: String,
    expires: Date,
    // userId: String
})