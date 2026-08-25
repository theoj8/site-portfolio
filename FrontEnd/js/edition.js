let token = localStorage.getItem("token");
if (token){
    let edition = document.querySelector(".mode-edition");
    edition.style.display = "flex";
};