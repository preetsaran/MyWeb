const nodemailer=require("nodemailer");

//using mailtrap
//Using nodemailer for testing email part of our project
module.exports=async function(Options){
try
// 1. create transport settings
{
    var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    service:"gmail",
    host:"smtp.gmail.com",
    // port: 2525,
    auth: {
         user: "sarans669@gmail.com", 
         pass: "nuenfzpeonrkvizs"
          //account.google>security>Signing in to Google>2-Step Verification(set:On)> then >app passwords>select api(other option)>generate
         //then copy password and paste in auth.pass and paste email in auth.user
    }
  });
  // 2. Email options

  const emailOptions={
      from:' "Origami" <admin@origami.com> ', //senders address
      to:Options.to, //list of receivers
      subject:Options.subject,//Subject line
      text:Options.text,
      html:Options.html //html body
  };

  //"<h1>Reset Token:</h1><p>token</p>"
  // 3. send your mail
  await transport.sendMail(emailOptions);
}
 catch(err){
     throw new Error(err)
 }

};

