// I have created a variable for city, was thinking we can reuse this variable
// for the other API calls, I have tried to keep everything in one function so
// adding code below wont be an issue
var inputEl = document.getElementById('inputKey');
var previousCitiesEl = document.getElementById("previous-searches");

var savedCities = JSON.parse(localStorage.getItem('savedCities')) || []; // an empty array evaluates to truthy


let weather = {
    apiKey: "f2da475e3f33a76106dd40ea31ab6cfa",
    // Below Code: Use to create dynamic buttons
    // createCityButtons: function(cityArray) {
    //   for(let i = 0; i < cityArray.length; i++) {
    //     console.log('inside createCityButtons iteration ' + i);
    //     let btn = document.createElement("button");
    //     btn.textContent(cityArray[i]);
    //     btn.setAttribute("class", "cisco-give-class-name-here");
    //     btn.setAttribute("id", `btn${i}`);
    //     btn.addEventListener("click", search);
    //     previousCitiesEl.append(btn);
    //   }
    // },
    // lets begin to comment our code
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=imperial&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        console.log(data);
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "??F";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        console.log(name);
        displayMapLocation(data.coord.lat, data.coord.lon);
    },
    search: function () {
        this.fetchWeather(inputEl.value);
        let searchedCity = inputEl.value;
        savedCities = [...savedCities, searchedCity];
        localStorage.setItem('savedCities', JSON.stringify(savedCities));
        console.log(savedCities);
        // this.createCityButtons(savedCities);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    // localStorage will go here?
});

inputEl.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Miami");

//Add other API with city + whatever other parameters needed
//using this as city variable

//If you want to use the same city that is typed into the search bar for the other api use:,
//inputEl.value
var parkMap = L.map("parkMap");

// Map Object created!
function displayMapLocation(lat, lon) {
    parkMap.setView([lat, lon], 10);
    // uses css link to add sytled tiles to object named "parkMap"
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 16,
        attribution: "?? OpenStreetMap",
    }).addTo(parkMap);
    var circle = L.circle([lat, lon], {
        color: "orange",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 1500,
    }).addTo(parkMap);
}

// localStorage.setItem("city", "Miami");
// console.log(localStorage.key(0));