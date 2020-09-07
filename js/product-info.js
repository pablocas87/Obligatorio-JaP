var product = {};
var comentarios ={};

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
        comments +=  `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="`+comentario+`" alt="">
            </div>
        </div>`;
    }
    
    
    document.getElementById("productComments").innerHTML = comments;
   
}
//comentarios


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
         datos1(comentarios);
         showComments(comentarios.description)
        }
    });
//comentarios
});
function datos(product){
    document.getElementById("productDescription").innerHTML = product.description;
    document.getElementById("productCount").innerHTML = product.currency + " " + product.cost;
    document.getElementById("productName").innerHTML = product.name;
}
//comentarios
function datos1(comentarios){
    document.getElementById("productComment").innerHTML = comentarios.description;
    document.getElementById("userComment").innerHTML = comentarios.user;
    document.getElementById("productScore").innerHTML = comentarios.score + "" + comentarios.dateTime;
//comentarios
}