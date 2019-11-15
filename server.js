
const server=require("./api.js");
const port=process.env||3000;
server.listen(port,function(){
    console.log("server is listening at port 3000")
})








//Routes

//users

// server.get("/api/user/",getAllUsers);
// server.get("/api/user/:id",getUser)
// server.post("/api/user",createUser);
// server.patch("/api/user/:id",updateUser) 
// server.delete("/api/user/",deleteUser)

//plans

// server.get("/api/plan/",getAllplans)
// server.get("/api/plan/:id",getPlan)
// server.post("/api/plan",createPlan);
// server.delete("/api/plan/",deletePlan)
// server.patch("/api/plan/:id",updatePlan)



// server.use(function(req,res,next){
//     const data="Request processed sucessfully";
//     var key=Object.keys(req.body)[0];
//     if(req.body[key]=="rtyuin")
//     {
//         req.name="saran";
//     }
//     req.myproperty=" modified request"
//     next();
// })

// res.status(201).json(users[0]); 
    // const data="request processed from home" +req.myproperty;
   