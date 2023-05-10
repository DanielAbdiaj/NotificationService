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

Like I explained in the description to send an email to a specific group of users you just have to call a post method to the API endpoint (**http://localhost:5000/api/mail**) that is used to send emails and pass a JSON object with the **content**(Content of the email) and **targets**(Who to send the email to).You can do this in different ways,but the most coommon way is using **Postman**.

The API call should look something like this :

<img width="644" alt="Screenshot 2023-05-11 004931" src="https://github.com/DanielAbdiaj/NotificationService/assets/117307377/81d7f407-bc9e-4322-960b-001b5c9c658d">

If you get this response that the emails are delivered successfully then everything went ok!









