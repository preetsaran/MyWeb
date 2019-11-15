const planModel=require("../model/planModel");
const stripe=require("stripe")("sk_test_6G4ULNI4oWEGfzW3Y6Spt30900lhWW1rEM")

module.exports.checkout=async function(req,res){
    const id=req.body.id;
    const plan=await planModel.findById(id);

   console.log(plan);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          name: plan.name,
          description: plan.description,
          amount:plan.price*100,
          currency: 'inr',
          quantity: 1
        }],
        success_url: '/',
         cancel_url: '/',
      });

      res.status(201).json({
        data:plan,
        success:"Payment object send",
        session
    })
    
}
