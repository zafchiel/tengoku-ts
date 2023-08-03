import mongoose from "mongoose"
const { Schema } = mongoose

const usersSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Boolean,
})

const User = mongoose.model("User", usersSchema)

const accountsSchema = new Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  expires_at: Number,
  scope: String,
  token_type: String,
  id_token: String,
  user: {
    type: Schema.ObjectId,
    ref: User,
  },
})

const Account = mongoose.model("Account", accountsSchema)

const sessionsSchema = new Schema({
  sessionToken: String,
  expires: Date,
  user: {
    type: Schema.ObjectId,
    ref: User,
  },
})

const Session = mongoose.model("Session", sessionsSchema)
