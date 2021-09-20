const mongoose = require('mongoose');
const {db_link} = require('../secrets.js');
const validator = require("email-validator");

mongoose.connect(db_link).then(function(db){
    console.log('db connected');
})

.catch(function(err){
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required: true,
        unique:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    createdAt : {
        type:String,
    },
    password : 
    {
        type:String,
        required: true,
        min:8
    },
    confirmPassword:{
        type:String,
        required: true,
        min:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    }
});

//to remove the redundant info her it is confirm password only password is to be stored
userSchema.pre('save',function(){ // save is the listener
    this.confirmPassword = undefined;
});

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;

// //IFFEE immediatly called functions
// ( async function createUser(){
//     let user = {
//         name:'Amit',
//         age:20,
//         email:'amit2000@gmail.com',
//         password:'123456abc',
//         confirmPassword:'123456abc'
//     };
//    let userObj =  await userModel.create(user);//promise based //makes a document
//    console.log(userObj);
// })();
