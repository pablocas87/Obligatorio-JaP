let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.13;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){
  let comissionCostHTML = document.getElementById("comissionText");
  let totalCostHTML = document.getElementById("totalCostText");

  let comissionToShow = Math.round((shippingPercentage * 100)) + "%";
  total = (Math.round(subtotal * shippingPercentage * 100) / 100 + subtotal);

  comissionCostHTML.innerHTML = comissionToShow;
  totalCostHTML.innerHTML = total;
}

function updateSubtotal(){
    let cantidad = document.getElementById("cant").value;
    subtotal = cantidad * productUnitCost;
    document.getElementById("subtotal").innerHTML = subtotal;

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(articles){
    let htmlContentToAppend = "";
    let article = articles[0];
    productUnitCost = article.unitCost;
    document.getElementById("productName").innerHTML = article.name;
    document.getElementById("precio").innerHTML = 'Precio unitario $' + article.unitCost;
    document.getElementById("cant").value = article.count;
    document.getElementById("imagen").src = article.src;
    document.getElementById("cantproducto").innerHTML = articles.length;
    updateSubtotal();
    updateTotalCosts();


}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(response){
       if(response.status === "ok"){
           showArticles(response.data.articles);
       } 
    })
    var forms = document.getElementsByClassName('needs-validation')

    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        else {
          if(paymentTypeSelected){
            event.preventDefault()
            event.stopPropagation()
          getJSONData(CART_BUY_URL).then(function(response){
            if(response.status === "ok"){
              alert(response.data.msg);
              location.href = location.href;
            }
          })
        }
        else {
          event.preventDefault()
          event.stopPropagation()
          alert("Por favor, seleccione un método de pago");
        }
      }
        form.classList.add('was-validated')
      })
    })
    document.getElementById("cerrarModal").addEventListener("click",function(e){
      let metodoDePagoCredito = document.getElementById("creditCardPaymentRadio");
      let metodoDePagoBanco   = document.getElementById("bankingRadio");
      let tarjetaDeCredito    = document.getElementById("creditCardNumber");
      let cuentaDeBanco       = document.getElementById("bankAccountNumber");
  
      let codigoSeguridad     = document.getElementById("creditCardSecurityCode");
      let fechaVencimiento    = document.getElementById("dueDate");
  
      let infoMissing = true;
  
      //Quito las clases que marcan como inválidos
      tarjetaDeCredito.classList.remove('is-invalid');
      codigoSeguridad.classList.remove('is-invalid');
      fechaVencimiento.classList.remove('is-invalid');
  
      //Se realizan los controles necesarios,
      //Si es pago con tarjeta
      if (metodoDePagoCredito.checked)
      {
          infoMissing = false;
          //Validamos que la tarjeta no este vacia
          if(tarjetaDeCredito.value === ""){
              tarjetaDeCredito.classList.add('is-invalid');
              infoMissing = true;        
          }
          if(codigoSeguridad.value === ""){
            codigoSeguridad.classList.add('is-invalid');
            infoMissing = true;        
        }
        if(fechaVencimiento.value === ""){
          fechaVencimiento.classList.add('is-invalid');
          infoMissing = true;        
      }
      }
  
      if(metodoDePagoBanco.checked){
          infoMissing = false;
          //Validamos que la cuenta de banco no este vacia
          if(cuentaDeBanco.value === ""){
              cuentaDeBanco.classList.add('is-invalid');
              infoMissing = true;        
          }
      }
  
      if(infoMissing){
          //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
          e.preventDefault();
          e.stopPropagation();
          return false;
      }
      paymentTypeSelected = true;
  })

    document.getElementById("cant").addEventListener("change",function(){
      updateSubtotal();
      updateTotalCosts();
    })
    document.getElementById("goldradio").addEventListener("change", function(){
      shippingPercentage = 0.13;
      updateTotalCosts();
  });
  
  document.getElementById("premiumradio").addEventListener("change", function(){
      shippingPercentage = 0.07;
      updateTotalCosts();
  });

  document.getElementById("standardradio").addEventListener("change", function(){
      shippingPercentage = 0.03;
      updateTotalCosts();
  });
});