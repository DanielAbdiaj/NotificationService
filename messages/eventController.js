

const client = require('twilio')('ACed5ff85b67d59f9b912cecba4d0152df', 'ad58a637d330d5830d02a537481f0f41');



const textSignup = async(req,res) =>{

  const {username} = req.body;  

  let message = {
      from: "+16204079596",
      to: "+355692395541",
      body:`Welcome ${username}! Thank you for Signing Up :)`    
  }

  client.messages.create(message).then(()=>{
    return res.status(201).json({
        message:"Text Message delivered Successfully!",
    });
  }).catch(err=>{
    return res.status(201).json({message: err});
  })
}


const whatsAppSignup = async(req,res) =>{

  // const {username} = req.body;  


  //     const phone = "+355682822680";
  //     const messg=`Welcome ${username}! Thank you for Signing Up :)`; 

  // wbm.start().then(async()=>{
  //   await wbm.send(phone,messg);
  //   await wbm.end();
  //   return res.status(201).json({
  //       message:"Text Message delivered Successfully!",
  //   });
  // }).catch(err=>{
  //   return res.status(201).json({message: err});
  // })
}



module.exports = {
    textSignup,
    whatsAppSignup
}
