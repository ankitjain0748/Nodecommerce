const mongoose =require('mongoose');

const LeptoSchema =mongoose.Schema({
    img:String,
    title:String,
    desc:String,
    price:String,
    rating:String,
    emi:String,

})


const Leptop = mongoose.model('leptop',LeptoSchema);

module.exports =Leptop;



