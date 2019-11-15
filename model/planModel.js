const mongoose=require("mongoose");

const DB="mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/test?retryWrites=true&w=majority"

mongoose
.connect(DB ,{
    useNewUrlParser:true ,
    useCreateIndex:true,
    useUnifiedTopology:true})
.then(function(conn){
    // console.log(conn.connection);
    console.log("connected to db  "+ JSON.stringify(conn[1]));
});

const planSchema=new mongoose.Schema({
    name:{type:String,required:[true,"Name is required field"]},
    price:{type:Number,min:20},
    description:{type:String,required:true},
    averageratings:Number,
    duration:{type:Date}
})

const planModel=mongoose.model("planModel",planSchema);
module.exports=planModel;
