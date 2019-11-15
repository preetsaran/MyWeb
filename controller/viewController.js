const planModel=require("../model/planModel");

module.exports.getHomePage=async function(req,res){
    let plans=await planModel.find();
    plans=plans.slice(0,3);
    // console.log(plans);
    res.status(200).render("home.pug",{
    plans:plans
});
};

module.exports.getPlansPage=async function(req,res){
    let plans=await planModel.find();
    // plans=plans.slice(0,3);       
    res.status(200).render("planPage.pug",{plans:plans});
}

module.exports.getLoginPage=async function(req,res){
    res.status(200).render("login.pug");
}

module.exports.getProfilePage=function(req,res){
    const user=req.user;
    // res.status(201).json({user});
    res.status(200).render("user.pug",{user});
     
}
// module.exports.getAllplans = async function(req,res){
//     res.status(200).render("planPage.pug");
// }