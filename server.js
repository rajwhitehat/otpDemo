const express = require('express');
const bodyparser =  require('body-parser');
var request = require('request');

const app = express();

app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended: true}));

/* 2factor.in 
params required - mobile

Response will be like - {"Status":"Success","Details":"08cf9005-9fd3-4412-a2b2-95de1913cb57"}

details is the sessionId
*/


app.post('/sendOtp', (req,res,next)=>{
    request(`https://2factor.in/API/V1/de56ca2b-4b5f-11ea-9fa5-0200cd936042/SMS/${req.body.mobile}/AUTOGEN`, function (error, response, body) {
        res.send(body, error, response)
      });
})

/* 2factor.in 

params required - sessionId (recieved in previous step) and otp

Response will be like - {"Status":"Success","Details":"OTP Matched"}
*/

app.post('/verifyOtp', (req,res,next)=>{
    request(`https://2factor.in/API/V1/de56ca2b-4b5f-11ea-9fa5-0200cd936042/SMS/VERIFY/${req.body.sessionId}/${req.body.otp}`, function (error, response, body) {
        res.send(body, error, response)
      });
})



/*  MSG91

const data = { sender: 'SOCKET',
route: '4',
country: '91',
sms: 
 [ { message: `Your OTP is 1236`, to: [ '8708242035' ] } ] }

const options = {
    url: 'https://api.msg91.com/api/v2/sendsms',
    "headers": {
        "authkey": "317474A3nLNGLwn3Df5e400cdbP1",
        "content-type": "application/json"
      }
  };
app.post('/sendOtp', (req,res,next)=>{
    request(options, async (err, response, body)=>{
       // res.send(body)

       request({
        har: {
          url: 'https://api.msg91.com/api/v2/sendsms',
          method: 'POST',
          headers: {
            "authkey": "317474A3nLNGLwn3Df5e400cdbP1",
            "content-type": "application/json"
          },
          postData: {
            mimeType: 'application/json',
            params: [
              {
                name: 'route',
                value: 4
              },
              {
                name: 'country',
                value: 91
              },
              {
                name: 'sms',
                value: [ { message: `Your OTP is 1236`, to: [ '8708242035' ] } ] 
              }
            ]
          }
        }
      }, async(error, response, body) => {
          res.send(body);
      })
    } );

});

*/


/*  Send OTP AAPI

app.post('/sendOtp', (req,res,next)=>{
    request(`http://api.msg91.com/api/sendotp.php?authkey=317474A3nLNGLwn3Df5e400cdbP1&mobile=918708242035&message=Your%20otp%20is%202786&otp=2786`, function (error, response, body) {
        res.send(body)
      });
})

*/



app.listen(3077);

