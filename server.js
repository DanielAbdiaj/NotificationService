

const express = require('express')
const appRoute =require('./routes/routes.js')
const socketIO = require('socket.io')
const http = require('http');
const redis=require('redis')


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

    const key= await client.exists(target);

    if(key){
            const data = await client.get(target);
            if(data != null){
                let oldData=JSON.parse(data);
                let newData={...oldData,[message]:target}
                client.set(target,JSON.stringify(newData))
            }else{
                console.log('Could not get data from Redis!')
            }
    }
    else{
                let newData={
                    [message]:target
                }
                client.set(target,JSON.stringify(newData));
            }
      
      // Emit the notification message to all connected clients
      io.to(target).emit('new-notification', message);

      res.status(200).send('Notification sent successfully');
    });

    app.post('/getRedisData', async(req, res) => {
    
        const {target}=req.body;
    
        const key= await client.exists(target);
    
        if(key){
                const data = await client.get(target);
                if(data != null){
                    res.status(200).send(data);
                }else{
                    res.status(200).send('Could not get data from Redis!');
                }
        }else{
            res.status(200).send('Target does not exist!');
        }
    });

    app.post('/updateRedisData', async(req, res) => {
    
        const {updatedData,target}=req.body;
    
        const key= await client.exists(target);
    
        if(key){
                client.set(target,updatedData)
                res.status(200).send('Target updated successfuly!');
        }else{
            res.status(200).send('Target does not exist!');
        }
    });
      

io.on('connection',function(socket){

    console.log('Made socket connection!');

    socket.on('disconnect',function(){
        console.log("Made socket disconnected")
    })

    socket.on('join',(userRoom)=>{
        socket.join(userRoom);
    })

})


server.listen(PORT,()=>{

    console.log(`Server is running on http://localhost:${PORT}`);


})










