import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  // Define properties for Weather
  temperature: number;
  description: string;
  timestamp: number;

  constructor(temperature: number, description: string, timestamp: number) {
    this.temperature = temperature;
    this.description = description;
    this.timestamp = timestamp;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await axios.get(`${this.baseURL}/geocode/v1/search?q=${query}&key=${this.apiKey}`);
      return response.data.results[0].locations[0];
    } catch (error) {
      throw new Error(`Unable to fetch location data: ${error.message}`);
    }
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {const coordinates: Coordinates = {
      lat: locationData.latLn[0].lat,
      lon: locationData.latLn[0].lon,
    };
    return coordinates;
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string { 
    return `${this.cityName}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const geocodeQuery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geocodeQuery);
    const coordinates = this.destructureLocationData(locationData);
    return coordinates;
 }

  /////
  // TODO: Create fetchWeatherData method
 private async fetchWeatherData(city: string): Promise<any> {
  const url = `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const {main, weather, dt} = response;
    return {
      temperature: main.temp,
      description: weather[0].description,
      timestamp: dt,
    };
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return weatherData.map((item: any) => {
      return {
        temperature: item.main.temp,
        description: item.weather[0].description,
        timestamp: item.dt,
      };
    });
  }
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
 //public async getWeatherForCity(city: string):
  
(async () => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY || 'GXHk8MRHF34p6oZitVvPlSRPoTutRb62QW61ITFJ'; 
  const city = 'Atlanta';

  const weatherService = new WeatherService(apiKey);

  try {
    const weatherData = await weatherService.getWeatherForCity(city);

    console.log(`Current Weather in ${city}:`);
    console.log(`Temperature: ${weatherData.currentWeather.temperature}°C`);
    console.log(`Description: ${weatherData.currentWeather.description}`);

    console.log(`\nForecast:`);
    weatherData.forecast.forEach((weather, index) => {
      const date = new Date(weather.timestamp * 1000);
      console.log(`Date: ${date.toLocaleString()}`);
      console.log(`Temperature: ${weather.temperature}°C`);
      console.log(`Description: ${weather.description}`);
      console.log('------------');
    });
  } catch (error) {
    console.error(error.message);
  }
})();


export default new WeatherService();
