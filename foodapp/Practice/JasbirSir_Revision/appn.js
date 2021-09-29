const express = require("express");
let fs = require("fs");

const app = express();

let port = '5050';
app.listen(port ,function(){ // this listen tells the server from which port communication will take place.
    console.log(`server is listening on port ${port} `);
});

//express.json se requestAnimationFrame.body mai content add ho jata hai

app.use(express.json());

//MIDDLEWARE FUNCTIONS TESTING ->>
app.post("/", function (req, res, next) {
  let body = req.body;
  console.log("inside first post", body);
  next();
})
app.use(function (req, res, next) {
 console.log("inside app.use",)
  next();
})
app.get("/", function (req, res) {
  let body = req.body;
  console.log("inside first get", body);

})
app.post("/", function (req, res, next) {
  let body = req.body;
  console.log("inside second post ", body);
  res.send("tested next");
})



let content = JSON.parse(fs.readFileSync("./data.json"));

//CREATING ROUTES ->>
const userRouter = express.Router();
const authRouter = express.Router();

app.use("/user", userRouter);
app.use("/auth", authRouter);

userRouter.route("/").get(getUsers).post(bodyChecker, createUser);

function bodyChecker(req, res,next) {
  console.log("in body-checker");
  let isPresent = Object.keys(req.body).length;
  console.log(isPresent);
  if (isPresent) {
    next();
  } else {
    res.json({ message: "send some data" });
  }
}

function createUser(req, res) {
  console.log("user created");
  let body = req.body;
  console.log("reqBody", body);
  content.push(body);
  fs.writeFileSync("./data.json", JSON.stringify(content));
  res.json({
    message: content,
  });
}

function getUsers(req,res){
    res.json({message : content});
}