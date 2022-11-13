let btn_guardarCambios = document.getElementById("btn_guardarCambios");
let nombre = document.getElementById("nombre");
let segundoNombre = document.getElementById("segundoNombre");
let apellido = document.getElementById("apellido");
let segundoApellido = document.getElementById("segundoApellido");
let emailForm = document.getElementById("emailForm");
let telefono = document.getElementById("telefono");
var datosUsuario = {nombre : "", segundoNombre : "" , apellido : "" , segundoApellido : "", telefono : ""};

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            event.stopPropagation()
            if (form.checkValidity()) {
                datosUsuario.nombre=nombre.value;
                datosUsuario.segundoNombre = segundoNombre.value;
                datosUsuario.apellido = apellido.value;
                datosUsuario.segundoApellido = segundoApellido.value;
                datosUsuario.telefono = telefono.value;
                localStorage.setItem("datosUsuario" , JSON.stringify(datosUsuario));
                localStorage.setItem("email" , emailForm.value);
                form.submit();
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()




  document.addEventListener("DOMContentLoaded",()=> {
    if (JSON.parse(localStorage.getItem("datosUsuario")) != null) {
        datosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));
        nombre.value = datosUsuario.nombre;
        segundoNombre.value = datosUsuario.segundoNombre;
        apellido.value = datosUsuario.apellido;
        segundoApellido.value = datosUsuario.segundoApellido;
        telefono.value = datosUsuario.telefono;
        emailForm.value = localStorage.getItem("email");
    } else {
        emailForm.value = localStorage.getItem("email");
        
    }
  })