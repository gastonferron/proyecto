let currentCartInfo = "";
let valor="";
let formulario = document.getElementById("form");

function showCart(){     
    let htmlContentToAppend="";
    
        for (let i = 0; i < currentCartInfo.articles.length; i++) {
        
            htmlContentToAppend += `

                <table class="w-100">
                    <tr>
                        <th>#</th>
                        <th>Productos</th>
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
    
        htmlCostos += `
    <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">Subtotal</h4>
                    <small class="text-muted">${currentCartInfo.articles[i].currency} ${cart_Subtotal()}</small>
                </div>
                <p class="mb-1">Costo unitario del producto por cantidad</p>
            </div>
        </div>
    </div>    
            `}
        document.getElementById("lista_Costos").innerHTML = htmlCostos;
}


    function disminuirArticulos(i){
        currentCartInfo.articles[i].count = Math.max(currentCartInfo.articles[i].count - 1 , 1);
        showCart();
    }

    function aumentarArticulos(i){
        currentCartInfo.articles[i].count = currentCartInfo.articles[i].count + 1;
        showCart();
    }

    function cart_Subtotal(){
        return valor= currentCartInfo.articles[0].unitCost * currentCartInfo.articles[0].count;
    }
    function cart_Total(){
        let total="";
        total=cart_Subtotal;
    }

    (function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
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