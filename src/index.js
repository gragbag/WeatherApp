import "./styles.css";
import { getWeather } from "./weather.js";
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
        console.log(data.currentConditions);
        const { temp, feelslike, humidity, windspeed, conditions } = data.currentConditions;
        locationName.textContent = data.resolvedAddress;
        tempDiv.children[1].textContent = temp;
        feelsDiv.children[1].textContent = feelslike;
        humidityDiv.children[1].textContent = humidity;
        windDiv.children[1].textContent = windspeed;
        conditionsDiv.children[1].textContent = conditions;
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
const convertToF = (celsius) => {
    return (celsius * 9) / 5 + 32;
};
const convertToC = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
};
setupInput();
