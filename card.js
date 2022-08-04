var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

let weather = {
    "apikey": "5ae33c0bfefa99010b792b2e5c31bbd1",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey
        )
            .then((Response) => Response.json())
            .then((data) => this.displyWeather(data));
    },
    fetchfu: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + this.apikey
        )
            .then((Response)=> Response.json())
            .then((data)=> {
                //Getting the min and max values for each day
                for (i = 0; i < 5; i++) {
                    document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                    //Number(1.3450001).toFixed(2); // 1.35
                }

                for (i = 0; i < 5; i++) {
                    document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
                }
                //------------------------------------------------------------

                //Getting Weather Icons
                for (i = 0; i < 5; i++) {
                    document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                        data.list[i].weather[0].icon
                        + ".png";
                }
                //------------------------------------------------------------
                console.log(data)
                this.displyfuture(data);
            })

            .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))         
    },
    CheckDay: function (day){
        if(day + d.getDay() > 6){
    return day + d.getDay() - 7;
    }
    else {
    return day + d.getDay();
    }
    },

    displyWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { country } = data.sys;
        const { lon, lat } = data.coord;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "wind speed: " + speed + " Km/hr";
        document.querySelector(".time-zone").innerText =
            country + ' / ' + name;
        document.querySelector(".country").innerText =
            lon + " " + lat;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + " ')"
    },

    displyfuture: function (data) {
        document.getElementById("day1Min").innerHTML = (data.list[0].main.temp_min );
        document.getElementById("day2Min").innerHTML = Math.round(data.list[1].main.temp_min - 273.15, -2);
        document.getElementById("day3Min").innerHTML = Math.round(data.list[2].main.temp_min - 273.15, -2);
        document.getElementById("day4Min").innerHTML = Math.round(data.list[3].main.temp_min - 273.15, -2);
        document.getElementById("day5Min").innerHTML = Math.round(data.list[4].main.temp_min - 273.15, -2);

        document.getElementById("day1Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day2Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day3Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day4Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day5Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);

        document.getElementById("img1").src = "http://openweathermap.org/img/w/" +
            data.list[0].weather[0].icon
            + ".png";
        document.getElementById("img2").src = "http://openweathermap.org/img/w/" +
            data.list[1].weather[0].icon
            + ".png";
        document.getElementById("img3").src = "http://openweathermap.org/img/w/" +
            data.list[2].weather[0].icon
            + ".png";
        document.getElementById("img4").src = "http://openweathermap.org/img/w/" +
            data.list[3].weather[0].icon
            + ".png";
        document.getElementById("img5").src = "http://openweathermap.org/img/w/" +
            data.list[4].weather[0].icon
            + ".png";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector('.search button')
    .addEventListener("click", function () {
        weather.search();
    });

document
    .querySelector('.search-bar')
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });
/*geo forecast*/
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);
getWeatherData()
function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

            console.log(data)
            showWeatherData(data);
        })

    })
}
function showWeatherData(data) {
    let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E'

    

let otherDayForcast = ''
data.daily.forEach((day, idx) => {
    if (idx == 0) {
        currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Min - ${day.temp.night}&#176;C</div>
                <div class="temp">Max - ${day.temp.day}&#176;C</div>
            </div>
            
            `
    } else {
        otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Min - ${day.temp.night}&#176;C</div>
                <div class="temp">Max - ${day.temp.day}&#176;C</div>
            </div>
            
            `
    }
})


weatherForecastEl.innerHTML = otherDayForcast
};

/*function GetInfo() {

    
    
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid='+ this.apikey)
        .then(response => response.json())
        .then(data => {

            //Getting the min and max values for each day
            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                //Number(1.3450001).toFixed(2); // 1.35
            }

            for (i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
            }
            //------------------------------------------------------------

            //Getting Weather Icons
            for (i = 0; i < 5; i++) {
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon
                    + ".png";
            }
            //------------------------------------------------------------
            console.log(data)


        })

        .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))

    
        document.getElementById("day1Min").innerHTML = Math.round(data.list[0].main.temp_min - 273.15, -2);
        document.getElementById("day2Min").innerHTML = Math.round(data.list[1].main.temp_min - 273.15, -2);
        document.getElementById("day3Min").innerHTML = Math.round(data.list[2].main.temp_min - 273.15, -2);
        document.getElementById("day4Min").innerHTML = Math.round(data.list[3].main.temp_min - 273.15, -2);
        document.getElementById("day5Min").innerHTML = Math.round(data.list[4].main.temp_min - 273.15, -2);

        document.getElementById("day1Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day2Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day3Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day4Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
        document.getElementById("day5Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);

        document.getElementById("img1").src = "http://openweathermap.org/img/w/" +
            data.list[0].weather[0].icon
            + ".png";
        document.getElementById("img2").src = "http://openweathermap.org/img/w/" +
            data.list[1].weather[0].icon
            + ".png";
        document.getElementById("img3").src = "http://openweathermap.org/img/w/" +
            data.list[2].weather[0].icon
            + ".png";
        document.getElementById("img4").src = "http://openweathermap.org/img/w/" +
            data.list[3].weather[0].icon
            + ".png";
        document.getElementById("img5").src = "http://openweathermap.org/img/w/" +
            data.list[4].weather[0].icon
            + ".png";
    }
    
       


function DefaultScreen() {
    this.fetchfu(document.querySelector(".search-bar").value);
    GetInfo();
}
//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

*/

