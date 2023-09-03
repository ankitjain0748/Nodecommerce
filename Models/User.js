const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    name: String,
    number: String,
    password: String,
    confirm_password: String,
    email: String,
    npass: String,
    userId: String,
    status:String,
    role: { type: String, default: "0" }
})

const UserModel = mongoose.model("users", UserSchema)


module.exports = UserModel;