async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}

async function displayCategorie() {
    let token = localStorage.getItem("token");
    if(token){
        return;
    }
    const categories = await getCategories();
    let filtres = document.querySelector(".zone-filtres");
    let newFiltresTous = document.createElement("button");
    newFiltresTous.setAttribute("class", "btn-filtres active");
    newFiltresTous.textContent = "Tous";
    filtres.appendChild(newFiltresTous);
        for (let i = 0; i < categories.length; i++){
            const category = categories[i];
            let newFiltres = document.createElement("button");
            newFiltres.setAttribute("data-category-id", category.id);
            newFiltres.setAttribute("class", "btn-filtres");
            newFiltres.textContent = category.name;
            filtres.appendChild(newFiltres);
            newFiltres.addEventListener("click", async function(event){
                let allButton = document.querySelectorAll(".btn-filtres");
                for (let i=0; i < allButton.length; i++){
                    allButton[i].classList.remove("active");
                }
                event.target.classList.add("active");
                let idCategory = event.target.getAttribute("data-category-id");
                const works = await getWorks();
                let worksFiltres = works.filter(function(work){
                    return work.categoryId == idCategory
                })
                document.querySelector(".gallery").innerHTML = "";
                let gallery = document.querySelector(".gallery");
                for (let i=0; i < worksFiltres.length; i++){
                    const work = worksFiltres[i];
                    let newFigure = document.createElement("figure");
                    let newImg = document.createElement("img");
                    newImg.setAttribute("src", work.imageUrl);
                    newImg.setAttribute("alt", work.title);
                    let newFigcaption = document.createElement("figcaption");
                    newFigcaption.textContent = work.title;
                    newFigure.appendChild(newImg);
                    newFigure.appendChild(newFigcaption);
                    gallery.appendChild(newFigure);
                }
            })
        }
    newFiltresTous.addEventListener("click", async function(event){
            const works = await getWorks();
            let allButton = document.querySelectorAll(".btn-filtres");
            for (let i=0; i < allButton.length; i++){
                allButton[i].classList.remove("active");
            }
            event.target.classList.add("active");
            document.querySelector(".gallery").innerHTML = "";
            let gallery = document.querySelector(".gallery");
            for (let i=0; i < works.length; i++){
                const work = works[i];
                let newFigure = document.createElement("figure");
                let newImg = document.createElement("img");
                newImg.setAttribute("src", work.imageUrl);
                newImg.setAttribute("alt", work.title);
                let newFigcaption = document.createElement("figcaption");
                newFigcaption.textContent = work.title;
                newFigure.appendChild(newImg);
                newFigure.appendChild(newFigcaption);
                gallery.appendChild(newFigure);
            }
        })
}
displayCategorie();