const express = require("express");
const userModel = require("../models/userModel");
const userRouter = express.Router();
const protectRoute = require("./authHelper");
//******************************* routes ***************************
//mounting in express
userRouter
  .route("/") // on /user/ -> it will check the method
  .get(protectRoute,getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

// userRouter
// .route("/:id")
// .get(getUserById);


//*************************** functions ************************/
//GET : client <- server

// app.get('/user',getUser);

async function getUsers(req, res) {
  try {
    console.log("getUser called");
    let users = await userModel.find();
    if (users) {
      res.json(users);
    } else {
      return res.json({
        message: "users not found",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
}


//POST : client -> server

// app.post('/user',createUser);

function createUser(req, res) {
  user = req.body;
  res.send("Data has been added successfully.");
}

//UPDATE

// app.patch('/user',updateUser);

function updateUser(req, res) {
  let obj = req.body;
  for (let key in obj) {
    user[key] = obj[key];
  }
  //res.json(user);
  res.send("User updated");
}

//DELETE

// app.delete('/user',deleteUser);

function deleteUser(req, res) {
  user = {};
  res.json(user);
}

//param route

// app.get('/user/:id',getUserById);

function getUserById(req, res) {
  console.log(req.params);
  res.json(req.params.id);
}


module.exports = userRouter;
