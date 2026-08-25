let formLogin = document.querySelector("form");

formLogin.addEventListener("submit", async function(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    const response = await fetch("http://localhost:5678/api/users/login", {
        method:"POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({email, password})
    });
    if (!response.ok) {
        let errorMessage = document.querySelector(".error-message");
        errorMessage.textContent = "Email ou mot de passe incorrect";
        return;
    }
    const loginData = await response.json();
    localStorage.setItem("token", loginData.token);
    window.location.href = 'index.html';
});