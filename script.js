document.getElementById('search-btn').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = '02fc919340847f61eace8a270acbdc33'; // Replace with your actual OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = `${data.main.temp}°C`;
            const description = data.weather[0].description;
            const timezoneOffset = data.timezone; // Timezone offset in seconds
            const localTime = new Date((new Date().getTime()) + (timezoneOffset * 1000));
            const hours = localTime.getUTCHours().toString().padStart(2, '0');
            const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('description').textContent = description;
            document.getElementById('time').textContent = `Local time: ${formattedTime}`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});




document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '02fc919340847f61eace8a270acbdc33';
    const city = 'tunisia'; // Example location

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

   
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const location = `${data.name}, ${data.sys.country}`;
            const temperature = `${data.main.temp}°C`;
            const description = data.weather[0].description;
            const feelsLike = `Feels like: ${data.main.feels_like}°C`;
            const wind = `Wind: ${data.wind.speed} m/s`;
            const humidity = `Humidity: ${data.main.humidity}%`;

            document.getElementById('location').textContent = location;
            document.getElementById('temperature').textContent = temperature;
            document.getElementById('description').textContent = description;
            document.getElementById('feels-like').textContent = feelsLike;
            document.getElementById('wind').textContent = wind;
            document.getElementById('humidity').textContent = humidity;
        });

    // Fetch 7-day forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            for (let i = 1; i <= 7; i++) {
                const day = data.list[i * 8 - 1]; 
                const temp = `${day.main.temp}°C`;
                const time = new Date(day.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const weather = day.weather[0].main;

                document.getElementById(`day-${i}`).innerHTML = `
                    <p>${time}</p>
                    <p>${weather}</p>
                    <p>${temp}</p>
                `;
            }
        });
});


