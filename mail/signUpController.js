
const nodemailer = require ('nodemailer');
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../env.js')

const signup = async(req,res) =>{

  const {user,userEmail} = req.body;  

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
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
    body:{
        name: user,
        intro: "Thank you for Signing Up :)",
        outro : "Looking forward to help you with anything you need!"
    }
  }
  
  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL, // sender address
    to: userEmail, // list of receivers
    subject: "SIGNUP", // Subject line
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
    signup
}
