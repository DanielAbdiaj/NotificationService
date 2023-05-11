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

First and foremost before starting anything else you have to open you terminal and run `npm install` inside this project directory.This will download all 
the neccessary packages and dependencies that you will need for the server to work.

Then another thing that you will need is to connect your server to `Redis`.To ensure that users never miss an important live notification, 
the service also saves these messages to a Redis (which stands for Remote Dictionary Server) database when the user is offline or has not seen the message.

To connect to Redis you will have to install Redis for Windows(https://github.com/microsoftarchive/redis/releases).

Install Redis-x64-3.0.504.msi and run it (Keep in mind when installing it to add the Redis installation folder to the path enviroment variable and let
Redis to run to the deafult port **6379**)

After the installation is completed open your Command Prompt and go to the destination folder where you installed Redis (default destination folder **cd C:\Program Files\Redis**) in order to start our server.To start the server **run redis-server --port 6380 --slaveof 127.0.0.1 6379** 

<img width="960" alt="Screenshot 2023-05-10 234620" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/ea20cfe0-97cc-4ba8-b252-6d21dd9a2beb">

If you get this response your Redis database is setup!(If you want you can run also redis-cli to check your database and manually make changes)

Finally you have to start your server using `npm start`.

If everything went alright you should see this:

<img width="328" alt="Screenshot 2023-05-10 235816" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/214ffb58-3c6e-4ded-8f30-1b82278aba54">

This means that your server has started succesfully and you are connected with your Redis database!

Now you are ready to go!

* ### Sending Emails

Like I explained in the description to send an email to a specific group of users you just have to call a post method to the API endpoint (**http://localhost:5000/api/mail**) that is used to send emails and pass a JSON object with the **content**(Content of the email) and **targets**(Who to send the email to).You can do this in different ways,but the most common way is using **Postman**.

The API call should look something like this :

<img width="644" alt="Screenshot 2023-05-11 004931" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/81d7f407-bc9e-4322-960b-001b5c9c658d">

If you get this response that the emails are delivered successfully then everything went ok!

* ### Sending Text Messages
You will follow the same approach for sending text messages.You will call the post method to the API endpoint(**http://localhost:5000/api/textMessage**) 
that is used to send text messages and and pass a JSON object with the **content**(Content of the text) and **targets**(Who to send the text messages to).

The API call should look something like this :

<img width="643" alt="Screenshot 2023-05-11 011015" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/7f6282ea-a40f-45d8-9070-79eb996d1c54">

If you get this response that the text messages are delivered successfully then everything went ok!

* ### Sending Live Push Notifications
For sending live push notifications I have used socket.io.The idea behind this is that the client from his side will subscribe to a socket room using a socket ID and you
from your side can send notifications to this room.A specific room that has it's own ID can have a group of users subscribed to it.In the moment that I call the API
(http://localhost:5000/liveNotifications) with the **target**(which in this case is the socketID/room I want to emit the notification to) and **message**(which is the content of the notification I want to send)the notification will be emitted and the clients can hear for the notification(I will explain with more detail how the client part will work and how he will hear and manage the notifications in the section down bellow).

Also this is the moment where Redis come into play.You that are using this service do not know if the user that you have emitted the notification has seen it or not(he maybe offline for the moment).This is why I have incorporated Redis,for the purpose of saving those notifications.As the notification is emitted to the user it is also saved to the Redis database.You that are going send the notification do not have anything to do with Redis because you just will have to call the API and send the notification, the client on the other hand can manage those notifications in his liking!

The API call should look something like this :

<img width="643" alt="Screenshot 2023-05-11 015715" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/ceadb1e3-356b-4f26-b0d7-8d0af79b5c0a">

If you get this response that the notification delivered successfully then everything went ok!

* ### Client Side Listening for the Live Notifications









