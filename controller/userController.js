const userModel=require("../model/userModel");
const express=require("express");
const app=express();
app.use(express.json());

module.exports.getAllUsers=async function(req,res){
    try{
     const user = await userModel.find();
         res.status(200).json({
         data:user
     });
    }
     catch(err){
         res.status(401).json({
             "status":"fail to Load data",
              data:err
         })
       }
 }
 
 module.exports.getUser= async function(req,res)
 { try{
    //  console.log(req.params.id);
     const user = await userModel.findById(req.params.id);
     res.status(200).json({
     data:user
 });
  }
 catch(err){
     res.status(401).json({
         "status":"fail to add data",
         data:err
     })
   }
 }
 
 module.exports.createUser= async function(req,res){
     try{
         const user = await userModel.create(req.body);
         res.status(201).json(
             {
             "status":"added succesfully",
             data:user
         });
   }
   catch(err){
       res.status(401).json({
           "status":"fail to add data",
           data:err
       })
     }
 }
  
 module.exports.deleteUser=async function(req,res){
     try{
         const id=req.params.id;
        //  console.log(id);
         const user= await userModel.findOneAndDelete(id);
         res.status(201).json({
          "status":"Deleted succesfully",
          data:user
         });
     }
     catch(err){
      res.status(401).json({
          "status":"fail to delete data",
          data:err
      })
     }
 }
 
  module.exports.updateUser= async function(req,res){
     try{
         const user=await userModel.findByIdAndUpdate(req.id,req.body,{ new:true});
        //  console.log(user);
         res.status(201).json({
             "status":"Updated succesfully",                
             data:user
         })

        } 
     catch(err)
       {
         res.status(401).json({
             "status":"fail to update data",
             data:err
         })
       }
     
 } 