const jwt = require("jsonwebtoken");
const {JWT_KEY} = require('../secrets.js') 

//using coockies
// function protectRoute(req,res,next){
//   try{
//     if(req.cookies){
//       if(req.cookies.login == '1234'){
//         next();
//       }else{
//         res.json({
//           message:"not authorized"
//         });
//       }
//     }else{
//       res.json({
//         message:"operation not allowed"
//       });
//     }
//   }
//   catch(err){
//     return res.status(5000).json({
//       message : err.message
//     })
//   }
// }

//using jwt
function protectRoute(req,res,next){
  try{
    if(req.cookies.login){
        let isVerified = jwt.verify(req.cookies.login, JWT_KEY);
      if(isVerified){
        next();
      }else{
        res.json({
          message:"not authorized"
        });
      }
    }else{
      res.json({
        message:"operation not allowed"
      });
    }
  }
  catch(err){
    return res.status(5000).json({
      message : err.message
    })
  }
}

module.exports = protectRoute;