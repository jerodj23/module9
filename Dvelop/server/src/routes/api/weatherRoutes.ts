import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService';
import WeatherService from '../../service/weatherService';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { city } = req.body; 
    if (!city) {
      return res.status(400).send('City name is required');
    }
  // TODO: GET weather data from city name
  const weatherData = await WeatherService.getWeatherForCity(city);
  // TODO: save city to search history
  const newEntry = await HistoryService.addCity(city);

  // Combine entry id and weather data
  res.json({ ...newEntry, weather: weatherData.weather });
} catch (error) {
  console.error('Error processing the weather lookup:', error);
  res.status(500).send('Internal Server Error');
}
});

// TODO: GET search history
router.get('/history', async (req, res) => {;
try {
  const history = await HistoryService.getHistory();
  res.json(history);
} catch (error) {
  console.error('Error retrieving search history:', error);
  res.status(500).send('Internal Server Error');
}
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
