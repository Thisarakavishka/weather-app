import axios from 'axios';
import { apiKey } from '@/constants/constants';

const forecastEndpoint = (params: { city: string; days: string; }) => `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.city}&days=${params.days}&aqi=no&alerts=no`;
const locationsEndpoint = (params: { city: string; }) => `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.city}`;

const apiCall = async (endpoint: string) => {
    const options = {
        method: 'GET',
        url: endpoint
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return null;
    }
}

export const fetchForecastData = (params: { city: string; days: string; }) => {
    return apiCall(forecastEndpoint(params));
}

export const fetchLocationData = (params: { city: string; }) => {
    return apiCall(locationsEndpoint(params));
}