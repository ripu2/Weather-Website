const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const key = 'e257282a47b7b90882e0d00cacd77ab0';
// const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/', (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=metric`;
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on('data', (data) => {
                const weather = JSON.parse(data);
                res.write(
                    `<h1>The temperature in ${weather.name} is ${weather.main.temp} &#8451</h1>`
                );
                res.write(`<h1>It's a ${weather.weather[0].main}</h1>`);
                res.write(`<h1> Humdity is ${weather.main.humidity}</h1>`);
                res.end();
            });
        } else {
            res.sendFile(__dirname + '/public/error.html');
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is up on port 3000');
});