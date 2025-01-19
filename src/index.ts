import "./styles.css";
import { getWeather } from "./weather.js";

const form = document.getElementById("location-form") as HTMLButtonElement;
const input = document.getElementById("location") as HTMLInputElement;

const errorMessage = document.getElementById(
	"error-message"
) as HTMLHeadingElement;

const locationName = document.getElementById(
	"location-name"
) as HTMLHeadingElement;

const tempDiv = document.getElementById("temperature") as HTMLDivElement;
const feelsDiv = document.getElementById("feels-like") as HTMLDivElement;
const humidityDiv = document.getElementById("humidity") as HTMLDivElement;
const windDiv = document.getElementById("wind-speed") as HTMLDivElement;
const conditionsDiv = document.getElementById("conditions") as HTMLDivElement;

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
		} else {
			errorMessage.classList.add("hidden");
		}

		console.log(data.currentConditions);

		const { temp, feelslike, humidity, windspeed, conditions } =
			data.currentConditions;

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

const convertToF = (celsius: number): number => {
	return (celsius * 9) / 5 + 32;
};

const convertToC = (fahrenheit: number): number => {
	return ((fahrenheit - 32) * 5) / 9;
};

setupInput();
