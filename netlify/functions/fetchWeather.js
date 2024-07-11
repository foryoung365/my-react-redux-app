const axios = require('axios');

exports.handler = async function(event, context) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = 'Beijing'; // 可以根据需要动态获取城市
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weather = response.data.weather[0];
    return {
      statusCode: 200,
      body: JSON.stringify(weather),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
