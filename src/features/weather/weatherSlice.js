import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Beijing&appid=eb148a0f3998e9ddf8ef13fbf44c2373';
    const response = await fetch(url);
    const json = await response.json();
    return json['weather'][0];
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: {},
        isLoading: false,
        isFailed: false
    },
    extraReducers:
        (builder) => {
            builder
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.weather = action.payload;
                state.isFailed = false;
                return state;
            }).addCase(fetchWeather.rejected, (state, action) => {
                state.isLoading = false;
                state.weather = {};
                state.isFailed = true;
                return state;
            }).addCase(fetchWeather.pending, (state) => {
                state.isLoading = true;
                state.weather = {};
                state.isFailed = false;
                return state;
            })
        }

});

export const selectWeather = (state) => state.weather.weather;
export const isWeatherLoading = (state) => state.weather.isLoading;
export const isWeatherFailed = (state) => state.weather.isFailed;

export default weatherSlice.reducer;