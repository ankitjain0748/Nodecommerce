const express=require("express")
const app=express()
const mongoose =require("mongoose")

mongoose.connect()





app.listen(8000,()=>{console.log("server is run,8000")})