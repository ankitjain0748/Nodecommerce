const Mobile = require("../Models/Mobile")
const helper = require('../helper/helper')

exports.mobileadd = (async (req, res) => {
    console.log("body", req.body)
    try {
        const { title, img, rating, emi, discount, amount, description, ldesc } = req.body;
        const result = new Mobile({
            title: title,
            img: img,
            rating: rating,
            emi: emi,
            discount: discount,
            amount: amount,
            ldesc: ldesc,
            description: description,
        })
        console.log("result,re\\", result);
        const record = await result.save();
        console.log("record", record);
        res.json({
            data: record,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage500,
            status: helper.code500
        })
    }
})


exports.mobilelist = (async (req, res) => {
    try {
        const record = await Mobile.find({});
        console.log("record", record);
        res.json({
            data: record,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage500,
            status: helper.code500
        })
    }
})



exports.mobileget = (async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id",id)
        const record = await Mobile.findById(id);
        console.log("record", record);
        res.json({
            data: record,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage500,
            status: helper.code500
        })
    }
})
exports.mobileupdate = (async (req, res) => {
    console.log("id", req.params.id)
    console.log("record", req.body)
    try {
        const id = req.params.id;
        console.log("id", id);
        const { title, img, rating, emi, discount, amount, description, ldesc } = req.body;
        const record = await Mobile.findByIdAndUpdate(id, {
            title: title,
            img: img,
            rating: rating,
            emi: emi,
            discount: discount,
            amount: amount,
            ldesc: ldesc,
            description: description,
        })
        console.log("record", record);
        res.json({
            data: record,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage500,
            status: helper.code500
        })
    }
})


exports.mobiledelte = (async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id", id);
        const record = await Mobile.findByIdAndDelete(id)
        res.json({
            data: record,
            status: helper.code200,
            msg: helper.message200
        })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage500,
            status: helper.code500
        })
    }
})

