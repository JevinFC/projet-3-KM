let reponse;
let creation;

try{
reponse = await fetch("http://localhost:5678/api/works")
if(!reponse.ok){
    throw new Error(`${reponse.status} : ${reponse.statusText}`)
}
creation = await reponse.json()
}catch(error){
    console.log(error)
}

const boutonTous = document.querySelector(".tous")
const boutonObjets = document.querySelector(".bouton-1")
const boutonAppartements = document.querySelector(".bouton-2")
const boutonHotelsRestaurants = document.querySelector(".bouton-3")
const sectionGallery = document.querySelector(".gallery")

async function genererCreation(creation) {
    sectionGallery.innerHTML = ""
    for (let i = 0; i < creation.length; i++) {
        const article = creation[i];
        console.log(article)

        //Création des éléments 
        const figureGallery = document.createElement("figure")

        const nomElement = document.createElement("figcaption")
        nomElement.innerText = article.title
        const imageGallery = document.createElement("img")
        imageGallery.src = article.imageUrl
        
        figureGallery.appendChild(imageGallery)
        figureGallery.appendChild(nomElement)
        sectionGallery.appendChild(figureGallery)
    }
}



async function genererBoutons(){
    try{
        const reponseCategories = await fetch("http://localhost:5678/api/categories");
        if(!reponseCategories.ok){
            throw new Error(`${reponse.status} : ${reponse.statusText}`);
        }
        let categories = await reponseCategories.json();
        let filtres = document.querySelector(".filtres");
        filtres.innerHTML=" ";

        categories.forEach(category => {
            const bouton = document.createElement('button');
            bouton.innerText = category.name;
            bouton.dataset.id = category.id;
            bouton.classList.add(`bouton-${category.id}`);

            bouton.addEventListener('click', function () {
                const imagesFiltrees = creation.filter(work => work.categoryId === category.id);
                genererCreation(imagesFiltrees);
            });

            filtres.appendChild(bouton);
        });
        
        const boutonTous = document.createElement('button');
        boutonTous.innerText = 'Tous';
        boutonTous.classList.add('tous');
        filtres.prepend(boutonTous)

        boutonTous.addEventListener("click", async function(){
        genererCreation(creation)
        })
    }catch(error) {
        console.log(error)
    }}


genererBoutons();

genererCreation(creation);

