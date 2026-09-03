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
        vueGallery.style.display = "flex";
        vueAjout.style.display = "none";
        await afficherWorksModal();
    })
    let btnAjout = document.querySelector(".btn-ajout");
    let vueGallery = document.querySelector(".vue-galerie");
    let vueAjout = document.querySelector(".vue-ajout")
    let btnBack = document.querySelector(".btn-back");
    btnAjout.addEventListener("click", async function () {
        const categories = await getCategories();
        let displaySelect = document.querySelector("#category");
        displaySelect.innerHTML = "";
        for (let i=0; i < categories.length; i++) {
            const category = categories[i];
            let newOption = document.createElement("option")
            newOption.setAttribute("value", category.id)
            newOption.textContent = category.name
            displaySelect.appendChild(newOption)
        }
        vueGallery.style.display = "none"
        vueAjout.style.display = "flex"
    })
    btnBack.addEventListener("click", function () {
        vueGallery.style.display = "flex"
        vueAjout.style.display = "none"
    })
    let btnAjoutPhoto = document.querySelector(".btn-ajouter-photo")
    let addPhoto = document.querySelector(".add-photo")
    let iconeImg = document.querySelector("#icone-img")
    btnAjoutPhoto.addEventListener("click", function() {
        addPhoto.click()
    })
    addPhoto.addEventListener("change", function() {
        let fichier = addPhoto.files[0];
        let apercuPhoto = document.querySelector(".apercu-photo")
        apercuPhoto.style.display = "flex"
        apercuPhoto.setAttribute("src", URL.createObjectURL(fichier))
        iconeImg.style.display = "none"
    })
    let formAjout = document.querySelector(".form-ajout")
    formAjout.addEventListener("submit", async function(event) {
        event.preventDefault()
        let title = document.querySelector("#title").value;
        let category = document.querySelector("#category").value;
        let img = document.querySelector("#add").files[0];
        let formData = new FormData();
        formData.append("title", title)
        formData.append("category", category)
        formData.append("image", img)
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers:{"authorization": `Bearer ${token}`},
            body: formData
        })
        if (response.ok){
            document.querySelector("#title").value ="";
            document.querySelector("#category").value= "";
            document.querySelector("#add").value= "";
            vueGallery.style.display = "flex"
            vueAjout.style.display = "none"
            await afficherWorksModal();
        }
    })
    async function afficherWorksModal() {
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
    }
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