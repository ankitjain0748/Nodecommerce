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
    Status: { type: String, default: 'disable' }
})

const UserModel = mongoose.model("users", UserSchema)


module.exports = UserModel;