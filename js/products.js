const masBarato = "Ascendente";
const masCaro = "Decendente";
const ordenCantProductos = "Cant.";
let currentSortCriteria = undefined;
let minimoCant = undefined;
let maximoCant = undefined;
let currentProductsArray = [];

//Ordena el array

function sortProducts(criteria, array){
    let result = [];
    if (criteria === masBarato)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === masCaro){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenCantProductos){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let productos = currentProductsArray[i];

        if (((minimoCant == undefined) || (minimoCant != undefined && parseInt(productos.cost) >= minimoCant)) &&
        ((maximoCant == undefined) || (maximoCant != undefined && parseInt(productos.cost) <= maximoCant))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${productos.image}" alt="${productos.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${productos.name} - ${productos.currency} ${productos.cost}</h4>
                            <small class="text-muted">${productos.soldCount} ventas</small>
                        </div>
                        <p class="mb-1">${productos.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("lista_productos").innerHTML = htmlContentToAppend;
    }
}

//Muestro los productos ordenados
function sortAndShowProducts(sortCriteria){
    currentSortCriteria = sortCriteria;
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}

//Obtiene datos de Json
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products       
            showProductsList();
        }
    });

    document.getElementById("sortAscendente").addEventListener("click", function(){
        sortAndShowProducts(masBarato);
    });

    document.getElementById("sortDescendente").addEventListener("click", function(){
        sortAndShowProducts(masCaro);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ordenCantProductos);
    });

    //Fitro segun el costo
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minimoCant = undefined;
        maximoCant = undefined;

       showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minimoCant = document.getElementById("rangeFilterCountMin").value;
        maximoCant = document.getElementById("rangeFilterCountMax").value;

        if ((minimoCant != undefined) && (minimoCant != "") && (parseInt(minimoCant)) >= 0){
            minimoCant = parseInt(minimoCant);
        }
        else{
            minimoCant = undefined;
        }

        if ((maximoCant != undefined) && (maximoCant != "") && (parseInt(maximoCant)) >= 0){
            maximoCant = parseInt(maximoCant);
        }
        else{
            maximoCant = undefined;
        }

       showProductsList();
    });
    
});

