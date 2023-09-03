const users = require('../Models/User')
const helper = require('../helper/helper')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
require('dotenv').config()

const nodemailer = require('nodemailer');
const { consumers } = require('nodemailer/lib/xoauth2');


//singup 
exports.Signup = (async (req, res) => {
    //  console.log("req.body", req.body)
    try {
        const { username, name, number, password, confirm_password, status, email, role } = req.body
        // console.log(" username, name, number, password, confirm_password, Status, email",
        //     username, name, number, password, confirm_password, Status, email)
        const lastuserid = await users.findOne({}, "userId").sort({ userId: -1 });
        const newUserId = lastuserid ? lastuserid.userId + 1 : 1;
        let isAlready = await users.findOne({ username: username });
        //  console.log("isAlready", isAlready)
        if (isAlready) {
            return res.status(400).json({
                msg: "That user already exisits!",
                status: true
            });
        }
        //console.log("last", lastuserid)


        let user = new users({
            username: username,
            name: name,
            userId: newUserId,
            number: number,
            password: password,
            confirm_password: confirm_password,
            status: status,
            role: role,
            email: email
        }
        )
        //  console.log("user", user)
        const result = await user.save();
        //  console.log("result", result)
        res.json({
            data: result,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
        //console.log("error", error)
        res.json({
            msg: helper.measage400,
            Status: helper.code400
        })
    }
})




//login system

exports.Login = (async (req, res) => {
    // console.log(req.body)
    try {
        const { username, password } = req.body
        const user = await users.findOne({ username: username });
        //   console.log("user", user)
        const isPassword = await users.findOne({ password: user.password });
        //   console.log("isPassword", isPassword)
        //    console.log(user, isPassword)
        if (!user || !isPassword) {
            res.json({
                status: helper.code200,
                msg: helper.message11,
            });
        }
        //   console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "56h",
        });
        //  console.log("token,token", token)
        res.json({
            status: helper.code200,
            user: user,
            msg: helper.messagelogin,
            token: token
        });


    } catch (error) {
        // console.log(error);
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
 //   console.log("user", user)
    const { npass } = req.body;
    try {
        const record = await users.findOne({ username: user });
        if (!record) {
            return res.status(404).json({ msg: "User not found" });
        }
        // Check if old password matches
        // (You need to implement this step, comparing oldpass with record.password)
        // Update the user's password
        const password = record.password = npass; // Update the password field with the new password
    //    console.log("password", password)
        const result = await record.save(); // Save the updated user record
        res.json({
            data: result,
            status: helper.code200,
            msg: helper.messagepassword
        });
    } catch (error) {
      ///  console.error("Error resetting password:", error);
        res.json({
            status: helper.code500,
            message: helper.measage500
        }
        );
    }
};



exports.forget = async (req, res) => {
    const { username } = req.body;
    //console.log("username", username)
    try {
        const record = await users.findOne({ username: username });
      //  console.log("record", record)
        if (record && record.email) {
            const customerEmail = record.email;
            // Create a transporter object using the SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'aj1188352@gmail.com',
                    pass: 'xobypqgazurobgps',
                },
            });
            // Send the password reset email
            await transporter.sendMail({
                from: 'aj1188352@gmail.com',
                to: customerEmail,
                subject: "Password Reset Link",
                html: `<a href="http://localhost:8000/forgetlink/${username}">Click this link to reset your password</a>`,
            });
            res.json({ message: 'Password reset link sent successfully.' });
        } else {
            res.json({
                status: 404,
                error: 'User not found.'
            });
        }
    } catch (error) {
      //  console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending the email.' });
    }
};


exports.forgetlink = (async (req, res) => {
    try {
      ///  console.log(req.body);
     //   console.log("req", req.params.username);
        const { username } = req.params; // Corrected parameter name
      //  console.log("username", username);
        const record = await users.findOne({ username: username }); // Use the correct username
      //  console.log("record, record", record);
        const { npass } = req.body
      //  console.log("npass", npass)
        const records = await users.findByIdAndUpdate(record.id, { password: npass })
      //  console.log("records", records)
        res.json({
            data: records,
            msg: helper.message200,
            status: helper.code200
        })
    } catch (error) {
       // console.log("error", error)
        res.json({
            error: error,
            msg: helper.measage400,
            status: helper.code500
        })
    }
})
