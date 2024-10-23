import { creations } from "./script.js";
// const templateModifier = document.getElementById("template-modifier");
// if (templateModifier) {
//     const clone = document.importNode(templateModifier.content, true);
//     document.getElementById("portfolio").appendChild(clone);
// }
console.log(creations)
const openModale = function(event) {
    try {
        event.preventDefault();
        const target = event.target.getAttribute('href');
        const modale = document.querySelector(target);

        if (modale) {
            modale.style.display = "block";  
            modale.removeAttribute("aria-hidden");
            modale.setAttribute("aria-modal", "true");
            backdrop.style.display = "block"; // Afficher le backdrop
            ajouterImgModale(creations);
        } else {
            console.error("Modale non trouvée pour le sélecteur : ", target);
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelectorAll('.lienModale').forEach(a => {
    a.addEventListener("click", openModale);
});

const closeModale = function() {
    try {
        const modale = this.closest('.modale'); 
        if (modale) {
            modale.style.display = "none"; 
            modale.setAttribute("aria-hidden", "true");
            modale.removeAttribute("aria-modal");
            backdrop.style.display = "none"; // Cacher le backdrop
        } else {
            console.error("Modale non trouvée pour fermer");
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelectorAll('.close-modale').forEach(button => {
    button.addEventListener("click", closeModale);
});

const galleryModale = document.querySelector(".gallery-modale");

async function ajouterImgModale(creations) {
    galleryModale.innerHTML = "";
    creations.forEach(article => {
        
        //Création des éléments 
        const figureGalleryModale = document.createElement("figure");

        const imageGalleryModale = document.createElement("img");
        imageGalleryModale.src = article.imageUrl;
        
        const iconSupprimer = document.createElement("span");
        iconSupprimer.classList.add("icone-supprimer");
        iconSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        figureGalleryModale.appendChild(iconSupprimer);
        figureGalleryModale.appendChild(imageGalleryModale);
        galleryModale.appendChild(figureGalleryModale);
    })
}
