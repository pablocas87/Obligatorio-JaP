document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("ingresar").addEventListener("click",function(){
        let usuario = document.getElementById("inputEmail").value;
        localStorage.setItem("usuario",usuario);
    })
})