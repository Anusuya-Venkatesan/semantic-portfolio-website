const apiKey = "fb3870359d0986caac08c0fd31949e60";

const cityInput =
document.getElementById("cityInput");

const searchBtn =
document.getElementById("searchBtn");

const weatherResult =
document.getElementById("weatherResult");

async function getWeather(city){

    try{

        weatherResult.innerHTML =
        "<p>Loading...</p>";

        const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
}
        const data =
        await response.json();

        displayWeather(data);

    }

    catch(error){

        weatherResult.innerHTML =
        `<p>${error.message}</p>`;
    }
}

function displayWeather(data){

    weatherResult.innerHTML = `
        <h2>${data.name}</h2>

        <p>
            Temperature:
            ${data.main.temp} °C
        </p>

        <p>
            Humidity:
            ${data.main.humidity}%
        </p>

        <p>
            Wind Speed:
            ${data.wind.speed} m/s
        </p>

        <p>
            Weather:
            ${data.weather[0].description}
        </p>
    `;
}

searchBtn.addEventListener(
    "click",
    () => {

        const city =
        cityInput.value.trim();

        if(city !== ""){
            getWeather(city);
        }
    }
);

cityInput.addEventListener(
    "keypress",
    (e) => {

        if(e.key === "Enter"){
            searchBtn.click();
        }
    }
);
