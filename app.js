const { json } = require("express");
const express = require ("express"); // requiring app or creating new node app 
const bodyparser = require("body-parser");

const https = require("https");
const { url } = require("inspector");
const { urlencoded } = require("body-parser");

const app = express();   // initialise app 
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){            // what happen when user go to home page

    res.sendFile(__dirname + "/index.html" );

});

app.post("/" , function (req, res) {
     // we add name of input is cityName;
    const query = req.body.cityName;
    const apiKey = "eab74e3ef991cd9b8e443233381c61bb";
    const units = "metric";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="  + query + "&appid="  + apiKey + "&unit="  + units  + "";
    https.get(url, function(response){ 

     response.on ("data",  function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp 
        const humid = weatherdata.main.feels_like
        const wetherdes = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const imageurl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    
        console.log("temperature " + temp);
        console.log("feelslike " + humid );
        console.log("weather description " + wetherdes);
        
        res.write("<h1> The Temperature in   " + query  + " is " + temp + "</h1>");
        res.write("<p>The weather is currently " + wetherdes + "<p>");
        res.write("<img src =" + imageurl + " >");
        res.send();

     });

    });
    
    
})



app.listen(3000,function(){
    console.log("server is running on port 30000.");
}); 