const express=require("express");
const userRouter=express.Router();

const{
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
}=require("../controller/userController");

let { signup,
      userLogin,
      protectRoute,
      isAuthorised,
      updatePassword,
      forgotPassword,
      logOut,
      resetPassword
    }=require("../controller/authcontroller");

userRouter
   .route("/signup")
   .post(signup);

userRouter
    .route("/login")
    .post(userLogin);

    userRouter
    .route("/logout")
    .get(logOut);

    userRouter
    .route("/forgotPassword.html")
    .patch(forgotPassword);    

    userRouter
    .route("/resetpassword.html")
    .patch(resetPassword);    
    
userRouter
.route("")
.get(protectRoute,isAuthorised(["admin","restaurantOwner"]),getAllUsers)
.post(createUser)


userRouter
 .route("/:id")
 .get(getUser)
 .patch(protectRoute,updateUser) 
 .patch(protectRoute,updatePassword)
 .delete(deleteUser)
  
 module.exports=userRouter;