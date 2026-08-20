async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  return works;
}

async function displayGallery() {
  const works = await getWorks();
  let gallery = document.querySelector(".gallery");
    for (let i = 0; i < works.length; i++){
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
};

displayGallery();