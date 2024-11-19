const boutonSubmit = document.getElementById("connexion");
const formulaire = document.getElementById("myForm");
const messageError = document.getElementById("error");

async function login() {
  try {
    const email = document.getElementById("email-login").value;
    const mdp = document.getElementById("mdp-login").value;
    const messageError = document.getElementById("error");

    const ApiLogin = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: mdp }),
    });

    if (!ApiLogin.ok) {
      throw new Error(`${ApiLogin.status} : ${ApiLogin.statusText}`);
    }
    const reponseApiLogin = await ApiLogin.json();

    if (reponseApiLogin.token) {
      window.location.href = "index.html";
      window.sessionStorage.setItem(
        "token",
        JSON.stringify(reponseApiLogin.token)
      );
    } else {
      messageError.textContent = "Mauvais mot de passe ou mail";
    }
  } catch (error) {
    console.error("Problème : ", error.message);
    const email = document.getElementById("email-login").value;
    const mdp = document.getElementById("mdp-login").value;

    if (email === "" || mdp === "") {
      messageError.textContent = "Les champs doivent être remplis";
    } else {
      messageError.textContent = "Mauvais mot de passe ou mail";
    }
  }
}
formulaire.addEventListener("submit", async function (event) {
  event.preventDefault();
  await login();
});
