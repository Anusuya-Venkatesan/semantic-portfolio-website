const apiKey = "YOUR_API_KEY";

async function getWeather() {

    const city = document.getElementById("city").value;

    const weatherDiv = document.getElementById("weather");

    weatherDiv.innerHTML = "Loading...";

    try {

        const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);

    }

    catch(error){

        weatherDiv.innerHTML =
        `<p>${error.message}</p>`;

    }

}

function displayWeather(data){

const weatherDiv =
document.getElementById("weather");

weatherDiv.innerHTML=`

<h2>${data.name},
${data.sys.country}</h2>

<p><b>Temperature:</b>
${data.main.temp} °C</p>

<p><b>Humidity:</b>
${data.main.humidity}%</p>

<p><b>Wind Speed:</b>
${data.wind.speed} m/s</p>

<p><b>Condition:</b>
${data.weather[0].description}</p>

`;

}
