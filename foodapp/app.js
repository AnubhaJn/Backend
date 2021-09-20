//*************************************** INTRODUCTION *************************************
const express = require('express');//require

const app = express();// creation of server

let port = '5000';
app.listen(port ,function(){ // this listen tells the server from which port communication will take place.
    console.log(`server is listening on port ${port} `);
});

// types of requests -> get post put delete
app.get('/',(req,res)=>{ // '/' tells to whhere we have show the response , and (req,res) are the callbacks
  // console.log(req); // req is an object
  console.log(req.hostname);
  console.log(req.path); // it will only print on system not on web-page
  res.send('<h1>hello<h1>');
  //res.send('hi'); only one res.send can be done in response
   res.end(); 
})

let obj = {
    'name' : 'Anubha',
    'age' : 21
}
app.get('/user',(req,res)=>{
    console.log('users');
    res.json(obj); // it will send response in json format
})

app.get('/about',(req,res)=>{
    res.sendFile('./view/index.html',{root:__dirname}); // path and then in root the directory name
})