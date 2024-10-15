const boutonSubmit = document.getElementById("connexion")

async function login() {
    try{
        const email = document.getElementById("email-login").value
        const mdp = document.getElementById("mdp-login").value
        const messageError = document.getElementById("error")

        const ApiLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Spécifier que les données sont en JSON
            },
            body: JSON.stringify({ email: email, password: mdp })  // Envoyer l'email et le mot de passe en JSON
        })

        if(!ApiLogin.ok){
            throw new Error(`${ApiLogin.status} : ${ApiLogin.statusText}`) 
        }
        const reponseApiLogin = await ApiLogin.json()
        console.log("res"+JSON.stringify(reponseApiLogin))
        if(reponseApiLogin.token){
            // window.location.href= "index.html"
            window.sessionStorage.setItem("token", JSON.stringify(reponseApiLogin.token))
        }else{
            messageError.textContent = "Mauvais mot de passe ou mail";
        }
    
    }catch(error){
        console.error("Problème : ", error.message)
    }

    
}
boutonSubmit.addEventListener("click", async function (event) {
    event.preventDefault()
    await login()
})
