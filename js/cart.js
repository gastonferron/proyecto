let currentCartInfo = "";
let valor="";
function showCart(){       
    let htmlContentToAppend = `

    <div class="cart-row">
        <div class="cart-item cart-column">
            <img src="${currentCartInfo.articles[0].image}"class="img-thumbnail" width="300" height="100></img>
            <span class="cart-item-title">  ${currentCartInfo.articles[0].name}</span>
        </div>
        <span class="cart-price cart-column">${currentCartInfo.articles[0].currency}${currentCartInfo.articles[0].unitCost}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" value="${currentCartInfo.articles[0].count}">
            ${cart_Subtotal()}
         </div>
    </div>
        <div class="cart-total">
            <strong class="cart-total-title">Precio Final ${currentCartInfo.articles[0].currency} ${cart_Subtotal()}</strong>
            <span class="cart-total-price"></span>
        </div>
        
        `

        document.getElementById("lista_currentCartInfo").innerHTML = htmlContentToAppend;
}

    function cart_Subtotal(){
        return valor= currentCartInfo.articles[0].unitCost * currentCartInfo.articles[0].count;
    }
    function cart_Total(){
        let total="";
        total=cart_Subtotal;
    }

    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCartInfo = resultObj.data 
            console.log(currentCartInfo);     
            showCart();
        }
    }); 