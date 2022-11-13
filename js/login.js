let formulario = document.getElementById("form");
let email = document.getElementById("input_correo");
let password = document.getElementById("input_pass");
let boton = document.getElementById("boton");

//EventListener

boton.addEventListener("click", () => {
    if (password.value.length >= 1  && email.value.length >= 1){
        
        ingresarUsuario();
        window.location.href = "home.html";
       
    }
    else{
        showAlertError();
    } 
  })

//Funciones

//Guarda el usuario
function ingresarUsuario(){
    localStorage.setItem("email", email.value);
  }

//Alertas

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
