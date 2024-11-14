import { creations, genererCreation, categories } from "./script.js";

// const templateModifier = document.getElementById("template-modifier");
// if (templateModifier) {
//     const clone = document.importNode(templateModifier.content, true);
//     document.getElementById("portfolio").appendChild(clone);
// }

const openModale = function (event) {
  try {
    event.preventDefault();
    const target = event.target.getAttribute("href");
    const modale = document.querySelector(target);

    if (modale) {
      modale.style.display = "block";
      modale.removeAttribute("aria-hidden");
      modale.setAttribute("aria-modal", "true");
      modale.classList.add("modale-active");
      backdrop.style.display = "block";

      enlever.classList.remove("hidden");
      ajouterImgModale(creations);
    } else {
      console.error("Modale non trouvée pour le sélecteur : ", target);
    }
  } catch (error) {
    console.log(error);
  }
};

document.querySelectorAll(".lienModale").forEach((a) => {
  a.addEventListener("click", openModale);
});

const closeModale = function () {
  try {
    const modaleActive = document.querySelector(".modale-active");
    if (modaleActive) {
      // togglePreview();
      modaleActive.style.display = "none";
      modaleActive.setAttribute("aria-hidden", "true");
      modaleActive.removeAttribute("aria-modal");
      modaleActive.classList.remove("modale-active");
      backdrop.style.display = "none";
      formAddPhotos.reset();
      resetAjoutPhoto();
      // if (img) {
      //   img.src = "";
      // }
    } else {
      console.error("Modale non trouvée pour fermer");
    }
  } catch (error) {
    console.log(error);
  }
};

const backdrop = document.getElementById("backdrop");

backdrop.addEventListener("click", closeModale);

document.querySelectorAll(".close-modale").forEach((button) => {
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
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error(
        `Erreur lors de la suppression de l'image : ${res.status} - ${errorMessage}`
      );
      return;
    }

    const elementASupprimer = document.querySelector(`[data-id='${id}']`);
    if (elementASupprimer) {
      elementASupprimer.remove();
      const index = creations.findIndex((creation) => creation.id === id);
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
  try {
    galleryModale.innerHTML = "";
    creations.forEach((article) => {
      const figureGalleryModale = document.createElement("figure");

      const imageGalleryModale = document.createElement("img");
      imageGalleryModale.src = article.imageUrl;

      figureGalleryModale.setAttribute("data-id", article.id);

      const iconSupprimer = document.createElement("span");
      iconSupprimer.classList.add("icone-supprimer");
      iconSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

      iconSupprimer.addEventListener("click", function () {
        supprimerImg(article.id);
      });

      figureGalleryModale.appendChild(iconSupprimer);
      figureGalleryModale.appendChild(imageGalleryModale);
      galleryModale.appendChild(figureGalleryModale);
    });
  } catch (error) {
    console.log(error);
  }
}

const boutonAjouterPhotos = document.querySelector(".add-photos");

boutonAjouterPhotos.addEventListener("click", function (event) {
  event.preventDefault();
  closeModale();
  const modalePhotos = document.getElementById("modale2");
  if (modalePhotos) {
    modalePhotos.style.display = "block";
    modalePhotos.removeAttribute("aria-hidden");
    modalePhotos.setAttribute("aria-modal", "true");
    modalePhotos.classList.add("modale-active");
    backdrop.style.display = "block";
  } else {
    console.log("modale pas trouvée");
  }
});

const revenirModale = function () {
  const modale1 = document.getElementById("modale1");
  const modale2 = document.getElementById("modale2");

  if (modale1 && modale2) {
    modale2.style.display = "none";
    modale2.setAttribute("aria-hidden", "true");
    modale2.removeAttribute("aria-modal");
    modale2.classList.remove("modale-active");

    modale1.style.display = "block";
    modale1.removeAttribute("aria-hidden");
    modale1.setAttribute("aria-modal", "true");
    modale1.classList.add("modale-active");
  } else {
    console.log("Pas de modale");
  }
};
document.querySelector(".revenir").addEventListener("click", revenirModale);

const btnAjout = document.querySelector(".boutonAjouterPhotos");
const inputFile = document.getElementById("photo");

// btnAjout.addEventListener("click", function () {
//   inputFile.click();
// });

const boutonSelect = document.getElementById("categorie");

async function selectCategories() {
  try {
    // const reponse = await fetch("http://localhost:5678/api/categories");

    // if (!reponse.ok) {
    //   throw new Error(`${reponse.status} : ${reponse.statusText}`);
    // }

    // const categories = await reponse.json();

    categories.forEach((category) => {
      let option = document.createElement("option");
      option.value = category.id;
      option.label = category.id ? category.name : "";
      boutonSelect.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}
selectCategories();

const formAddPhotos = document.querySelector(".form-modale2");
const inputTitre = document.getElementById("title");
const inputCategorie = document.getElementById("categorie");
const boutonValider = document.getElementById("valider");

let titleOk = false;
let categorieOk = false;
let imgOk = false;
const errorImg = document.querySelector(".errorImg");
const errorTitle = document.querySelector(".errorTitle");
const errorCategorie = document.querySelector(".errorCategorie");
// function togglePreview() {
//   document.querySelector(".preview").classList.toggle("hidden");
//   document.querySelector(".ajoutPhotos").classList.toggle("hidden");
//   console.log("test");
// }

function ajoutListeners() {
  inputFile.addEventListener("change", function (event) {
    const maxFileSize = 4 * 1024 * 1024;
    if (this.files && this.files[0]) {
      const myFile = this.files[0];
      console.log(typeof myFile.type);
      if (myFile.size > maxFileSize) {
        errorImg.classList.remove("hidden");
        errorImg.textContent = "Votre fichier est trop volumineux";
        return;
      }
      if (myFile.type != "image/jpeg" && myFile.type != "image/png") {
        errorImg.classList.remove("hidden");
        errorImg.textContent = "type de fichier invalide";
        return;
      } else {
        errorImg.classList.add("hidden");
        imgOk = true;
        afficherImg(event); 
      }
    }
  });
  inputTitre.addEventListener("change", function () {
    if (this.value.length > 50) {
      errorTitle.classList.remove("hidden");
      errorTitle.textContent = "Le titre est trop long";
      titleOk = false;
      activationBouton();
      return;
    }
    if (this.value.length < 3) {
      errorTitle.classList.remove("hidden");
      errorTitle.textContent = "Le titre est trop court";
      titleOk = false;
      activationBouton();
      return;
    }
    titleOk = true;
    errorTitle.classList.add("hidden");
    activationBouton();
  });
  inputCategorie.addEventListener("change", function () {
    if (this.selectedIndex === 0) {
      categorieOk = false;
      errorCategorie.classList.remove("hidden");
      errorCategorie.textContent = "Votre categorie n'est pas valide";
      activationBouton();
      return;
    } else {
      categorieOk = true;
      errorCategorie.classList.add("hidden");
      activationBouton();
      return;
    }
  });
}

ajoutListeners();

function activationBouton() {
  if (categorieOk === true && titleOk === true && imgOk === true) {
    boutonValider.disabled = false;
  } else {
    boutonValider.disabled = true;
  }
  console.log("categorieOk:", categorieOk, "titleOk:", titleOk, "imgOk:", imgOk
  );
}

formAddPhotos.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", inputTitre.value);
  formData.append("category", inputCategorie.value);
  formData.append("image", inputFile.files[0]);

  try {
    const token = JSON.parse(sessionStorage.getItem("token"));

    if (!token) {
      console.log("token manquant");
    }

    const reponse = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!reponse.ok) {
      throw new Error(`${reponse.status} : ${reponse.statusText}`);
    }

    const newCreation = await reponse.json();
    console.log("nouvelle creation ajoutée :", newCreation);

    creations.push(newCreation);
    genererCreation(creations);
    formAddPhotos.reset();
    closeModale();
  } catch (error) {
    console.log(error);
  }
});

const divAjoutPhoto = document.querySelector(".ajoutPhotos");
const enlever = document.querySelector(".enlever");

function afficherImg(event) {
  const fichier = event.target.files[0];
  if (fichier) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(fichier);
    img.style.width = "130px";
    img.style.height = "170px";

    img.onload = function () {
      URL.revokeObjectURL(img.src);
    };

    enlever.classList.add("hidden");
    divAjoutPhoto.appendChild(img);
  }
}

function resetAjoutPhoto() {
  const imagePrecedente = divAjoutPhoto.querySelector("img");
  if (imagePrecedente) {
    imagePrecedente.remove();
  }
  inputFile.value = ""; 
  enlever.classList.remove("hidden");
}


