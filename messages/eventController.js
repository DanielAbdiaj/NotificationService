

const client = require('twilio')('ACed5ff85b67d59f9b912cecba4d0152df', 'ad58a637d330d5830d02a537481f0f41');



const textMessage = async(req,res) =>{

  const {numbers,body} = req.body; 
  
  
  numbers.forEach(number => {

        let message = {
          from: "+16204079596",
          to: number,
          body: body   
        }

      client.messages.create(message);
    
  });

  return res.status(201).json({
    message:"Text Message delivered Successfully!",
  })

}

module.exports = {
    textMessage
}
