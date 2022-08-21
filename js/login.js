const email = document.getElementById("input_correo");
const password = document.getElementById("input_pass");
const boton = document.getElementById("boton");
const btnClose = document.querySelector(".btn-close");
btnClose.addEventListener("click", () => {
    document.getElementById("alert-danger").classList.remove("show");
})

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

boton.addEventListener("click", () => {
    if (password.value.length >= 1  && email.value.length >= 1){
        window.location.href = "home.html";
    }
    else{
        showAlertError();
    } 
  });
