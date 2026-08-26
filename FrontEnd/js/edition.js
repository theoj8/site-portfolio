let token = localStorage.getItem("token");
if (token){
    let edition = document.querySelector(".mode-edition");
    edition.style.display = "flex";
    let login = document.querySelector(".btn-login");
    login.textContent = "logout";
    login.setAttribute("href", "#");
    login.addEventListener("click", async function (event){
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
    let modif = document.querySelector(".btn-modifier");
    modif.style.display = "flex";
    let project = document.querySelector(".project");
    project.style.margin = "0 0 0 100px";
};