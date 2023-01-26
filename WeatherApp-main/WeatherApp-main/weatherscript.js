// Weather UI

// Unsplash

let unsplashkey = "7Mu9_1LwP8L35rFjf3kPQa-MyjPzc6iNC7TRFEe4Ulk";
let endpoint = `https://api.unsplash.com/search/photos?query=snow&client_id=${unsplashkey}
`;

// Api Key
let apikey = "dc3ad3b4c9097cc45f30d92ade5b2181";

// Form Data
let citynameinput = document.getElementById("cityname");
let form = document.querySelector("form");

// Temperature and Image Description Main Box
let content = document.querySelector(".content");

// Ḷoader box

let loader = document.querySelector(".loader-box");

// Everything should happen when clicked on submit

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loader.classList.remove("unactive");

  const fetchweather = async function () {
    let weatherlink = `https://api.openweathermap.org/data/2.5/weather?q=${citynameinput.value}&appid=${apikey}`;

    let rawdata = await fetch(weatherlink);
    let weatherdata = await rawdata.json();
    citynameinput.value = "";

    return weatherdata;
  };

  let weatherresult = fetchweather();

  weatherresult.then((data) => {
    let html = `<div class="citydescription">
        <h3 class="citytext text-uppercase">${data.name}, ${
      data.sys.country
    }</h3>
        <h4 class="typeofatmosphere text-uppercase">${data.weather[0].main}</h4>
      </div>

      <div class="weather-img">
        <img src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="" />
      </div>

      <div class="temp-description">
        <h1 class="text-uppercase">${(data.main.temp - 273.15).toFixed(
          2
        )}°C</h1>
        <h4 class="text-uppercase">
          MIN:${(data.main.temp_min - 273.15).toFixed(
            2
          )}°C <span>|</span> MAX:${(data.main.temp_max - 273.15).toFixed(2)}°C
        </h4>
      </div>`;
    loader.classList.add("unactive");
    content.innerHTML = html;

    let atmosphere = document.querySelector(".typeofatmosphere").innerHTML;

    randomImage(atmosphere);
  });

  content.innerHTML = "";
  loader.classList.remove("unactive");
});

// Image Generator

function randomImage(query) {
  let endpoint = `https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashkey}`;

  let getImage = async function () {
    let imagedata = await fetch(endpoint);
    let finaldata = await imagedata.json();
    let photo =
      // We Always Select random Array
      finaldata.results[Math.floor(Math.random() * finaldata.results.length)];
    document.getElementsByTagName(
      "body"
    )[0].style.backgroundImage = `url('${photo.urls.raw}')`;
  };

  let imageresult = getImage();
}
