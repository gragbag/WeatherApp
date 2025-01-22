const getWeather = async (location: string) => {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${process.env.WEATHER_KEY}`;
	try {
		const response = await fetch(url, { mode: "cors" });
		const data = await response.json();

		console.log(data);

		if (data.errorCode) {
			return { error: data.message };
		}

		return data;
	} catch (error) {
		console.error("Error Fetching from Visual Crossing: ", error);
		return {
			error: "Failed to fetch weather data. Please try again later.",
		};
	}
};

export { getWeather };
