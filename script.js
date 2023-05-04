console.log("Hello");
let searchId = document.getElementById("searchId");
let results = document.getElementById("results");
let resultsForecast = document.getElementById("resultsForecast");

const fetchWeather = async (city) => {
  const data1 = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e38adcdee2dddf0bda006344056f8cdd`
  );

  const response1 = await data1.json();

  return response1;
};
const forecastWeather = async (city) => {
  const data2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e38adcdee2dddf0bda006344056f8cdd`
  );
  const response2 = await data2.json();
  return response2;
};

//Since after using async keyword before fetchWeather() function , so fetchWeather() function will no now return a promise
//So we are resolving the Promise  using .then() and .catch()
const getWeatherData = () => {
  fetchWeather(searchId.value)
    .then((data) => {
      console.log(data.name);
      const CityName = `<p id="city"> ${data.name}</p>`;

      const convertedTemp = data.main.temp - 273;
      const convertedMinTemp = data.main.temp_min - 273;
      const convertedMaxTemp = data.main.temp_max - 273;

      results.innerHTML = `  ${CityName}
       ${"Temp  " + convertedTemp.toFixed(2)}°  <br>
        ${"Min Temp " + convertedMinTemp.toFixed(2)} <br>
         ${"Max Temp " + convertedMaxTemp.toFixed(2)} <br>
         <br>
         `;
    })
    .catch((error) => console.log("Error" + error));
};

//Since after using async keyword before forecastWeather() function , so forecastWeather() function will no now return a promise
//So we are resolving the Promise  using .then() and .catch()
const getForecastData = () => {
  forecastWeather(searchId.value)
    .then((data) => {
      console.log(data.list[0].dt);

      // const windSpeed = `<p>  Wind Speed : ${data.wind.speed}</p>`;

      const first = data.list[0].main.temp - 273;
      const firstTime = data.list[0].dt_txt;

      const second = data.list[1].main.temp - 273;
      const SecondTime = data.list[1].dt_txt;

      const third = data.list[2].main.temp - 273;
      const thirdTime = data.list[2].dt_txt;

      resultsForecast.innerHTML = `
      <p> Forecast at ${firstTime} <br>
       ${first.toFixed(2)}°</p>   <br>
       <br>

       <p>Forecast at ${SecondTime} <br>
       ${second.toFixed(2)}° </p>
        <br>
        <br>
      <p>Forecast at ${thirdTime} <br>
       ${third.toFixed(2)}°</p>
         <br>`;
    })
    .catch((error) => console.log("Error" + error));
};
const search = () => {
  getWeatherData();
  getForecastData();
};
