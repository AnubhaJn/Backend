const express = require('express');
const app = express();

app.listen('2000',function(){
    console.log('Server is listening at port 2000');
});

app.use(express.json());
app.use(express.static('public'));// to use files only in public folder

const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user',userRouter);
app.use('/auth',authRouter);

//mounting in express
userRouter
.route('/') // on /user/ -> it will check the method
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')  // on /auth/signup
.post(createdAt, signupUser);

let user =[];

function createdAt(req,res,next){
    //middleware function
    let obj = req.body;
    let length = Object.keys(obj).length;
    if(length == 0){
        return res.status(400).json({message:"cannot create user as req.body is empty"})
        //this is chaining res.status(400) will also give back a response onto which we do res.json
    }
    req.body.createdAt = new Date().toISOString();
    next();
}

const userModel = require('./models/userModel.js');
async function signupUser(req,res){
    // let{email,name,password} = req.body;
    // user.push({email,name,password});
    // console.log(user);
    // console.log('user',req.body); // server message 
    // res.json({ // response on frontend
    //     message:'user signedUp',
    //     user: req.body
    // });
    try{
        let userObj = req.body;
        let user = await userModel.create(userObj); // mongo returns the user after request
        console.log('user',user);
        res.json({
            message:'user SignedUp',
            user : userObj
        });
   }
   catch(err){
       console.log(err);
       res.json({message: err.message});
   }
}

authRouter
.route('/forgetPassword')
.get(getPassword)
.post(changePassword,validateEmail);
function getPassword(req,res){
    res.sendFile('./public/forgetPassword.html',{root:__dirname})
};

function changePassword(req,res,next){
   let{email,password} = req.body;
     console.log(req.body);
     next(); // this will check if email is validate or not
};

function validateEmail(req,res){ // req and res are same as prev function whivh called this middleware function
    console.log("In validateEmail middleware function");
    console.log(req.body);
    let {email,password} = req.body;
    if(email.indexOf('@') != -1 && email.indexOf('.') != -1){
        res.json({
            message :"data recieved",
            data:req.body
        });
    }else{
        res.send("error found");
    }
};

//redirects
app.get('/user-all',(req,res)=>{
    res.redirect('/user');
});

//404 page
app.use((req,res)=>{
    res.sendFile('public/404.html',{root:__dirname})
});

//GET : client <- server
app.get('/',(req,res)=>{
    res.send('Home Page');
});

// app.get('/user',getUser);

function getUser(req,res){
    res.json(user);
}

//POST : client -> server

// app.post('/user',createUser);

function createUser(req, res){
    user = req.body;
    res.send('Data has been added successfully.');
}


//UPDATE 

// app.patch('/user',updateUser);

function updateUser(req,res){
    let obj = req.body;
    for(let key in obj ){
        user[key] = obj[key];
    }
    //res.json(user);
    res.send("User updated");
};

//DELETE 

// app.delete('/user',deleteUser);

function deleteUser(req,res){
    user = [];
    res.json(user);
}

//param route

// app.get('/user/:id',getUserById);

function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}

