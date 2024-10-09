const reponse = await fetch("http://localhost:5678/api/works");
const creation = await reponse.json(); 

const boutonTous = document.querySelector(".tous")
const boutonObjets = document.querySelector(".objets")
const boutonAppartements = document.querySelector(".appartements")
const boutonHotelsRestaurants = document.querySelector(".hotels-restaurants")
const sectionGallery = document.querySelector(".gallery")


async function genererCreation(creation) {
    sectionGallery.innerHTML = "";
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
boutonTous.addEventListener("click", async function(){
    genererCreation(creation)
})


boutonHotelsRestaurants.addEventListener("click", function(){
    sectionGallery.innerHTML="";
})