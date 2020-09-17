var product = {};
var comentarios ={};
var prod_relacionados = {};

function showImagesGallery(array){
    let imagenes = "";
    for (let i = 0; i < array.length; i++){
        let imagen = array[i];
        imagenes +=  `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="`+imagen+`" alt="">
            </div>
        </div>`;
    }
    
    
    document.getElementById("productImagesGallery").innerHTML = imagenes;
    
   
}


//comentarios 

function showComments(array){
    let comments = "";
    for (let i = 0; i < array.length; i++){
        let comentario = array[i];
        let estrella = [];
        for(let ii = 0; ii < 5; ii++){
            if (comentario.score > ii)
            {
                estrella[ii] = "fa fa-star checked";
            }
            else {
                estrella[ii] = "fa fa-star";
            }
        }
        comments += `
        <div>
                <div class="col">
                    <h4 class="mb-1">`+ comentario.user +`</h4>
                    <span class="`+estrella[0]+`"></span>
                    <span class="`+estrella[1]+`"></span>
                    <span class="`+estrella[2]+`"></span>
                    <span class="`+estrella[3]+`"></span>
                    <span class="`+estrella[4]+`"></span>
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1">`+ comentario.description + `</p>
                        <small class="text-muted"> realizado el ` +comentario.dateTime+  `</small>
                    </div>    
             </div>
             <br>`;
    }
    
    
    document.getElementById("productComments").innerHTML = comments;

    
   
}
//comentarios


function showProductsRelated(array) {
    let relatedProd = document.getElementById("img-related");
    let products = array;

    let htmlContentToAppend = "";
    for (let i = 0; i < prod_relacionados.length; i++) {
        let id = prod_relacionados[i];
        htmlContentToAppend += `
            <div class="col-md-3 col-sm-6 mb-4">
                <a href="#" text-decoration-none>
                    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
                        <img src=` + products[id].imgSrc + ` class="card-img-top" alt=` + products[id].name + `>
                        <div class="card-body">
                            <h5 class="card-title text-black-50">` + products[id].currency + ` - ` + products[id].cost + `</h5>
                            <p class="card-text text-dark">` + products[id].name + `</p>
                        </div>
                    </div>
                </a>
            </div>
            `
        relatedProd.innerHTML = htmlContentToAppend;

    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           product = resultObj.data;
           datos(product);
           showImagesGallery(product.images)
           
        }
    });

//comentarios

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
         comentarios = resultObj.data;
         showComments(comentarios)
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            var products = resultObj.data;
            showProductsRelated(products);

        }
    });

});


function datos(product){
    document.getElementById("productDescription").innerHTML = product.description;
    document.getElementById("productCount").innerHTML = product.currency + " " + product.cost;
    document.getElementById("productName").innerHTML = product.name;
    prod_relacionados = product.relatedProducts;
    return prod_relacionados;
    
}



// COMENTAR

verificarComentario = function(){
    
    if(document.getElementById("comentario").value.length > 5)
    {
        
        comentar();
    }
    else {
        
        alert ("Comentario inexistente o muy corto");
    }
          
}

function comentar() {
    let newcom = {
        "score": undefined,
        "description": undefined,
        "user": undefined,
        "dateTime": undefined
    };
    let estrella = [];
    for(let ii = 0; ii < 5; ii++){
        if (newcom.score > ii)
        {
            estrella[ii] = "fa fa-star checked";
        }
        else {
            estrella[ii] = "fa fa-star";
        }
    }
    newcom.score = document.getElementById("puntaje").value;
    newcom.description = document.getElementById("comentario").value;
    newcom.user = localStorage.getItem("usuario");
    newcom.dateTime = fechaActual();
    newcom += `
    
            <div class="col">
                <h4 class="mb-1">`+ newcom.user +`</h4>
                <span class="`+estrella[0]+`"></span>
                <span class="`+estrella[1]+`"></span>
                <span class="`+estrella[2]+`"></span>
                <span class="`+estrella[3]+`"></span>
                <span class="`+estrella[4]+`"></span>
                <div class="d-flex w-100 justify-content-between">
                    <p class="mb-1">`+ newcom.description + `</p>
                    <small class="text-muted"> realizado el ` +newcom.dateTime+  `</small>
                </div>    
         
         <br>`;

document.getElementById("productComments").innerHTML += newcom;

}

function fechaActual()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var minmin = today.getMinutes();
    var ss = today.getSeconds();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

            today = yyyy + '-' + mm + '-' + dd + " "+hh+ ":"+ minmin + ":"+ ss;
        return today;
    }