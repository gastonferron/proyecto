let input_Comentario = document.getElementById("input_Comentario");
let boton_Estrella = document.getElementById("boton_Estrella");
let boton_Comentar = document.getElementById("boton_Comentar");
let comentarios = document.getElementById("input_Comentario") ;
let currentProductInfo = "";
let currentProductComentarios=[];
let ahora = [];
let fecha = new Date();
let producto = localStorage.getItem("productID")

//Asigna nuevo id al producto
function setProductId(id) {
    localStorage.setItem("productID", id);
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        document.body.scrollTop = 0; // For Safari   
        window.location.reload();
         
}
//Trae la informacion de los Productos Relacionados, osea los productos que comparten categoria
function verRelacionados(){
    let rel="";
        for (let i = 0; i < currentProductInfo.relatedProducts.length; i++) {
            rel += `
                        <div class="col-6" onclick="setProductId(${currentProductInfo.relatedProducts[i].id})">
                            <p class="fs-5 text-center">${currentProductInfo.relatedProducts[i].name}</p> 
                            <div> 
                                <img src="${currentProductInfo.relatedProducts[i].image}"class="img-thumbnail"></img>  
                            </div>
                        </div>
                    `
         }
    document.getElementById("lista_relacionados").innerHTML = rel;
}
//Recorre el array de imagenes e imprime segun la posicion en el Carusel
//Si I=0 se coloca la imagen principal si I>0 añade un item lo cual sera la siguiente imagen
function verImagenesCarusel(){
    let imgC = "";
        for (let i = 0; i < currentProductInfo.images.length; i++) {
            if(i==0){
                imgC += 
                    `
                        <div class="carousel-item active">
                            <img src="${currentProductInfo.images[i]}" class="d-block w-100" alt="${currentProductInfo.description}">
                        </div>
                    `
            }
            else{
                imgC += 
                    ` 
                        <div class="carousel-item">
                            <img src="${currentProductInfo.images[i]}" class="d-block w-100" alt="${currentProductInfo.description}"></img>  
                        </div>
                    `   
            }
        }
    return imgC;
}
//Funcion que permite ver los productos de la pagina
function showPorduct(){       
        let htmlContentToAppend = 
            `
                <div class="row m-0">
                    <div id="carouselProductos" class="carousel carousel-dark slide col-6" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselProductos"
                                data-bs-slide-to="0"
                                class="active"
                                aria-current="true" 
                                aria-label="Slide 1">
                            </button>
                            <button 
                                type="button" 
                                data-bs-target="#carouselProductos" 
                                data-bs-slide-to="1" 
                                aria-label="Slide 2">
                            </button>
                            <button 
                                type="button" 
                                data-bs-target="#carouselProductos" 
                                data-bs-slide-to="2" 
                                aria-label="Slide 3">
                            </button>
                            <button 
                                type="button" 
                                data-bs-target="#carouselProductos" 
                                data-bs-slide-to="3" 
                                aria-label="Slide 4">
                            </button>
                        </div>
                        <div class="carousel-inner">
                            ${verImagenesCarusel()}
                        </div>
                        <button 
                            class="carousel-control-prev" 
                            type="button" 
                            data-bs-target="#carouselProductos" 
                            data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                        </button>
                        <button 
                            class="carousel-control-next"
                            type="button" 
                            data-bs-target="#carouselProductos" 
                            data-bs-slide="next">
                                <span class="carousel-control-next-icon"aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="col-6 border rounded">
                            <p
                            class="fs-6
                            text-muted
                            text-end
                            p-3
                            mb-0
                            ">
                            Unidades vendidas ${currentProductInfo.soldCount}</p>
                        <div class="p-5 pt-0">
                            <p
                                class="mb-3 
                                bg-rounded 
                                bg-shadows
                                fs-3">
                                <strong>${currentProductInfo.name}</strong>
                            </p>
                            <p class="precio mb-3 fs-1">${currentProductInfo.currency} ${currentProductInfo.cost}</p>
                        
                            <div>
                                <p class="fs-4">${currentProductInfo.description}</p>
                            </div>
                            <div>
                                <button 
                                    type="button"
                                    class="btn btn-dark 
                                    ">
                                        Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>      
                </div>
            `
        document.getElementById("lista_currentProductInfo").innerHTML = htmlContentToAppend;
}
//Ver comentarios
function showComents(){
    let comentarios="";
        for(let i = 0; i < currentProductComentarios.length; i++){
            comentarios += `
                    <div class="border rounded md-1">
                        <div class="row m-0">
                            <div class="d-flex justify-content-between">
                                <p class="fs-3 mb-1">${currentProductComentarios[i].user}</p>
                                <p class="p-2 pb-0 m-0 mb-0">${calidad(currentProductComentarios[i].score)}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p class="fs-5 mb-1 ms-2">${currentProductComentarios[i].description}</p>
                                <p class="fs-6 mb-0">${currentProductComentarios[i].dateTime}</p>
                            </div>
                        </div>
                        
                    </div>
                          `
        }
    document.getElementById("lista_comentarios").innerHTML = comentarios;
}
//Asigna estrellas al html segun como hayan calificado los usuarios
function calidad(estrella){
    let variable="";
        for(let i = 0; i < 5; i++){
            if(i < estrella){
                variable +=
                    `
                        <span class="fa fa-star checked"></span>
                    `
            }
            else{
                variable +=
                    `
                        <span class="fa fa-star"></span>
                    `
            }
        }
    return variable;
}

//Funcion que sirve para calificar con estrellas un producto
let comentEstrellas = document.querySelector('#estrellas');
function calificacion (id){
    let puntuacion = comentEstrellas.querySelectorAll('i');
    for (let i = 0; i < puntuacion.length; i++) {
        if(i<id){
            puntuacion[i].classList.add("checked");
        }
        else{
            puntuacion[i].classList.remove("checked");
        }
        
    }
}

function fechaComentario(){
    var año = fecha.getFullYear();
    var mes = fecha.getMonth();
    var dia = fecha.getDate();
    var hora = fecha.getHours();
    var minuto = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    return ahora = [año,"-",mes,"-",dia,"",hora,":",minuto,":",segundos];
}

function crearComentario(product, score,description,user,dateTime){
    this.product = producto;
    this.score = calificacion();
    this.description = comentarios;
    this.user = "yo",
    this.dateTime = ahora;
}

//Agregar un comentario desde la pagina
boton_Comentar.addEventListener("click", function () {

    

     const contendioComentario =
        {
            "product":	producto,
            "score":	calificacion(),
            "description":	comentarios,
            "user":	"yo",
            "dateTime":	ahora,
        }
        JSON.stringify(contendioComentario);
})

//Traer informacion del producto
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfo = resultObj.data       
            showPorduct();
            verRelacionados();
        }
    }); 
//Traer informacion de los comentarios    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductComentarios = resultObj.data
            showComents();
            console.log(currentProductComentarios);
            fechaComentario();
            console.log(contendioComentario);
        }
    });   
 })   