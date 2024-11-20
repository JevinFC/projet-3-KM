let reponse;
let creations;

try {
  reponse = await fetch("http://localhost:5678/api/works");
  if (!reponse.ok) {
    throw new Error(`${reponse.status} : ${reponse.statusText}`);
  }
  creations = await reponse.json();
} catch (error) {
  console.log(error);
}


const sectionGallery = document.querySelector(".gallery");
let filtres = document.querySelector(".filtres");

export async function genererCreation(creations) {
  sectionGallery.innerHTML = "";
  creations.forEach((article) => {

    const figureGallery = document.createElement("figure");

    const nomElement = document.createElement("figcaption");
    nomElement.innerText = article.title;
    const imageGallery = document.createElement("img");
    imageGallery.src = article.imageUrl;

    figureGallery.appendChild(imageGallery);
    figureGallery.appendChild(nomElement);
    sectionGallery.appendChild(figureGallery);
  });
}
export { creations };

function createCategoryButton(category) {
  let button = document.createElement("button");
  button.textContent = category.name;
  button.classList.add("filterBoutons");

  category.id === 0 ? button.classList.add("active") : null;
  button.addEventListener("click", (event) => {
    let filtered = category.id === 0 ? creations : creations.filter((work) => work.categoryId === category.id);
    genererCreation(filtered);

    document.querySelector(".filterBoutons.active").classList.remove("active");
    event.target.classList.add("active");
  });
  return button;
}

async function createButtonBox(categories) {
  const filterbox = document.querySelector(".filtres");
  categories.unshift({ id: 0, name: "Tous" });
  for (let category of categories) {
    const button = createCategoryButton(category);
    if (category.id === 0) {
      button.classList.add("tous");
    }
    filterbox.appendChild(button);
  }
  document.querySelector(".gallery").insertAdjacentElement("beforebegin", filterbox);
}

const reponseCategories = await fetch("http://localhost:5678/api/categories");
if (!reponseCategories.ok) {
  throw new Error(`${reponseCategories.status} : ${reponseCategories.statusText}`);
}
export let categories = await reponseCategories.json();

createButtonBox(categories);

genererCreation(creations);
console.log(creations)

const token = sessionStorage.getItem("token");
const lienLogin = document.querySelector(".lien-login");

if (token) {
  const templateLogin = document.getElementById("logged-in-template").content;
  const cloneLogout = document.importNode(templateLogin, true);
  const lienLogout = cloneLogout.querySelector("#logout-link");

  lienLogout.onclick = function (event) {
    event.preventDefault();
    sessionStorage.removeItem("token");
    location.reload();
  };

  lienLogin.parentElement.replaceChild(cloneLogout, lienLogin);

  filtres.style.display = "none";

  const templateModifier = document.querySelector("#template-modifier");
  templateModifier.classList.remove("hidden");
  templateModifier.setAttribute("style", "display:inline;");
  const mesProjets = document.querySelector("#portfolio h2");

  mesProjets.appendChild(templateModifier);
} else {
  console.log("pas de token");
}


