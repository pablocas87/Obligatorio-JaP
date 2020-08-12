var express = require('express');
var app = express();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
});

app.get('/categorias', function(req, res){
    res.send('[{"name":"Autos","description":"Los mejores precios en autos 0 kilómetro, de alta y media gama.","productCount":"122","imgSrc":"img/cat1.jpg"},{"name":"Juguetes","description":"Encuentra aquí los mejores precios para niños/as de cualquier edad.","productCount":"354","imgSrc":"img/cat2.jpg"},{"name":"Muebles","description":"Muebles antiguos, nuevos y para ser armados por uno mismo.","productCount":"157","imgSrc":"img/cat3.jpg"},{"name":"Herramientas","description":"Herramientas para cualquier tipo de trabajo.","productCount":"452","imgSrc":"img/cat4.jpg"},{"name":"Computadoras","description":"Todo en cuanto a computadoras, para uso de oficina y/o juegos.","productCount":"724","imgSrc":"img/cat5.jpg"},{"name":"Vestimenta","description":"Gran variedad de ropa, nueva y de segunda mano.","productCount":"841","imgSrc":"img/cat6.jpg"},{"name":"Electrodomésticos","description":"Todos los electrodomésticos modernos y de bajo consumo.","productCount":"84","imgSrc":"img/cat7.jpg"},{"name":"Deporte","description":"Toda la variedad de indumentaria para todo tipo de deporte.","productCount":"574","imgSrc":"img/cat8.jpg"},{"name":"Celulares","description":"Celulares de todo tipo para cubrir todas las necesidades.","productCount":"124","imgSrc":"img/cat9.jpg"}]');
})

app.get('/productos', function(req, res){
    res.send([{"name":"Chevrolet Onix Joy","description":"Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.","cost":13500,"currency":"USD","imgSrc":"img/prod1.jpg","soldCount":14},{"name":"Fiat Way","description":"La versión de Fiat que brinda confort y a un precio accesible.","cost":14500,"currency":"USD","imgSrc":"img/prod2.jpg","soldCount":52},{"name":"Suzuki Celerio","description":"Un auto que se ha ganado la buena fama por su economía con el combustible.","cost":12500,"currency":"USD","imgSrc":"img/prod3.jpg","soldCount":25},{"name":"Peugeot 208","description":"El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.","cost":15200,"currency":"USD","imgSrc":"img/prod4.jpg","soldCount":17}]);
})

app.get('/product-info', function(req, res){
    res.send({"name":"Chevrolet Onix Joy","description":"Potenciá tu actitud con Onix Joy que, además de destacarse por su diseño juvenil y moderno, te ofrecé una óptima autonomía, un desempeño equilibrado y el máximo confort interior. \u003cbr\u003eYa sea un viaje largo o un simple paseo por la ciudad, el confort es uno de los puntos fuertes del Onix. Esta versión incluye aire acondicionado, asientos tapizados en tela y gran espacio interior que te garantiza el máximo confort.","cost":13500,"currency":"USD","soldCount":14,"category":"Autos","images":["img/prod1.jpg","img/prod1_1.jpg","img/prod1_2.jpg","img/prod1_3.jpg","img/prod1_4.jpg"]});
})

app.get('/publicar', function(req, res){
    res.send({"msg":"¡Has publicado con éxito!"});
})

app.get('/categorias-info', function(req, res){
    res.send({"name":"Autos","description":"Encuentra aquí los mejores precios para niños/as de cualquier edad.","productCriteria":"Incluya aquí los productos que sean autos o relacionados: repuestos, accesorios, etc.","productCount":"122","images":["img/cat1.jpg","img/car1.jpg","img/car2.jpg","img/car3.jpg"]});
})

app.get('/carrito-info', function(req, res){
    res.send({"articles":[{"name":"Pino de olor para el auto","count":2,"unitCost":100,"currency":"UYU","src":"img/tree1.jpg"}]});
})

app.get('/carrito-compra', function(req, res){
    res.send({"msg":"¡Has comprado con éxito!"});
})

app.listen(1994, function(){
    console.log('ecommerce, escuchando el puerto 1994!');
})