

let reponse;
let creations;

try{
reponse = await fetch("http://localhost:5678/api/works")
if(!reponse.ok){
    throw new Error(`${reponse.status} : ${reponse.statusText}`)
}
creations = await reponse.json()
}catch(error){
    console.log(error)
}

const boutonTous = document.querySelector(".tous")
const boutonObjets = document.querySelector(".bouton-1")
const boutonAppartements = document.querySelector(".bouton-2")
const boutonHotelsRestaurants = document.querySelector(".bouton-3")
const sectionGallery = document.querySelector(".gallery")
let filtres = document.querySelector(".filtres");

export async function genererCreation(creations) {
    console.log(creations)
    sectionGallery.innerHTML = ""
    creations.forEach(article =>{
        
        //Création des éléments 
        const figureGallery = document.createElement("figure")

        const nomElement = document.createElement("figcaption")
        nomElement.innerText = article.title
        const imageGallery = document.createElement("img")
        imageGallery.src = article.imageUrl
        
        figureGallery.appendChild(imageGallery)
        figureGallery.appendChild(nomElement)
        sectionGallery.appendChild(figureGallery)
    });
}
export {creations}

// function createCategoryButton(category) {
//     let button = document.createElement("button");
//     button.textContent = category.name;
//     button.classList.add("filterBoutons");

//     category.id === 0 ? button.classList.add("active") : null;
//     button.addEventListener("click", (event) => {
//     let filtered = categories.id === 0 ? creations : creations.filter(work => work.categoryId === category.id);
//     genererCreation(filtered);
//     document.querySelector(".filter.active").classList.remove("active");
//     event.target.classList.add("active");
//     });
//     return button;
// }

// async function createButtonBox(categories){
//     let filterbox = document.createElement("div");
//     filterbox.classList.add("filtres");
//     categories.unshift({id:0, name:"Tous"})
//     for(let category of categories){
//         const button = createCategoryButton(category);
//         console.log(button)
//         filterbox.appendChild(button);
//     }
//     document.querySelector(".gallery").insertAdjacentElement("beforebegin", filterbox);
// }

const reponseCategories = await fetch("http://localhost:5678/api/categories");
if(!reponseCategories.ok){
    throw new Error(`${reponseCategories.status} : ${reponseCategories.statusText}`);
}
let categories = await reponseCategories.json();

// createButtonBox(categories);


async function genererBoutons(){
    try{
        const reponseCategories = await fetch("http://localhost:5678/api/categories");
        if(!reponseCategories.ok){
            throw new Error(`${reponseCategories.status} : ${reponseCategories.statusText}`);
        }
        let categories = await reponseCategories.json();
        filtres.innerHTML=" ";

        categories.forEach(category => {
            const bouton = document.createElement('button');
            bouton.innerText = category.name;
            bouton.dataset.id = category.id;
            bouton.classList.add(`bouton-${category.id}`);

            bouton.addEventListener('click', function () {
                const creationFiltrees = creations.filter(work => work.categoryId === category.id);
                genererCreation(creationFiltrees);
            });

            filtres.appendChild(bouton);
        });
        
        const boutonTous = document.createElement('button');
        boutonTous.innerText = 'Tous';
        boutonTous.classList.add('tous');
        filtres.prepend(boutonTous);

        boutonTous.addEventListener("click", async function(){
        genererCreation(creations);
        })
    }catch(error) {
        console.log(error);
    }}


genererBoutons();

genererCreation(creations);


    const token = sessionStorage.getItem("token");
    const lienLogin = document.querySelector(".lien-login");

    if (token) {
        
        const templateLogin = document.getElementById("logged-in-template").content;
        const cloneLogout = document.importNode(templateLogin, true);
        const lienLogout = cloneLogout.querySelector("#logout-link");

       
        lienLogout.onclick = function(event) {
            event.preventDefault(); 
            sessionStorage.removeItem("token");
            location.reload();
        };

        lienLogin.parentElement.replaceChild(cloneLogout,lienLogin);

        filtres.style.display= 'none';


        
        const templateModifier = document.querySelector("#template-modifier");
        templateModifier.classList.remove("hidden");
        templateModifier.setAttribute("style", "display:inline;");
        // const cloneModifier = document.importNode(templateModifier.content, true)
        const mesProjets = document.querySelector("#portfolio h2");
        
        mesProjets.appendChild(templateModifier);
    }else{
        console.log("pas de token");
    }





    // FONCTIONS MODALE
    // const lienModale = cloneModifier.querySelector(".lienModale")

  


