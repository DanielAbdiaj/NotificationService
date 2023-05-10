# Notification Service
This is a service I have build using Express.js(which is a back end web application framework for building RESTful APIs with Node.js) for sending notifications to a user
using :

* Emails
* Text Messagges
* Live Push Notifications

## Description
The purpose of this service is to send notifications to a group of users in 3 different ways.So I have created 3 different **endpoints** for every operation.
The idea is that you will call the post method for a specific endpoint(for ex. I will call the email endpoint) and give the necessary information( in JSON format ) 
about the :

* Content: 'Welcome to our Site!' (content of the notification)
* Target: 'example@gmail.com' (Who to send the notification to)

In this way my server using nodemailer will send notifications to a specific group of users.The same approach is implemented also for Text Messages 
and Live Push Notifications.

The usage on each of these is explained with details down bellow.

## Usage

First and foremost before starting anything else you have to open you terminal and run `npm install`.This will download all 
the neccessary packages and dependencies that you will need for the server to work.

Then you have to start your server using `npm start`.This will start you server and now you are ready to go!

### Sending Emails

Like I explained above to send an email to a specific group of users you have to call a post method to the API endpoint that is used to send emails.

Email endpoint : http://localhost:5000/api/mail






