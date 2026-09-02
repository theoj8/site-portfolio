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
    let modale = document.querySelector(".modale");
    modif.addEventListener("click", async function() {
        modale.showModal();
        const works = await getWorks();
        let displayWorksModale = document.querySelector(".img-modale");
        displayWorksModale.innerHTML = "";
        for (let i=0; i< works.length; i++){
            const work= works[i];
            let newFigure = document.createElement("figure");
            let newImg = document.createElement("img");
            newImg.setAttribute("src", work.imageUrl)
            let newIconeBin = document.createElement("i");
            newIconeBin.setAttribute("class", "fa-solid fa-trash-can icone-bin");
            newIconeBin.setAttribute("data-work-id", work.id);
            newFigure.appendChild(newImg);
            newFigure.appendChild(newIconeBin);
            displayWorksModale.appendChild(newFigure);
            newIconeBin.addEventListener("click", async function (event) {
                let token = localStorage.getItem("token");
                let workId = event.target.getAttribute("data-work-id");
                const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE",
                    headers:{"authorization": `Bearer ${token}`}
                })
                if(response.ok){
                    event.target.parentElement.remove()
                }
            })
        }
    })
    let btnClose = document.querySelector(".btn-close-modale");
    btnClose.addEventListener("click", async function () {
        modale.close();
    })
    modale.addEventListener("click", async function (event) {
        if(event.target == modale){
            modale.close();
        }
    })
};