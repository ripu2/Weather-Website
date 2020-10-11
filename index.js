const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const key = 'e257282a47b7b90882e0d00cacd77ab0';
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/result', (req, res) => {
    const city = req.body.city;
    const country = req.body.country;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}&units=metric`;
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on('data', (data) => {
                const weather = JSON.parse(data);
                const cityName = weather.name;
                const temp = weather.main.temp;
                const type = weather.weather[0].main
                const humidity = weather.main.humidity
                console.log(weather)
                res.render('result', { cityName: cityName, temp: temp, type: type, humidity: humidity })

            });
        } else {
            res.sendFile(__dirname + '/public/error.html');
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is up on port 3000');
});