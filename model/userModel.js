const mongoose=require("mongoose");
const crypto=require("crypto");
const DB="mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/test?retryWrites=true&w=majority"
const bcrypt=require("bcrypt");
mongoose
.connect(DB ,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true})
.then(function(conn){
    // console.log(conn.connection);
    console.log("connected to db");
})

const userSchema=new mongoose.Schema({
    name:{type:String,required:[true,"Name is required field"]},    
    email:{type:String},
    password:{type:String,required:true},
    confirmpassword:{type:String,required:true,
        validate:{
        validator:function(){
        return this.password===this.confirmpassword;
    }},
        message:"Password and confirm password are not same"
},
    Mobile_number:{type:Number,required:true},
    role:{
        type:String,
        require:true,
        enum:["admin","Restaurant Owner","user","Delivery Boy"],
        default:"user"
    },
    token:{type:String}
})

   userSchema.pre("save",async function(){
       this.confirmpassword=await bcrypt.hash(this.password,8);
       this.confirmpassword=undefined;
   })


   userSchema.method("generateToken",function(){
       const token=crypto.randomBytes(32).toString("hex");
       this.token=token;
       return token;
   })

const userModel=mongoose.model("userModel",userSchema);
module.exports=userModel;
