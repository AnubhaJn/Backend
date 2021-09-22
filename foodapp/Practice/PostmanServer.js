//***************************** POSTMAN IMPLEMENTATION ****************
const express = require('express');
const app = express();

let port = '4000';
app.listen(port ,function(){ // this listen tells the server from which port communication will take place.
    console.log(`server is listening on port ${port} `);
});

app.use(express.json());// data jo bhi aa rha h usse json mai kar dete hai

let user = {};
let student = {};

//get request
//client recieving data from server
app.get('/',(req,res) =>{
    res.send("Home Page");
});

app.get('/student',(req,res)=>{
    res.send(student);
});

app.get('/user',(req,res)=>{
    res.send(user);
});

//post request
//client sending data to server
app.post('/student',(req,res)=>{
    student = req.body;// jo bhi request body mai hoga vo user mai aa jayga
    //console.log(req.body);
    res.send('data has been added successfully');
})

//patch request
//to update
app.patch('/student',(req,res)=>{
    let obj = req.body;
    for(let key in obj){
        student[key] = obj[key];
    }
    //res.send("successfull")
    res.json(student);
})

//delete request
//to delete
app.delete('/student',(req,res)=>{
    student ={};
    res.json(student); // this response is for frontend , to inform the user
})
