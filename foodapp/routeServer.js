const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
app.use(cookieParser()) // application mai kahi se bhi coockie access kr skte hai

app.listen('2000',function(){
    console.log('Server is listening at port 2000');
});

app.use(express.json());
app.use(express.static('public'));// to use files only in public folder

const userRouter = require("./Routers/userRouter");
const authRouter = require("./Routers/authRouter");

app.use('/user',userRouter);// when to use what
app.use('/auth',authRouter);


//let user =[];

//**************redirects************
// app.get('/user-all',(req,res)=>{
//     res.redirect('/user');
// });

//*************404 page**************
// app.use((req,res)=>{
//     res.sendFile('public/404.html',{root:__dirname})
// });


