const nodemailer = require("nodemailer");

const {nodemailer_passKey} = require('./secrets');
module.exports = async function sendMail(userObj){
    let transporter = nodemailer.createTransport({ // bridge bana rhe hai
        host : "smtp.gmail.com",
        port : 587,
        secure : false, // true for 465,else for other ports true
        auth : {
            user : 'anubhajn28@gmail.com',
            pass : nodemailer_passKey,
        }
    });

     var Osubject , Otext , Ohtml;
     Osubject = `Thankyou for signing ${userObj.name}`;
     Otext = `Welcome`
     Ohtml = `<h1> Welcome to KhanaKhazana.com</h1>
     Hope you are having a good time!
     Here are your details-
     Name : ${userObj.name}
     Email : ${userObj.email}
     <h4> Do check our exciting menu and order your first meal now. </br> HURRYYY !! 
     Enjoyy!!</h4>`

     let info = await transporter.sendMail({
         from :`"KhanaKhazana" <anubhajn28@gmail.com>`,
         to : `${userObj.email}`,
         subject : Osubject,
         text : Otext,
         html : Ohtml,
     });

     console.log("Message sent : %s",info.messageId);
};
