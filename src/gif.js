const img = document.getElementById("gif");
const getGif = async (condition) => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${process.env.GIF_KEY}&s=Weather${condition}`, { mode: "cors" });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    img.src = jsonResponse.data.images.original.url;
};
export { getGif };
