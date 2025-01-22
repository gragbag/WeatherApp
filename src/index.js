import "./styles.css";
import { getWeather } from "./weather.js";
import { getGif } from "./gif.js";
const form = document.getElementById("location-form");
const input = document.getElementById("location");
const errorMessage = document.getElementById("error-message");
const locationName = document.getElementById("location-name");
const tempDiv = document.getElementById("temperature");
const feelsDiv = document.getElementById("feels-like");
const humidityDiv = document.getElementById("humidity");
const windDiv = document.getElementById("wind-speed");
const conditionsDiv = document.getElementById("conditions");
const setupInput = () => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const location = input.value;
        input.value = "";
        const data = await getWeather(location);
        if (data.error) {
            console.log(data.error);
            errorMessage.classList.remove("hidden");
            errorMessage.textContent = data.error;
            resetOutput();
            return;
        }
        else {
            errorMessage.classList.add("hidden");
        }
        let { temp, feelslike } = data.currentConditions;
        const { humidity, windspeed, conditions } = data.currentConditions;
        locationName.textContent = data.resolvedAddress;
        const selected = getSelectedDegree();
        let degreeSymbol = "F";
        if (selected === "celsius") {
            temp = convertToC(temp);
            feelslike = convertToC(feelslike);
            degreeSymbol = "C";
        }
        tempDiv.children[1].textContent = `${temp} °${degreeSymbol}`;
        feelsDiv.children[1].textContent = `${feelslike} °${degreeSymbol}`;
        humidityDiv.children[1].textContent = `${humidity}%`;
        windDiv.children[1].textContent = `${windspeed} m/s`;
        conditionsDiv.children[1].textContent = conditions;
        getGif(conditions); //Create gif based on the conditions
    });
};
const resetOutput = () => {
    locationName.textContent = "N/A";
    tempDiv.children[1].textContent = "N/A";
    feelsDiv.children[1].textContent = "N/A";
    humidityDiv.children[1].textContent = "N/A";
    windDiv.children[1].textContent = "N/A";
    conditionsDiv.children[1].textContent = "N/A";
};
const getSelectedDegree = () => {
    const selected = document.querySelector('input[name="degree"]:checked');
    if (selected) {
        return selected.value;
    }
    return "fahrenheit";
};
const convertToF = (celsius) => {
    return ((celsius * 9) / 5 + 32).toFixed(1);
};
const convertToC = (fahrenheit) => {
    return (((fahrenheit - 32) * 5) / 9).toFixed(1);
};
document.querySelectorAll('input[name="degree"]').forEach((radio) => {
    radio.addEventListener("change", (event) => {
        const target = event.target;
        const newDegree = target.value;
        if (!tempDiv.children[1].textContent || !feelsDiv.children[1].textContent) {
            return;
        }
        if (newDegree === "fahrenheit") {
            tempDiv.children[1].textContent = `${convertToF(parseFloat(tempDiv.children[1].textContent))} °F`;
            feelsDiv.children[1].textContent = `${convertToF(parseFloat(feelsDiv.children[1].textContent))} °F`;
        }
        else {
            tempDiv.children[1].textContent = `${convertToC(parseFloat(tempDiv.children[1].textContent))} °C`;
            feelsDiv.children[1].textContent = `${convertToC(parseFloat(feelsDiv.children[1].textContent))} °C`;
        }
    });
});
setupInput();
