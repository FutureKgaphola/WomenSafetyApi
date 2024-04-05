require("dotenv").config();
const checkInternetConnected = require('check-internet-connected');
const express = require('express'); 
const cors = require('cors');
const bodyParser = require('body-parser');

const { sendSMS, sendSMSFalseAlarm } = require("./utils/sendSms");

const app = express(); 
const PORT = process.env.APP_PORT; 
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res)=>{ 
    res.status(200); 
    res.send("Welcome to root URL of Server"); 
}); 

app.post('/sendsms', (req, res)=>{
  checkInternetConnected()
  .then((result) => {
    if(result){
      const {googleUrl="no message",victimName="Anonymous"} = req.body; 
      sendSMS(googleUrl,victimName).then(()=>{
        res.json({"smsdelivery":"succesfully deliverd sms"}); 
      }).catch((err)=>{
        res.status(404).json(err);
      })
    }
  }).catch((ex) => {
    res.status(404).json(ex); 
  });
});

app.post('/falsesendsms', (req, res)=>{
  checkInternetConnected()
  .then((result) => {
    if(result){
      const {victimName="Anonymous", date_Time="Not Set"} = req.body; 
      sendSMSFalseAlarm(victimName,date_Time).then(()=>{
        res.json({"smsdelivery":"succesfully deliverd sms"}); 
      }).catch((err)=>{
        res.status(404).json(err);
      })
    }
  }).catch((ex) => {
    res.status(404).json(ex); 
  });
});

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
