import { fetchWeatherApi } from 'openmeteo';
	
const cache = {};
const params = {
	"current": ["temperature_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "wind_speed_10m"],
	"timeformat": "unixtime",
	"forecast_days": 1
};

export const fetchData = async (latitude, longitude) => {
    const url = "https://api.open-meteo.com/v1/forecast";
    const cacheKey = latitude + "-" + longitude;
    let weatherData = cache[cacheKey] ?? null;

    if (!weatherData) {
        const responses = await fetchWeatherApi(url, {
            ...params,
            latitude,
            longitude
        });
        
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();    
        const current = response.current();

        weatherData = {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature: Math.round(current.variables(0).value()),
            apparentTemperature: Math.round(current.variables(1).value()),
            isDay: Math.round(current.variables(2).value()),
            precipitation: Math.round(current.variables(3).value()),
            rain: Math.round(current.variables(4).value()),
            showers: Math.round(current.variables(5).value()),
            snowfall: Math.round(current.variables(6).value()),
            windSpeed10m: Math.round(current.variables(7).value()),
        }

        cache[cacheKey] = weatherData;
    }

    return weatherData;    
}
