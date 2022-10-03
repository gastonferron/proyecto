let input_Comentario = document.getElementById("input_Comentario");
let boton_Estrella = document.getElementById("boton_Estrella");
let boton_Comentar = document.getElementById("boton_Comentar");
let currentProductInfo = "";
let currentProductComentarios=[];

function guardarComentario(){
    comentarios += `
                    <div class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${localStorage.getItem("usuario")} - ${currentProductComentarios[i].dateTime}</h4>
                                    <small class="text-muted">${calidad(boton_Estrella)}</small>
                                </div>
                                <p class="mb-1">${input_Comentario}</p>
                            </div>
                        </div>
                    </div>
                          `
        
        document.getElementById("lista_comentarios").innerHTML = comentarios;
}

function verImagenes(){
    let imagen="";
        for(let i = 0; i < currentProductInfo.images.length; i++){
            imagen += ` <div class="col-6">
                            <img src="${currentProductInfo.images[i]}" alt="${currentProductInfo.description}" class="img-thumbnail"></img>  
                         </div>
                     `;
            
         }
         return imagen;
}

function showProductsList(){       
        let htmlContentToAppend = `
        <h1 class="mb-1">${currentProductInfo.name}</h1>
            <div>
                <div class="row">
                <div class="col-8">
                    <div class="row p-3">
                        ${verImagenes()}
                    </div>
                </div>
                    <div class="col-4">
                        <div>
                            <p class="precio">Precio</p>
                            <p class="precio">${currentProductInfo.currency}${currentProductInfo.cost}</p>
                        </div>
                        <div>
                            <p class="titulo_descripcion">Descripcion</p>
                            <p class="titulo_descripcion">${currentProductInfo.description}</p>
                        </div>
                        <div>
                            <p>Cantidad de productos venidos ${currentProductInfo.soldCount} en total</p>
                        </div>
                    </div>
                </div>
            </div>
            `
        document.getElementById("lista_currentProductInfo").innerHTML = htmlContentToAppend;
}

function showComents(){
    let comentarios="";
        for(let i = 0; i < currentProductComentarios.length; i++){

            comentarios += `
                    <div class="list-group-item list-group-item-action cursor-active">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${currentProductComentarios[i].user} - ${currentProductComentarios[i].dateTime}</h4>
                                    <small class="text-muted">${calidad(currentProductComentarios[i].score)}</small>
                                </div>
                                <p class="mb-1">${currentProductComentarios[i].description}</p>
                            </div>
                        </div>
                    </div>
                          `
        }
        document.getElementById("lista_comentarios").innerHTML = comentarios;
}
function calidad(estrella){
    let variable="";
    for(let i = 0; i < 5; i++){
        if(i < estrella){
            variable+=`
            <span class="fa fa-star checked"></span>
            `
        }
        else{
            variable+=`
            <span class="fa fa-star"></span>
            `
        }
     }
     return variable;
       
    
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfo = resultObj.data       
            console.log(currentProductInfo);
            showProductsList();
            guardarComentario()
        }


        
    }); 
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductComentarios = resultObj.data       
            console.log(currentProductComentarios);
            showComents();
        }
    });   
 })   