const usuario = localStorage.getItem("usuario");
const numCatId = localStorage.getItem("catID");
const numProductId= localStorage.getItem("productID");

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+numCatId+".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+numProductId+".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"+numProductId+".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Agregar nombre de usuario a la barra de navegar
document.addEventListener("DOMContentLoaded",()=> {
  
  document.querySelector("ul").innerHTML += 
  `
  <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${usuario}
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
            <li><a class="dropdown-item" onclick="cerrarSesion()">Cerrar Sesion</a></li>
          </ul>
        </li>
  ` ;

})

function cerrarSesion(){
  window.location.href="index.html";
  localStorage.clear;
}
  

