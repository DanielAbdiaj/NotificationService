

const client = require('twilio')('ACed5ff85b67d59f9b912cecba4d0152df', 'ad58a637d330d5830d02a537481f0f41');



const textMessage = async(req,res) =>{

  const {number,body} = req.body;  

  let message = {
      from: "+16204079596",
      to: number,
      body: body   
  }

  client.messages.create(message).then(()=>{
    return res.status(201).json({
        message:"Text Message delivered Successfully!",
    });
  }).catch(err=>{
    return res.status(201).json({message: err});
  })
}



module.exports = {
    textMessage
}
