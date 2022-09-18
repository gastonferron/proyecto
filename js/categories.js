const ordenAZ = "AZ";
const ordenZA = "ZA";
const ordenCantProductos = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minimoCant = undefined;
let maximoCant = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ordenAZ)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenZA){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ordenCantProductos){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minimoCant == undefined) || (minimoCant != undefined && parseInt(category.productCount) >= minimoCant)) &&
            ((maximoCant == undefined) || (maximoCant != undefined && parseInt(category.productCount) <= maximoCant))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data
            showCategoriesList()
            //sortAndShowCategories(ordenAZ, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ordenAZ);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ordenZA);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ordenCantProductos);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minimoCant = undefined;
        maximoCant = undefined;

        showCategoriesList();
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

        showCategoriesList();
    });
});