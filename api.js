const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");//DDOS
const rateLimiter=require("express-rate-limit");
const mongoSanitize=require("express-mongo-sanitize");//query injection
const hpp=require("hpp"); //parameter pollution

const limiter=rateLimiter({
    windowMs:15*60*100,
    max:100,
    message:"Request limit exceeded"
})


const userRouter=require("./router/userRouter")
const planRouter=require("./router/planRouter")
const viewRouter=require("./router/viewRouter")
const bookingRouter=require("./router/bookingRouter");

app.use(express.json());
app.use(express.static("public"));
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))
app.use(mongoSanitize());
// app.use(limiter());
app.use(hpp());
//template engine
app.set("view engine","pug");
//template folder
app.set("views","view");

// app.get("/main",function(req,res){
//     res.status(200).render("main.pug");
// })

app.use("/api/user",userRouter)
app.use("/api/plan",planRouter)
app.use("/",viewRouter)
app.use("/api/booking",bookingRouter)

app.use("",function(req,res){
    res.status(201).json({
    Result:"response from Api"
})
})

module.exports=app;

