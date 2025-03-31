import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const addTask = (text, priority, location) => async dispatch => {
  const task = {
    id: uuidv4(),
    text,
    priority,
    location: location || null,
    weather: null,
  };
  dispatch({ type: 'ADD_TASK', payload: task });
  if (location) {
    dispatch(fetchWeather(task.id, location));
  }
};

export const deleteTask = id => ({ type: 'DELETE_TASK', payload: id });

export const updateTask = (id, updates) => ({ type: 'UPDATE_TASK', payload: { id, updates } });

export const fetchWeather = (id, location) => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    const weatherData = {
      description: response.data.weather[0].description,
      temp: response.data.main.temp,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`,
    };
    dispatch(updateTask(id, { weather: weatherData }));
  } catch (error) {
    dispatch(updateTask(id, { weather: { error: 'Unable to fetch weather data' } }));
  }
};