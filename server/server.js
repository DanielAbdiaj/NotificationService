

const express = require('express')
const appRoute =require('./routes/routes.js')
const http = require('http');
const redis=require('redis')
const uniqid =require('uniqid');


const app =express();

const PORT = process.env.PORT || 5000;
const REDIS_PORT=6379;

///////Redis setup

const client=redis.createClient(REDIS_PORT);

client.connect().then(()=>{
    console.log("Connected with Redis!")
}).catch(err=>{
    console.log(err);
})

//////////////


app.use(express.json());

// ROUTES

app.use('/api',appRoute);

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});

const domains={
    connection123:[
        'http://127.0.0.1:5501',
        'http://127.0.0.1:5500'
    ]
}

function isDomainAllowed(obj, property, value) {
    if (obj.hasOwnProperty(property)) {
      const domainArray = obj[property];
      return domainArray.includes(value);
    }
    return false;
  }

io.on('connection',function(socket){

    console.log('Made socket connection!');

    const requestDomain = socket.handshake.headers.origin;
    console.log('Connection came from:', requestDomain);

    const connectionId = socket.handshake.query.id;
    console.log('Connected with ID:', connectionId);

    if (isDomainAllowed(domains,connectionId,requestDomain)) {
        console.log('Domain is allowed!');
      } else {
        console.log("This domain is not allowed")
        socket.disconnect();
      }

    socket.on('disconnect',function(){
        console.log("Made socket disconnected")
    })

    socket.on('subscribe',async(userRoom)=>{
        await socket.join(userRoom);
        console.log(`Subscribed:${userRoom}`);
        const notifications=await client.hGetAll(userRoom);
        io.to(userRoom).emit("subscribed",notifications);
    }) 

    socket.on('deleteNotifications',async(res)=>{
        await client.hDel(res.room,res.key);
    })
})


app.post('/liveNotifications', async(req, res) => {
    
            const {target,message}=req.body;

            client.hSet(target,uniqid(),message);

            const notifications=await client.hGetAll(target);

            // Emit the notification message to all connected clients
            io.to(target).emit('new-notification', {message: message, notifications: notifications});

            res.status(200).send('Notification sent Successfully');
});


server.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);
})










