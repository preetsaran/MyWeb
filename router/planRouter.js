const express=require("express");
const planRouter=express.Router();

const{
    getAllplans,
    createPlan,
    getPlan,
    updatePlan,
    deletePlan,
    addQueryParams
}=require("../controller/planController");
 
const{protectRoute,isAuthorised}=require("../controller/authcontroller");
 

 planRouter
     .route("")
     .get(protectRoute,isAuthorised(["admin","restaurantOwner"]),getAllplans)
     .post(protectRoute,createPlan)

  planRouter
     .route("/best-5-plans")
     .get(addQueryParams,getAllplans)
 
 planRouter
       .route("/:id")
       .get(getPlan)
       .delete(deletePlan)
       .patch(protectRoute,isAuthorised(["admin"]),updatePlan)

       module.exports=planRouter;

       