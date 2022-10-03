const usuario = localStorage.getItem("usuario");
const numCatId = localStorage.getItem("catID");
const numProductId= localStorage.getItem("productID");

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/"+numCatId+".json";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"+numProductId+".json";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/"+numProductId+".json";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
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
  `<li class="nav-item">
    <a class="nav-link" href="" id="contenedor"></a>
  </li>` ;

  document.getElementById("contenedor").innerHTML = usuario ;

})
  

