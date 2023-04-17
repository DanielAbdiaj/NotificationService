

const express = require('express')
const appRoute =require('./routes/routes.js')
const socket = require ("socket.io")

const app =express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// ROUTES

app.use('/api',appRoute);

app.use(express.static('public'));

const server = app.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);


})

app.get('/',function(req,res){
    res.sendFile(__dirname+"/"+"index.html");
})


// const io= socket(server);



// const message="jcnwkjcn";

//  io.on('connection',function(socket){

//     console.log('Made socket connection!');

//     socket.on('disconnect',function(){
//         console.log("Made socket disconnected")
//     })


//     io.emit('new-notification',message)

// })
