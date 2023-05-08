

const express = require('express')
const appRoute =require('./routes/routes.js')
const socketIO = require('socket.io')
const http = require('http');
const redis=require('redis')
const uniqid =require('uniqid');


const app =express();

const PORT = process.env.PORT || 5000;
const REDIS_PORT=6379;

//Redis setup

const client=redis.createClient(REDIS_PORT);

client.connect().then(()=>{
    console.log("Connected with Redis!")
}).catch(err=>{
    console.log(err);
})


app.use(express.json());

// ROUTES

app.use('/api',appRoute);

const server = http.createServer(app);
const io = socketIO(server);


app.get('/index1',function(req,res){
    res.sendFile(__dirname+"/"+"index_1.html");
})

app.get('/index2',function(req,res){
    res.sendFile(__dirname+"/"+"index_2.html");
})

app.get('/index3',function(req,res){
    res.sendFile(__dirname+"/"+"index_3.html");
})



    app.post('/notifications', async(req, res) => {
    
            const {message,target}=req.body;

            client.hSet(target,uniqid(),message);

            const notifications=await client.hGetAll(target);

            // Emit the notification message to all connected clients
            io.to(target).emit('new-notification', {message: message, notifications: notifications});

            res.status(200).send('Notification sent successfully');
    });



    app.post('/getRedisData', async(req, res) => {
    
        const {target}=req.body;

        const result= await client.hGetAll(target);

        res.status(200).send(result);
    });

    app.post('/deleteRedisData', async(req, res) => {
    
        const {target,key}=req.body;
        
       const result = client.hDel(target,key);

       res.status(200).send("Data deleted succesfully!");
    });
      

io.on('connection',function(socket){

    console.log('Made socket connection!');

    socket.on('disconnect',function(){
        console.log("Made socket disconnected")
    })

    socket.on('join',async(userRoom)=>{
        await socket.join(userRoom);
        const notifications=await client.hGetAll(userRoom);
        io.to(userRoom).emit("joined",notifications)
    })

    socket.on('deleteNotifications',async(res)=>{
        await client.hDel(res.target,res.key);
    })
})

server.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);


})










