
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export function subscribe(room){
  return new Promise((resolve, reject) => {
      socket.emit("subscribe",room);
      socket.on("subscribed",(resp)=>{
          console.log("Subscribed")
          resolve(resp);
       })
  });
}

export function newNotification(callback) {
  socket.on('new-notification', (resp) => {
    callback(resp);
  });
}

export function deleteNotification(room,key){
   socket.emit("deleteNotifications",{room:room,key:key})
    return 'Notification deleted Successfully!'
  }




  
  