import { creations } from "./script.js";
import { genererCreation } from "./script.js";
// const templateModifier = document.getElementById("template-modifier");
// if (templateModifier) {
//     const clone = document.importNode(templateModifier.content, true);
//     document.getElementById("portfolio").appendChild(clone);
// }

const openModale = function(event) {
    try {
        event.preventDefault();
        const target = event.target.getAttribute('href');
        const modale = document.querySelector(target);

        if (modale) {
            modale.style.display = "block";  
            modale.removeAttribute("aria-hidden");
            modale.setAttribute("aria-modal", "true");
            modale.classList.add("modale-active");
            backdrop.style.display = "block"; 
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
        const modaleActive = document.querySelector('.modale-active'); 
        if (modaleActive) {
            modaleActive.style.display = "none"; 
            modaleActive.setAttribute("aria-hidden", "true");
            modaleActive.removeAttribute("aria-modal");
            modaleActive.classList.remove("modale-active");
            backdrop.style.display = "none";
        } else {
            console.error("Modale non trouvée pour fermer");
        }
    } catch (error) {
        console.log(error);
    }
};

const backdrop = document.getElementById("backdrop")

backdrop.addEventListener("click", closeModale)

document.querySelectorAll('.close-modale').forEach(button => {
    button.addEventListener("click", closeModale);
});

async function supprimerImg(id) {
    try {
        const token = JSON.parse(sessionStorage.getItem("token"));
        console.log("Token: ", token);

        if (!token) {
            console.error("pas de token");
            return;
        }

        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json" 
            }
        });

        if (!res.ok) {
            const errorMessage = await res.text();
            console.error(`Erreur lors de la suppression de l'image : ${res.status} - ${errorMessage}`);
            return;
        }

        const elementASupprimer = document.querySelector(`[data-id='${id}']`);
        if (elementASupprimer) {
            elementASupprimer.remove();
            const index = creations.findIndex(creation => creation.id === id);
            creations.splice(index, 1);
            genererCreation(creations);
        } else {
            console.log(`le numero d'id ${id} n'a pas été trouvé`);
        }

    } catch (error) {
        console.error("Erreur lors de la suppression de l'image:", error);
    }
}

const galleryModale = document.querySelector(".gallery-modale");

async function ajouterImgModale(creations) {
    try{
    galleryModale.innerHTML = "";
    creations.forEach(article => {
        
        const figureGalleryModale = document.createElement("figure");

        const imageGalleryModale = document.createElement("img");
        imageGalleryModale.src = article.imageUrl;

        figureGalleryModale.setAttribute("data-id", article.id);
        
        const iconSupprimer = document.createElement("span");
        iconSupprimer.classList.add("icone-supprimer");
        iconSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        iconSupprimer.addEventListener("click", function(){
            supprimerImg(article.id);
        });

        figureGalleryModale.appendChild(iconSupprimer);
        figureGalleryModale.appendChild(imageGalleryModale);
        galleryModale.appendChild(figureGalleryModale);
    })
    }catch(error){
        console.log(error);
    }
}

const boutonAjouterPhotos = document.querySelector(".add-photos");

boutonAjouterPhotos.addEventListener("click", function(event){
    event.preventDefault();
    closeModale();
    const modalePhotos = document.getElementById("modale2")
    if(modalePhotos){
        modalePhotos.style.display = "block";
        modalePhotos.removeAttribute("aria-hidden");
        modalePhotos.setAttribute("aria-modal", "true");
        modalePhotos.classList.add("modale-active");
        backdrop.style.display = "block";
    } else{
        console.log("modale pas trouvée")
    }
});

// const boutonRevenir = document.querySelector(".revenir");
// boutonRevenir.addEventListener("click", openModale)

// const openModale = function(event) {
//     try {
//         event.preventDefault();
//         const target = event.target.getAttribute('href');
//         const modale = document.querySelector(target);

//         if (modale) {
//             modale.style.display = "block";  
//             modale.removeAttribute("aria-hidden");
//             modale.setAttribute("aria-modal", "true");
//             backdrop.style.display = "block"; // Afficher le backdrop
//             ajouterImgModale(creations);
//         } else {
//             console.error("Modale non trouvée pour le sélecteur : ", target);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

