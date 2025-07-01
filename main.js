document.addEventListener('DOMContentLoaded', () => {
    let selectedCity = null;
    const apiKey = '149f7a9a2ac54271844135747250107';
    const cityInput = document.getElementById('cityInput');
    const findButton = document.getElementById('findBtn'); 
    if (!cityInput) console.error('City input field not found');
    if (!findButton) console.error('Find button not found');

    async function searchCities(query) {
        const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network error: ${response.status}`);
            const cities = await response.json();
            if (cities.length > 0) selectedCity = cities[0].name;
            else selectedCity = null;
            return cities;
        } catch (error) {
            console.error('Error searching cities:', error);
            return [];
        }
    }

    async function getWeatherForecast(cityName) {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(cityName)}&days=3&aqi=no&alerts=no`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network error: ${response.status}`);
            const data = await response.json();
            if (data.error) throw new Error(data.error.message);
            return data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert(`Failed to fetch weather data: ${error.message}`);
            return null;
        }
    }

    function updateWeatherCards(data) {
        if (!data) return;

        const forecastDays = data.forecast.forecastday;

        const card1 = document.getElementById("card-day-1");
        const card2 = document.getElementById("card-day-2");
        const card3 = document.getElementById("card-day-3");

        if (card1) {
            card1.querySelector('.location-name').textContent = `${data.location.name} – ${data.location.region || 'N/A'}`;
            card1.querySelector('.temp-now').textContent = `${forecastDays[0].day.avgtemp_c}ºC`;
            card1.querySelector('img').src = `https:${forecastDays[0].day.condition.icon}`;
            card1.querySelector('.condition-text').textContent = forecastDays[0].day.condition.text;
            const stats = card1.querySelectorAll('.weather-stats span');
            stats[0].textContent = `${forecastDays[0].day.avghumidity}%`;
            stats[1].textContent = `${forecastDays[0].day.maxwind_kph}km/h`;
            stats[2].textContent = forecastDays[0].day.wind_dir;
        }

        if (card2) {
            card2.querySelector('.temp-now').textContent = `${forecastDays[1].day.avgtemp_c}ºC`;
            card2.querySelector('.temp-low').textContent = `${forecastDays[1].day.mintemp_c}º`;
            card2.querySelector('img').src = `https:${forecastDays[1].day.condition.icon}`;
            card2.querySelector('.condition-text').textContent = forecastDays[1].day.condition.text;
        }

        if (card3) {
            card3.querySelector('.temp-now').textContent = `${forecastDays[2].day.avgtemp_c}ºC`;
            card3.querySelector('.temp-low').textContent = `${forecastDays[2].day.mintemp_c}º`;
            card3.querySelector('img').src = `https:${forecastDays[2].day.condition.icon}`;
            card3.querySelector('.condition-text').textContent = forecastDays[2].day.condition.text;
        }
    }

    async function handleSearch() {
        if (!selectedCity) {
            alert("Please enter a valid city.");
            return;
        }

        const data = await getWeatherForecast(selectedCity);
        updateWeatherCards(data);
    }

    cityInput.addEventListener('input', async function (e) {
        const query = e.target.value.trim();
        if (query.length < 3) {
            selectedCity = null;
            return;
        }

        const cities = await searchCities(query);
        if (cities.length > 0) {
            selectedCity = cities[0].name;
        } else {
            selectedCity = null;
        }
    });

    cityInput.addEventListener('keypress', async function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            await handleSearch();
        }
    });

    findButton.addEventListener('click', async function (e) {
        e.preventDefault();
        await handleSearch();
    });
});
