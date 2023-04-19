
const nodemailer = require ('nodemailer');
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../env.js')

const mail = async(req,res) =>{

  const {user,email,body} = req.body;  

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object 
  let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: EMAIL,
        pass: PASSWORD
    }
  });

  let MailGenerator = new Mailgen({
    theme : 'default',
    product :{
        name : "Mailgen",
        link : 'https://mailgen.js'
    }
  })

  let response = {
    body: {
      name:user,
      intro:body,
    }
  }
  
  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL, // sender address
    to: email, // list of receivers
    subject: "NOTIFICATION", // Subject line
    html:mail
  }


  transporter.sendMail(message).then((info)=>{
    return res.status(201).json({
        message:"Email delivered Successfully!",
        info : info.messageId,
        preview : nodemailer.getTestMessageUrl(info)
    });
  }).catch(err=>{
    return res.status(201).json({message: err});
  })

}

module.exports = {
    mail
}
