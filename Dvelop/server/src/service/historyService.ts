import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import city from '../service/weatherService'
// TODO: Define a City class with name and id properties
class City {
  constructor(name, id, date, temperature, wind, humidity) {
    this.name = name;
    this.id = id;
    this.date = date;
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
  }
}

//export default City;
// TODO: Complete the HistoryService class
const searchHistoryFilePath = path.resolve('searchHistory.json');

class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  //private async read() {}
  private async read() {
    try {
      const data = await fs.promises.readFile(searchHistoryFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // If file doesn't exist, return an empty array
        return [];
      }
      throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]) {
    await fs.promises.writeFile(searchHistoryFilePath, JSON.stringify(cities, null, 2));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities() {
    const citiesData = await this.read();
    return citiesData.map((cityData) => new City(
      cityData.name, 
      cityData.id,
      cityData.date,
      cityData.temperature,
      cityData.wind,
      cityData.humidity
    ));
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityData) {
    const { name, date, temperature, wind, humidity } = cityData;
    let cities = await this.read();
    const newCity = new City(city, uuidv4(), date, temperature, humidity);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    let cities = await this.read();
    cities = cities.filter(city => city.id !== id);
    await this.write(cities);
  }
};
(async () => {
  const historyService = new HistoryService();
  
  await historyService.addCity({
    name: 'Atlanta', 
    date: '07/25/2023', 
    temperature: 85, 
    wind: 11, 
    humidity: 44
  });
  await historyService.addCity({
    name: 'Denver', 
    date: '07/25/2023', 
    temperature: 75, 
    wind: 33, 
    humidity: 65
  }); await historyService.addCity({
    name: 'Seattle', 
    date: '07/25/2023', 
    temperature: 54, 
    wind: 15, 
    humidity: 54
  }); await historyService.addCity({
    name: 'San Francisco', 
    date: '07/25/2023', 
    temperature: 66, 
    wind: 7, 
    humidity: 55
  }); await historyService.addCity({
    name: 'Orlando', 
    date: '07/25/2023', 
    temperature: 67, 
    wind: 6, 
    humidity: 30
  }); await historyService.addCity({
    name: 'New York', 
    date: '07/25/2023', 
    temperature: 50, 
    wind: 11, 
    humidity: 20
  }); await historyService.addCity({
    name: 'Chicago', 
    date: '07/25/2023', 
    temperature: 65, 
    wind: 5, 
    humidity: 43
  }); await historyService.addCity({
    name: 'Austin', 
    date: '07/25/2023', 
    temperature: 80, 
    wind: 10, 
    humidity: 30
  });
  // Get cities
  const cities = await historyService.getCities();
  console.log(cities);

  await historyService.removeCity(cities[0].id);

  const updatedCities = await historyService.getCities();
  console.log(updatedCities);
})();
export default new HistoryService();
