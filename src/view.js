const form = document.getElementById("location-form");
const input = document.getElementById("location");
const setupInput = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = input.value;
        console.log(location);
    });
};
export { setupInput };
