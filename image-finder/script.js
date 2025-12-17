const formWrapper = document.querySelector(".form-wrapper"),
    form = document.querySelector("#form"),
    searchInput = document.querySelector("#searchInput"),
    buttonWrapper = document.querySelector(".button-wrapper"),
    searchButton = document.querySelector("#searchButton"),
    clearButton = document.querySelector("#clearButton"),
    imageListWrapper = document.querySelector(".imageList-wrapper");



runEventListener();

function runEventListener() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}
function clear() {
    searchInput.value = "";
    imageListWrapper.innerHTML = "";
}
function search(e) {
    imageListWrapper.innerHTML = "";
    e.preventDefault();
    const value = searchInput.value.trim();

    if (value == "") {
        alert("Please enter a search term.");
        return
    }
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID YZ3tjeNoPCfQFi4VDBmVJ_TN-YNhtZ9YY79BPvXY6BU"
        }
    })
        .then((rest) => rest.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                addImageToUI(image.urls.small)
            })
        })
        .catch((err) => UIerror(err));
}

function addImageToUI(url) {
    const div = document.createElement("div");
    div.classList.add("card");
    const img = document.createElement("img");
    img.setAttribute("src", url);
    img.height = "300";
    img.width = "300";
    div.appendChild(img);
    imageListWrapper.appendChild(div);
}

function UIerror(err) {
    alert("Oops! We couldn't load the image. Please try again.");
}