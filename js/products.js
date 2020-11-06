let minCount = undefined;
let maxCount = undefined;
let currentProductArray = [];
let ORDER_ASC_BY_COST = "AZ";
let ORDER_BY_POP = "";
let ORDER_DESC_BY_COST = "ZA"

function sortAndShowProducts(sort){
    currentProductArray = sortProducts(sort,currentProductArray);
    showProductsList();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_POP){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let product = currentProductArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
            htmlContentToAppend += `
                 <a href="product-info.html" class="list-group-item list-group-item-action col-md-3 mx-1 my-2">
                 <div class="row px-1">
                     <div>
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                     </div>
              </div>
            <div class="row my-1 px-2">
                <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                </div>
                    <p class="mb-1">` + product.description + `</p>
            </div>
            <div class="row mt-2 justify-content-end px-3">
                <h5>` + product.cost + ` ` + product.currency + `.</h5>
            </div>
        </a>
        `
        }
    }

        document.getElementById("products").innerHTML = htmlContentToAppend;
    }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductArray = resultObj.data;
            showProductsList();
        }
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortPop").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_POP);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
});