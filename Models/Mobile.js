const mongoose  =require('mongoose')

const mobileSchema = mongoose.Schema({
    title:String,
    emi:String,
    img:String,
    discount:String,
    amount:String,
    rating:String,
    description:String,
    ldesc:String,
    status:{type:String, default:"Active"}
})


const Mobile = mongoose.model("mobiles",mobileSchema)

module.exports =Mobile;