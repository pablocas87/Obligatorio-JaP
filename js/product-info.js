var product = {};
var comentario = {};

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
//Comentarios
/**
function showComments(array){
    let comments = "";
    for (let i = 0; i < array.length; i++){
        let comment = array[i];
        comments +=  `<div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="`+comment+`" alt="">
            </div>
        </div>`;
    }
    
    
    document.getElementById("productComments").innerHTML = comments;
   
}
*/
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
});
function datos(product){
    document.getElementById("productDescription").innerHTML = product.description;
    document.getElementById("productCount").innerHTML = product.currency + " " + product.cost;
    document.getElementById("productName").innerHTML = product.name;
}
/**
//Comentarios
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
           comentario = resultObj.data;
           datos(comentario);
           showComments(comentario.description)
        }
    });
});
function datos(product){
    document.getElementById("userComment").innerHTML = comentario.description;
    document.getElementById("commentUser").innerHTML = comentario.user + " " + comentario.dateTime;
    document.getElementById("productScore").innerHTML = product.score;
}  
 */