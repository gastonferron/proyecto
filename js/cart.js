let currentCartInfo = "";
let modalPago = document.getElementById("modal")
let divRadio = document.getElementById("divRadio");
let radioEnvio = document.getElementsByName('radioEnvio');

let radioModal = document.getElementsByName('radioModal');

let tarjetaCredito = document.getElementById("tarjetaCredito");
let tarjeta = document.getElementById("tarjeta");
let codigo = document.getElementById("codigo");
let vencimiento = document.getElementById("vencimiento");
let transferenciaBancaria = document.getElementById("transferenciaBancaria");
let cuentaBancaria = document.getElementById("cuentaBancaria");
let btnCerrar = document.getElementById("btnCerrar");

function showCart(){     
    let htmlContentToAppend="";
    
        for (let i = 0; i < currentCartInfo.articles.length; i++) {
        
            htmlContentToAppend += `

                <table class="w-100">
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                    </tr>
                    <tr>
                        <td><img class="img-thumbnail img-article" src="${currentCartInfo.articles[i].image}"></img></td>
                        <td><label>${currentCartInfo.articles[i].name}</label></td>
                        <td><label>${currentCartInfo.articles[i].currency}${currentCartInfo.articles[i].unitCost}</label></td>
                        <td>
                        <div class="d-flex justify-content-center">
                            <div class="d-flex ">
                                <button class="btn" onclick="disminuirArticulos(${i})"><i class="fa fa-minus"></i></button>
                                <input class="form-control" value="${currentCartInfo.articles[i].count}" disabled>
                                <button class="btn" onclick="aumentarArticulos(${i})"><i class="fa fa-plus"></i></button>
                            </div>
                        </div>      
                        </td>
                        <div class="min-vw-50">
                            <td><label>${currentCartInfo.articles[i].currency} ${cart_Subtotal()}</label></td>
                        </div>
                    </tr>
                </table>
        `
        }  

        document.getElementById("lista_currentCartInfo").innerHTML = htmlContentToAppend;
}

function showCostos(){
    let htmlCostos="";
    
    for (let i = 0; i < currentCartInfo.articles.length; i++) {
    
        htmlCostos += 
                    `
                        <div class="border rounded p-2">
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <p class="fs-4 mb-1">Subtotal</p>
                                        <small class="text-muted">${currentCartInfo.articles[i].currency} ${cart_Subtotal()}</small>
                                    </div>
                                    <p class="mb-1">Costo unitario del producto por cantidad</p>
                                </div>
                             </div>
                        </div>
                        <div class="border rounded p-2">
                            <div class="row">
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <p class="fs-4 mb-1">Costo de Envio</p>
                                        <small class="text-muted">${currentCartInfo.articles[i].currency} ${costoEnvios()}</small>
                                    </div>
                                    <p class="mb-1">Segun tipo de envio</p>
                                </div>
                             </div>
                        </div>
                        <div class="border rounded p-2">
                            <div class="row">
                                <div class="col d-flex w-100 justify-content-between">
                                    <p class="fs-4 mb-1">Total ($)</p>
                                    <small class="text-muted">${currentCartInfo.articles[i].currency} ${cart_Total()}</small>
                                </div>
                             </div>
                        </div>   
                    `
        }
        document.getElementById("lista_Costos").innerHTML = htmlCostos;
}

//Funcion que disminuye la cantidad de articulos en el carrito
function disminuirArticulos(i){
    currentCartInfo.articles[i].count = Math.max(currentCartInfo.articles[i].count - 1 , 1);
    showCart();
    showCostos();
}
//Funcion que aumenta la cantidad de articulos del carrito
function aumentarArticulos(i){
    currentCartInfo.articles[i].count = currentCartInfo.articles[i].count + 1;
    showCart();
    showCostos();
}
//Funcion que da el subtotal en la tabla del carrito y en el apartado del subtotal en costos
function cart_Subtotal(){
    return currentCartInfo.articles[0].unitCost * currentCartInfo.articles[0].count;
}
//Calcula cualquier porcentaje
function sacarPorcentaje(cantidad, porcentaje){
    return cantidad * porcentaje;
}
//Segun el radio button seleccionado saca el valor del envio
function costoEnvios(){
    if(radioEnvio[0].checked){
        return sacarPorcentaje(cart_Subtotal(), 0.15);     
    }
    else if(radioEnvio[1].checked){
        return sacarPorcentaje(cart_Subtotal(), 0.07);    
    }
    else{
        return sacarPorcentaje(cart_Subtotal(), 0.05);    
    }
}   
//Suma el subtotal con el costo del envio
function cart_Total(){
    return cart_Subtotal() + costoEnvios();
}

//Segun el radio button seleccionado te activa los campos a rellenar
function habilitar (){
    if(tarjetaCredito.checked){
        tarjeta.removeAttribute("disabled");
        codigo.removeAttribute("disabled");
        vencimiento.removeAttribute("disabled");
        cuentaBancaria.setAttribute("disabled" , "")
    }
    else if (transferenciaBancaria.checked){
        cuentaBancaria.removeAttribute("disabled");
        tarjeta.setAttribute("disabled" , "")
        codigo.setAttribute("disabled" , "")
        vencimiento.setAttribute("disabled" , "")
    }
}
//Actualiza los buttons al clickearlos
divRadio.addEventListener("click", () => {
    costoEnvios();
    showCostos();   
} );
//Ejecuta la funcion habilitar
modalPago.addEventListener("click", () =>{
    habilitar();
});
//Activa el boton cerrar modal al ingresar datos en los campos
modalPago.addEventListener("input", () => {
    btnCerrar.removeAttribute("disabled");
});

//Al realizar la compra emite una alerta
function alerta(){
    document.getElementById("alerta").classList.add("show");
}
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            event.stopPropagation()
            if (form.checkValidity()) {
                alerta();
                document.querySelector('#alerta button').addEventListener("click" , () => form.submit() );
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()
getJSONData(CART_INFO_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        currentCartInfo = resultObj.data 
        showCart();
        showCostos()
    }
}); 