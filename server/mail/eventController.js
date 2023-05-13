
const nodemailer = require ('nodemailer');
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../env.js')

const mail = async(req,res) =>{

  const {content,targets} = req.body;  

  try{

  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object 
  let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: EMAIL,
        pass: PASSWORD
    }
  });

  // const delivered=false;
  // const error=null;

  //////

  targets.forEach((target)=> {

        let MailGenerator = new Mailgen({
          theme : 'default',
          product :{
              name : "Mailgen",
              link : 'https://mailgen.js'
          }
        })

        let response = {
          body: {
            intro:content,
          }
        }
        
        let mail = MailGenerator.generate(response);

        let message = {
          from: EMAIL, // sender address
          to: target, // list of receivers
          subject: "NOTIFICATION", // Subject line
          html:mail
        }

        transporter.sendMail(message)

    });

        return res.status(201).json({
          message:"All emails delivered Successfully!",
        });

    }catch(err){
      return res.status(201).json({
        message:"Something went wrong",
      });
    }

}
module.exports = {
    mail
}
