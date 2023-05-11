const { io } = require("socket.io-client");

const socket=io();

async function subscribe(room) {
    
    await socket.emit("subscribe",room);

    socket.on("subscribed",(resp)=>{
      console.log(resp);//the resp contains all the notifications of that room
     })
 }

 socket.on('new-notification',(resp)=>{
      console.log(resp.message);
      console.log(resp.notifications);
  })

  async function deleteNotification(room,key){    
    await socket.emit("deleteNotifications",{room:room,key:key})
  }

