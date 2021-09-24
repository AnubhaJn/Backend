const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModel");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../secrets.js')
const sendMail = require("../nodemailer.js");
//********************************* Routes ****************/
authRouter
  .route("/signup") // on /auth/signup
  .post(createdAt, signupUser);

authRouter
  .route("/forgetPassword")
  .get(getPassword)
  .post(changePassword, validateEmail);

authRouter.route("/logIn").post(loginUser);

let user = [];

//************************ Functions  *********************************/
function createdAt(req, res, next) {
  //middleware function
  let obj = req.body;
  console.log("in createdAt" , obj);
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user as req.body is empty" });
    //this is chaining res.status(400) will also give back a response onto which we do res.json
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  // let{email,name,password} = req.body;
  // user.push({email,name,password});
  // console.log(user);
  // console.log('user',req.body); // server message
  // res.json({ // response on frontend
  //     message:'user signedUp',
  //     user: req.body
  // });
  try {
    let userObj = req.body;
    console.log(req.body);
    let user = await userModel.create(userObj); // mongo returns the user after request
    console.log("user", user);
    sendMail(user);
    res.json({
      message: "user SignedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function getPassword(req, res) {
  res.sendFile("./public/forgetPassword.html", { root: __dirname });
}

function changePassword(req, res, next) {
  let { email, password } = req.body;
  console.log(req.body);
  next(); // this will check if email is validate or not
}

function validateEmail(req, res) {
  // req and res are same as prev function whivh called this middleware function
  console.log("In validateEmail middleware function");
  console.log(req.body);
  let { email, password } = req.body;
  if (email.indexOf("@") != -1 && email.indexOf(".") != -1) {
    res.json({
      message: "data recieved",
      data: req.body,
    });
  } else {
    res.send("error found");
  }
}

//using coockies method not secure

// async function loginUser(req, res) {
//   try {
//     if (req.body.email) {
//       let user = await userModel.findOne({ email: req.body.email });
//       if (user) {
//         if (req.body.password == user.password) {
//             res.cookie('login','1234',{httpOnly:true});//httpOnly->browser cookie change na kr paye and bas server hi ched paye
//           return res.json({
//             message: "user logged in",
//           });
//         } else {
//           return res.json({
//             message: "email or password is wrong!",
//           });
//         }
//       } else {
//         return res.json({
//           message: "email or password is wrong!",
//         });
//       }
//     } else {
//       return res.json({
//         message: " User is not present",
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//     });
//   }
// }

//JWT IS USED , MORE SECURE
async function loginUser(req, res) {
  try {
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
           let payload = user['_id'];
           let token = jwt.sign({id:payload},JWT_KEY);
           console.log('token',token);
            res.cookie('login',token,{httpOnly:true});//httpOnly->browser cookie change na kr paye and bas server hi ched paye
          return res.json({
            message: "user logged in",
          });
        } else {
          return res.json({
            message: "email or password is wrong!",
          });
        }
      } else {
        return res.json({
          message: "email or password is wrong!",
        });
      }
    } else {
      return res.json({
        message: " User is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = authRouter;
