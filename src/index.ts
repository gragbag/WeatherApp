import "./styles.css";
import { getWeather } from "./weather.js";
import { getGif } from "./gif.js";

const form = document.getElementById("location-form") as HTMLButtonElement;
const input = document.getElementById("location") as HTMLInputElement;

const errorMessage = document.getElementById("error-message") as HTMLHeadingElement;

const locationName = document.getElementById("location-name") as HTMLHeadingElement;

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

const getSelectedDegree = (): string => {
	const selected = document.querySelector('input[name="degree"]:checked') as HTMLInputElement;
	if (selected) {
		return selected.value;
	}

	return "fahrenheit";
};

const convertToF = (celsius: number): string => {
	return ((celsius * 9) / 5 + 32).toFixed(1);
};

const convertToC = (fahrenheit: number): string => {
	return (((fahrenheit - 32) * 5) / 9).toFixed(1);
};

document.querySelectorAll('input[name="degree"]').forEach((radio) => {
	radio.addEventListener("change", (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newDegree = target.value;

		if (!tempDiv.children[1].textContent || !feelsDiv.children[1].textContent) {
			return;
		}

		if (newDegree === "fahrenheit") {
			tempDiv.children[1].textContent = `${convertToF(parseFloat(tempDiv.children[1].textContent))} °F`;
			feelsDiv.children[1].textContent = `${convertToF(parseFloat(feelsDiv.children[1].textContent))} °F`;
		} else {
			tempDiv.children[1].textContent = `${convertToC(parseFloat(tempDiv.children[1].textContent))} °C`;
			feelsDiv.children[1].textContent = `${convertToC(parseFloat(feelsDiv.children[1].textContent))} °C`;
		}
	});
});

setupInput();
