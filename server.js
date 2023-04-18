

const express = require('express')
const appRoute =require('./routes/routes.js')
const socketIO = require('socket.io')
const http = require('http');


const app =express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// ROUTES

app.use('/api',appRoute);

const server = http.createServer(app);
const io = socketIO(server);


app.get('/',function(req,res){
    res.sendFile(__dirname+"/"+"index.html");
})


app.post('/notifications', (req, res) => {
    
    const {message}=req.body;
      // Emit the notification message to all connected clients
      io.emit('new-notification', message);
  
      res.status(200).send('Notification sent successfully');
    });
  

io.on('connection',function(socket){

    console.log('Made socket connection!');

    socket.on('disconnect',function(){
        console.log("Made socket disconnected")
    })

})


server.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);


})










