let furture = {
    "apikey": "5ae33c0bfefa99010b792b2e5c31bbd1",
    fetchfurture: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
            + city
            + "&units=metric&appid="
            + this.apikey
        )
            .then((Response) => Response.json())
            .then((data) =>this.displyfurture(data));
    },

    displyfurture: function(data) {
        let otherDayForcast = ''
        data.daily.forEach((day, idx) => {
            if (idx == 0) {
                currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${list.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Night - ${list.main.temp_min}&#176;C</div>
                <div class="temp">Day - ${list.main.temp_max}&#176;C</div>
            </div>
            
            `
            } else {
                otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${list.main.temp_min}&#176;C</div>
                <div class="temp">Day - ${list.main.temp_max}&#176;C</div>
            </div>
            
            `}
        })
        weatherForecastEl.innerHTML = otherDayForcast;
        
    }
    
}