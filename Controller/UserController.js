const users=require('../Models/User')
const helper = require('../helper/helper')
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
require('dotenv').config()

exports.Signup = (async (req, res) => {
  //  console.log("req.body", req.body)
    try {
     const { username, name, number, password, confirm_password, Status, email } = req.body
     console.log(" username, name, number, password, confirm_password, Status, email", username, name, number, password, confirm_password, Status, email)
     const lastuserid = await users.findOne({}, "userId").sort({ userId: -1 });

  //  console.log("lastuserid",lastuserid)
   const newUserId = lastuserid ? lastuserid.userId + 1 : 1;
  //  console.log("newuserID", newUserId)
   //  const convertedpass = await bcrypt.hash(password, 10)
  //   console.log("newuserID", convertedpass)
        let isAlready = await users.findOne({ username: username });
 // console.log(isAlready)
      if (isAlready) {
           return res.json({
               msg: helper.message1,
             status: helper.code400
           });
      }
        let user = new users({
            username: username,
            name: name,
            number: number,
            password: password,
            confirm_password: confirm_password,
            Status: Status,
            email: email
        }
        )
    //   console.log("user", user)
       const result = await user.save();
    //   console.log("result", result)
       res.json({
      data: result,
           msg: helper.message200,
           status: helper.code200
       })
    } catch (error) {
     //   console.log("error",error)
        res.json({
            msg: helper.measage400,
            Status: helper.code400
        })
    }
})






exports.Login = (async (req, res) => {

  console.log(req.body)
    try {
        const { username, password } = req.body
        const user = await users.findOne({ username: username });
        console.log("user",user)
        const isPassword = await users.findOne({ password:user.password });
        console.log("isPassword",isPassword)
    //    console.log(user, isPassword)
        if (!user || !isPassword) {
            res.json({
                status: helper.code400,
                msg: helper.message11,
            });
        }
        console.log("process.env.JWT_SECRET",process.env.JWT_SECRET)
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "5h",
        });
          console.log("token,token" ,token)
        res.json({
            status: helper.code200 ,
            user: user,
            msg: helper.messagelogin,
            token: token
        });


    } catch (error) {
        console.log(error);
        res.json({
            error: error,
            msg:helper.measage400,
            status: helper.code400
        });
    }
})



exports.userlist=(async(req,res)=>{
    try{

        const userlist= await users.find({})
        res.json(
            {
                data:userlist,
                msg:helper.message200,
                status:helper.code200
            })
    }catch(error){
        res.json({
            error:error,
            msg:helper.measage400,
            status:helper.code400
        })
    }

    
})