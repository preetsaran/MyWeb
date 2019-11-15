const planModel=require("../model/planModel")
const express=require("express");
const app=express();
app.use(express.json());

module.exports.addQueryParams=async function(req,res,next){
      req.query.sort="-averagerating";
      req.query.price[lte]=100;
      req.query.limt=5;
      next();
}

module.exports.getAllplans=async function(req,res){
      
   try{

    var wholeQuery={...req.query};

    let excludeEntity=["sort","select","page","limit"];
    
    for(let i=0;i<excludeEntity.length;i++){
        delete wholeQuery[excludeEntity[i]];
    }

    var stringQuery=JSON.stringify(wholeQuery);
    stringQuery=stringQuery.replace(/gt|gte|lt|lte/g,function(match){
        return "$"+match;
    })

    let query=JSON.parse(stringQuery);
    // console.log(stringQuery);

    const plan = await planModel.find(query);
      if(req.query.sort){
          plans=plans.sort(`-&{req.query.sort}`);
      }

      if(req.query.sort){
          let selectionCriteria=req.query.select.split("%").join(" ");
          plan=plans.selectionCriteria;
      }
       
      if(req.query.limit||req.query.page){
          const page=Number(req.query.page)||1;
          const limit=Number(req.query.limit)||3
          const toSkip=limit*(page-1);
          plan=plan.skip(toSkip).limit(limit);
      }
        let allPlans=plan;
        
        res.status(200).json({
        data:allPlans
    });


     }



    catch(err){
        res.status(401).json({
            "status":"fail to Load data",
            data:err
        })
      }
}

module.exports.getPlan= async function(req,res)
{ try{
    const plan = await planModel.findOne();
    res.status(200).json({
    data:plan
});
 }
catch(err){
    res.status(401).json({
        "status":"fail to add data",
        data:err
    })
  }
}

module.exports.createPlan= async function(req,res){
    try{
        const plan = await planModel.create(req.body);
        res.status(201).json(
            {
            "status":"added succesfully",
            data:plan
        });
  }
  catch(err){
      res.status(401).json({
          "status":"fail to add data",
          data:err
      })
    }
}
 
module.exports.deletePlan=async function(req,res){
    try{
        const plan= await planModel.deleteOne(req.body)
        res.status(201).json({
         "status":"Deleted succesfully",
         data:plan
        });
    }
    catch(err){
     res.status(401).json({
         "status":"fail to delete data",
         data:err
     })
    }
}

 module.exports.updatePlan= async function(req,res){
    try{
        const plan=await planModel.findByIdAndUpdate(id,req.body);
        res.status(201).json({
            "status":"Updated succesfully",
            data:plan
        })
    }
    catch(err){
        res.status(401).json({
            "status":"fail to update data",
            data:err
        })
      }
    
}

