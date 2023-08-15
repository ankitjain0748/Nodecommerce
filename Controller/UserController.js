const users = require('../Models/User')
const helper = require('../helper/helper')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
require('dotenv').config()



//singup 
exports.Signup = (async (req, res) => {
    //  console.log("req.body", req.body)
    try {
        const { username, name, number, password, confirm_password, Status, email } = req.body
        // console.log(" username, name, number, password, confirm_password, Status, email",
        //     username, name, number, password, confirm_password, Status, email)
        const lastuserid = await users.findOne({}, "userId").sort({ userId: -1 });
        let newUserId;
        if (lastuserid && lastuserid._id) {
            const lastIdParts = lastuserid._id.toString().split(''); // Split the ObjectId string
            const numericPart = lastIdParts[lastIdParts.length - 1]; // Get the last part of the string
            newUserId = parseInt(numericPart, 16); // Convert hexadecimal to integer
        } else {
            newUserId = 1;
        }

        console.log("newuserID", newUserId);
        let isAlready = await users.findOne({ username: username });
        console.log("isAlready", isAlready)
        if (isAlready) {
            return res.status(400).json({
                msg: "That user already exisits!",
                status: true
            });
        }
        console.log("last", lastuserid)


        let user = new users({
            username: username,
            name: name,
            userId: newUserId,
            number: number,
            password: password,
            confirm_password: confirm_password,
            Status: Status,
            email: email
        }
        )
        console.log("user", user)
        const result = await user.save();
        console.log("result", result)
        res.json({
            data: result,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            msg: helper.measage400,
            Status: helper.code400
        })
    }
})




//login system

exports.Login = (async (req, res) => {
    console.log(req.body)
    try {
        const { username, password } = req.body
        const user = await users.findOne({ username: username });
        console.log("user", user)
        const isPassword = await users.findOne({ password: user.password });
        console.log("isPassword", isPassword)
        //    console.log(user, isPassword)
        if (!user || !isPassword) {
            res.json({
                status: helper.code400,
                msg: helper.message11,
            });
        }
        console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
        console.log("token,token", token)
        res.json({
            status: helper.code200,
            user: user,
            msg: helper.messagelogin,
            token: token
        });


    } catch (error) {
        console.log(error);
        res.json({
            error: error,
            msg: helper.measage400,
            status: helper.code400
        });
    }
})


// userlist code 
exports.userlist = (async (req, res) => {
    try {

        const userlist = await users.find({})
        console.log("userlist", userlist)
        res.json(
            {
                data: userlist,
                msg: helper.message200,
                status: helper.code200
            })
    } catch (error) {
        res.json({
            error: error,
            msg: helper.measage400,
            status: helper.code400
        })
    }


})


///[assword Reste code ]
exports.pssreset = async (req, res) => {
    const user = req.user.username;
    console.log("user", user)
    const { npass } = req.body;
    try {
        const record = await users.findOne({ username: user });
        if (!record) {
            return res.status(404).json({ msg: "User not found" });
        }
        // Check if old password matches
        // (You need to implement this step, comparing oldpass with record.password)
        // Update the user's password
        const passowrd = record.password = npass; // Update the password field with the new password
        console.log("passowrd", passowrd)
        await record.save(); // Save the updated user record
        res.json({
            status: helper.code200,
            msg: helper.messagepassword
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.json({
            status: helper.code500,
            message: helper.measage500
        }
        );
    }
};
