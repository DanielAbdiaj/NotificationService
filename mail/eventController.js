
const nodemailer = require ('nodemailer');
const Mailgen = require('mailgen');
const {EMAIL,PASSWORD} = require('../env.js')

const mail = async(req,res) =>{

  const {emails,body} = req.body;  

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

  emails.forEach(email => {

        let MailGenerator = new Mailgen({
          theme : 'default',
          product :{
              name : "Mailgen",
              link : 'https://mailgen.js'
          }
        })

        let response = {
          body: {
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

        transporter.sendMail(message)

    });

        return res.status(201).json({
          message:"All emails delivered Successfully!",
        });

}
module.exports = {
    mail
}
