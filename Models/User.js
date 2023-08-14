const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:String,
    name:String,
    number:String,
    Password:String,
    confirm_password:String,
    email:String,
    userId:Number,
    Status:{type:String,default:'disable'}
})

const UserModel= mongoose.model("users",UserSchema)


module.exports=UserModel;