# Notification Service
This is a service I have build using Express.js(which is a back end web application framework for building RESTful APIs with Node.js) for sending notifications to a user
using :

* Emails
* Text Messagges
* Live Push Notifications

## Description
The purpose of this service is to send notifications to a group of users in 3 different ways.So I have created 3 different **endpoints** for every operation.
The idea is that you will call the post method for a specific endpoint(for ex. you will call the email endpoint) and give the necessary information( in JSON format ) 
about the :

* Content: 'Welcome to our Site!' (content of the notification)
* Targets: 'example@gmail.com' (Who to send the notification to)

In this way my server using nodemailer will send notifications to a specific group of users.The same approach is implemented also for Text Messages 
and Live Push Notifications.

The usage on each of these is explained with details down bellow.

## Usage

* ### Sending Emails

Like I explained in the description to send an email to a specific group of users you just have to call a post method to the API endpoint (**url+'/api/mail'**) that is used to send emails and pass a JSON object with the **content**(Content of the email) and **targets**(Who to send the email to).

```ruby 
const data = {
  content: 'Test notification',
  targets: [
    'example1@gmail.com',
    'example2@gmail.com'
  ]
};

fetch(url+'/api/mail', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  ```


* ### Sending Text Messages
You will follow the same approach for sending text messages.You will call the post method to the API endpoint(**url+'/api/textMessage'**) 
that is used to send text messages and and pass a JSON object with the **content**(Content of the text) and **targets**(Who to send the text messages to).

```ruby 
const data ={
content:'Test notification',
 targets:[
      '+35569239****'
  ]
};

fetch(url+'/api/textMessage', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  ```

* ### Sending Live Push Notifications

For sending live push notifications the client from his side will subscribe to a room using a unique ID and you from your side can send notifications to this room.A specific room that has it's own ID can have a group of users subscribed to it.In the moment that you will call the API(**url+'/liveNotifications'**) with the **target**(which in this case is the ID/room I want to emit the notification to) and **message**(which is the content of the notification I want to send)the notification will be emitted and the clients can hear for the notification(I will explain with more detail how the client part will work and how he will hear and manage the notifications in the section down bellow).

```ruby 
const data ={
 target:'user123'
 message:'Test notification',
};

fetch(url+'/liveNotifications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  ```

## Client Side Listening for the Live Notifications

The client on his side will listen for the notifications and manage those using some specific functions.All the necessary packages and functions are inside the **notificationBundle.js file**.You just have to import the notification library from the file and use it's functions.


* **Subscribe Function**:
  This function makes it possible for the user to be subscribed to a room using socketID.So you will call this function and pass as parameter the socketID to be part of a     specific room.This function also hears if the user subscribed the room successfully and returns a JSON of the current notification of that room.
* **socket.on 'new-notification' Function**:
  Using this function the client can hear the notifications from the server(only the notifications where it's subscribed to).When the server emits a notification it emits a   message and a JSON of updated notifications of this specific room from Redis after this new notification was added.
* **Delete Function**:
  Using this function the client can manage his notifications by deleting each one of them after he has seen them.

  










