# node+mongo BackEnd API	
# node Commands
#For installing dependencies
npm insatll  
and install mongoDB
#For Running Node Server
npm start /  nodemon 
the sever will listen on PORT$ 4000
#Use mongo Shell or Mongo Compass for Database

 

#keypoints
#use POSTMAN to check api calls

1> i have not created front end or not used any mailer to send mails fro forget password links as it requires more REST CALLS FORM FRONTEND. 
2> We can use same REQUEST  body for Forget and reset password calls . I'm returning a  link to reset password  API but We the  Request body will remain same for both cases i.e Forget and reset.
3> check this link for request's BODY 
    `https://www.getpostman.com/collections/fdd07d3303754ab80833`
4> Schema will be in user/user.model.js
5> router call will be in user.services.js and there inner logic will be in users.controller.js
6> DATABASE configuration will be in config.json file
7> REGISTER API link `http://localhost:4000/users/register`
    REQUEST BODY: {
        "userName" :"NEEL KANTH",
    "password": "123456789",
    "email":"nkf@test"
    }
8> login Api link `http://localhost:4000/users/authenticate`
       REQUEST BODY:{
    "password": "123456789",
    "email":"nk@test"
}
9> forget Api link `http://localhost:4000/users/forget/yourEmailID` #replace your email id with registered user
10> reset passWord link `http://localhost:4000/users/reset/yourEmailid` ypu will get this link when forget Call is successfull