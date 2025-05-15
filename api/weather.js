import axios from 'axios';
import { apiKey } from '../constants/index';

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`

const apiCall = async (endpoint) => {
  const options = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request(options);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw error;
    } else {
      console.error('Unknown error:', error.message);
      throw error;
    }
  }
};

export const fetchWeatherForecast = params => {
    return apiCall(forecastEndpoint(params));
}
export const fetchLocations = params => {
    return apiCall(locationsEndpoint(params));
}