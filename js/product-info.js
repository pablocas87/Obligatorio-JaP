var product = {};

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