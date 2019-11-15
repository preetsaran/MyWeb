const userModel=require("../model/userModel");
const jwt=require("jsonwebtoken")
const secret="mysecret";
const email=require("../utility/email.js");

module.exports.signup=async function(req,res){
 
    //get id from user
    const user=await userModel.create(req.body);
    console.log(user);
    //jwt sign
    try
    { 
         if(user)
        {
        const id=user["_id"];
        
        const token=await jwt.sign({id},secret);
        //  user.token=token;  
        console.log(token);

        await user.save({
            validateBeforeSave:false
        });
        res.cookie("jwt",token, {
         httponly:true});
        
        res.status(201).json({
          success:"User Created",
          user,
          token
          })
        }
        else{
            res.status(201).json({
                fail
                })
        }
    }

    catch(err)
    {
        console.log(err);
    }
};

module.exports.userLogin=async function(req,res){
try{   
    const email= req.body.email;
    const password= req.body.password;
    const user= await userModel.findOne({email:email})
    // console.log(user.password); 
    if(user)
    {
       if(user.password===password)
    // const answer=await bcrypt.compare(dbpassword,user.password)
    // if(answer)
       {
           const id=user["_id"];

           const token=await jwt.sign({id},secret);
           
           res.cookie("jwt",token,{httponly:true});

           res.status(201).json({
            success:"Logged In",
            user,
            token
             })
        }
        else
        {
            return res.status(201).json({
                password})
        }
    }
       
    else{
        res.status(201).json({
           data:"user not found"
             })

    }  
}
catch(err){
    console.log(err);
}
};

module.exports.logOut=async function(req,res)
{
    console.log("logout");
     res.cookie("jwt","szxctyvyubihojpkoi",
    {
        httponly:true,expires:new Date(Date.now())
    });
    res.redirect("/");
}

module.exports.isLoggedIn = async function (req, res, next){

    const token = req.cookies?req.cookies.jwt:null || req.headers.authorization? req.headers.authorization.split(" ")[1]:null;
    
    if (token) {
        const isVerified = await jwt.verify(token, secretkey)
        if (isVerified) {
            const user = await userModel.findOne({_id:isVerified.id});
            // console.log(user.role)
            req.user = user
            req.role = user.role;
            next();
        } else {
            next();
               }
       }
    else {
        next();
    }
}

module.exports.protectRoute=async function(req,res,next){
    const token=req.cookies?req.cookies.jwt:null||req.headers.authorization?req.headers.authorization.split(" ")[1]:null;
    // console.log(req.cookie.jwt);
    try{
      if(token){
        // const token=req.headers.authorization.split(" ")[1];
        const ans=await jwt.verify(token,secret);
        // console.log(ans);
         var {id}=ans.id;
        if(ans){
          const user=await userModel.findOne(id);
          req.role=user.role;
          req.user=user;
          next();
        }
        else{
            return res.status(401).json({
            data:"Something went wrong please login again"
          });
        }
      }
        else{
          return res.status(401).json({
            data:"User not logged in"
          });
        }
    }
    catch(err){
      res.status(400).json({
        erro:err
      })
    }
   
  };
module.exports.isAuthorised=function(roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
            next();
        }
        else{
            res.status(401).json({
                data:"You are not authorised"
            });
        }
    }
};

module.exports.updatePassword=function(req,res){
 const user=req.user;
 if(req.body.password&&req.body.newpassword&&req.body.confirmpassword)
 {
     const prevPass=req.body.password;
     const newPass=req.body.newpassword;
     const confirmpassword=req.body.confirmpassword;
     if(user.password===prevPass)
     {  
         user.password=newPass;
         user.confirmpassword=confirmpassword;
         user.save();
     }
 }

  else{
     res.json({
         data:"Please enter correct input"
            })
      }
};

module.exports.forgotPassword=async function(req,res){
    // 1. findOne using email
    const user =await userModel.findOne({email:req.body.email});
    console.log(user);
    try{
        if(user){
        // 2.add token property to that user
        const token = user.generateToken(); //this token is sent to the email of the user in order to reset the password
        user.token=token;
        // var link="http://localhost:3000/resetpassword.html/"+token;
        await user.save({
            validateBeforeSave:false
        });
        
        var options={ 
        from:' "Origami" <admin@origami.com>',
        to:req.body.email, //list of receivers
        subject:"testing", //Subject line
        text:"Message",
        html: `<h1>Reset Link:</h1> <p> ${token} </p>` //html body};
        }

        await email(options);
        res.status(201).json({
            token,
            success:"Token has been send"
        })
    }
    else{
        res.status(201).json({
            fail:"user withthin email does not exist"
        })
    }
}
catch(err){
    console.log(err);
}
    // 3. send token to the client
};

module.exports.resetPassword=async function(req,res){
    // const token=req.params.token;
    const token=req.body.token;
    
    // console.log(token);
    const user=await userModel.findOne({token:token});
    // console.log(user);
  try
  {  if(user)
    {
      if(req.body.password===req.body.confirmpassword)
       {
         user.password=req.body.password;
         user.confirmpassword=req.body.confirmpassword;
         user.token=undefined;
         await user.save();

         res.status(201).json({
          success:"Password updated",
          user
          })
        }
        else{
            res.status(201).json({
                Fail:"Password and ConfirmPassword are not same"
                })
        }
    }

  else{
    res.status(401).json({
        error:"user  does not exist"
    })
}
}
catch(err){
    console.log(err);
}

};






// module.exports.isAuthorised=function(req,res){
//     let token=req.headers.authorization;
//     token=token.split(" ")[1];
//     const ans=await jwt.verify(token,secret);
//     const {id}=ans.id;
//     console.log(id)
//     const user=await userModel.findOne(id);
//     console.log(user);

// }
