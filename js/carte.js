var mymap;

/* initMap met en place le fond de carte en spécifiant les limites de zooms possibles et,
bien entendu, la source du fond de carte désiré, ici, OpenStreetMap. */
function initMap(){
    mymap= L.map('map').setView([56.1210604, -3.021240],5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	minZoom: 1,
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
}

initMap();


// _________Test event sur un polygone quelconque________________________

var couche = new L.featureGroup();

var polygones = new L.featureGroup();

//Ajout des markers
var mark_hd = L.marker([56.1210604, -3.021240],{draggable:'true'});
var mark_hg = L.marker([56.121013, -5.767865],{draggable:'true'});
var mark_bd = L.marker([54.543393, -3.010254],{draggable:'true'});
var mark_bg = L.marker([54.559322, -5.767822],{draggable:'true'});

couche.addLayer(mark_hd);
couche.addLayer(mark_bd);
couche.addLayer(mark_bg);
couche.addLayer(mark_hg);

couche.addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);


var latlngs = [mark_hd.getLatLng(),mark_bd.getLatLng(),mark_bg.getLatLng(),mark_hg.getLatLng()];

var polygon = L.polygon(latlngs, {color: 'red'});

polygones.addLayer(polygon);

polygones.addTo(mymap);

function majPolygone(couche, polygon){
    console.log("draggend");
    var latlngs = [];
    couche.getLayers().forEach(element => {
        latlngs.push(element.getLatLng());
    });    
    polygon.setLatLngs(latlngs);

}

mark_bd.addEventListener("drag",function() {majPolygone(couche, polygon)});
mark_bg.addEventListener("drag",function() {majPolygone(couche, polygon)});
mark_hd.addEventListener("drag",function() {majPolygone(couche, polygon)});
mark_hg.addEventListener("drag",function() {majPolygone(couche, polygon)});










//Adaptation du code précédent à un rectangle

var coin = new L.featureGroup();

var latlngs = [[55.924586, 4.467774],[54.876607, 1.699219]];

var rectangle = L.rectangle(latlngs, {color: 'green'});

rectangle.addTo(mymap);

var points = rectangle.getLatLngs();


//On peut récupérer les limites du rectangle
var bounds = rectangle.getBounds();

var coin_bg = L.marker(points[0][0],{draggable:'true'});
var coin_hg = L.marker(points[0][1],{draggable:'true'});
var coin_hd = L.marker(points[0][2],{draggable:'true'});
var coin_bd = L.marker(points[0][3],{draggable:'true'});

coin_hg.bindPopup("Haut gauche");
coin_bg.bindPopup("Bas gauche");
coin_hd.bindPopup("Haut droit");
coin_bd.bindPopup("Bas droit");

coin.addLayer(coin_hd);
coin.addLayer(coin_bd);
coin.addLayer(coin_bg);
coin.addLayer(coin_hg);

coin.addTo(mymap);

function majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([event.latlng,coin_hg.getLatLng()]);
    var points = rectangle.getLatLngs();
    if ((event.latlng.lat>coin_hg.getLatLng().lat && event.latlng.lng<coin_hg.getLatLng().lng)||(event.latlng.lat<coin_hg.getLatLng().lat && event.latlng.lng>coin_hg.getLatLng().lng) ) {
        coin_bg.setLatLng(points[0][2]);
        coin_hd.setLatLng(points[0][0]);
    } else {
        coin_bg.setLatLng(points[0][1]);
        coin_hd.setLatLng(points[0][3]);
    }
    majPostion(coin_hg, coin_bg, coin_hd,coin_bd);

}

function majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([event.latlng,coin_bg.getLatLng()]);
    var points = rectangle.getLatLngs();
    if ((event.latlng.lat>coin_bg.getLatLng().lat && event.latlng.lng<coin_bg.getLatLng().lng)||(event.latlng.lat<coin_bg.getLatLng().lat && event.latlng.lng>coin_bg.getLatLng().lng) ) {
        coin_hg.setLatLng(points[0][2]);
        coin_bd.setLatLng(points[0][0]);
    } else {
        coin_hg.setLatLng(points[0][1]);
        coin_bd.setLatLng(points[0][3]);
    }
    majPostion(coin_hg, coin_bg, coin_hd,coin_bd);
}

function majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([event.latlng,coin_hd.getLatLng()]);
    var points = rectangle.getLatLngs();
    if ((event.latlng.lat>coin_hd.getLatLng().lat && event.latlng.lng<coin_hd.getLatLng().lng)||(event.latlng.lat<coin_hd.getLatLng().lat && event.latlng.lng>coin_hd.getLatLng().lng) ) {
        coin_hg.setLatLng(points[0][2]);
        coin_bd.setLatLng(points[0][0]);
    } else {
        coin_hg.setLatLng(points[0][1]);
        coin_bd.setLatLng(points[0][3]);
    }
    majPostion(coin_hg, coin_bg, coin_hd,coin_bd);
}

function majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([event.latlng,coin_bd.getLatLng()]);
    var points = rectangle.getLatLngs();
    if ((event.latlng.lat>coin_bd.getLatLng().lat && event.latlng.lng<coin_bd.getLatLng().lng)||(event.latlng.lat<coin_bd.getLatLng().lat && event.latlng.lng>coin_bd.getLatLng().lng) ) {
        coin_bg.setLatLng(points[0][2]);
        coin_hd.setLatLng(points[0][0]);
    } else {
        coin_bg.setLatLng(points[0][1]);
        coin_hd.setLatLng(points[0][3]);
    }
    majPostion(coin_hg, coin_bg, coin_hd,coin_bd);
}

coin_bd.addEventListener("drag",function(event) {majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle)});
coin_bg.addEventListener("drag",function(event) {majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle)});
coin_hd.addEventListener("drag",function(event) {majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle)});
coin_hg.addEventListener("drag",function(event) {majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle)});

function majPostion(coin_hg, coin_bg, coin_hd,coin_bd) {
    //bas droit
    document.getElementById("lat1").value = coin_bd.getLatLng().lat;
    document.getElementById("lng1").value = coin_bd.getLatLng().lng;
    //bas gauche
    document.getElementById("lat2").value = coin_bg.getLatLng().lat;
    document.getElementById("lng2").value = coin_bg.getLatLng().lng;
    //haut gauche
    document.getElementById("lat3").value = coin_hg.getLatLng().lat;
    document.getElementById("lng3").value = coin_hg.getLatLng().lng;
    //haut droit
    document.getElementById("lat4").value = coin_hd.getLatLng().lat;
    document.getElementById("lng4").value = coin_hd.getLatLng().lng;
}

//Creation de la boite à partir d'une unique fonction

function box(point1_lat, point1_lng, point2_lat, point2_lng, color='green') {
    var rectangle = creationRectangle(point1_lat, point1_lng, point2_lat, point2_lng, color)
    var coins =creationCoins(rectangle)
    var box = coucheBox(rectangle, coins[0], coins[1], coins[2],coins[3]);
    coins[0].addEventListener("drag",function(event) {majRectangle_hg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[1].addEventListener("drag",function(event) {majRectangle_bg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[2].addEventListener("drag",function(event) {majRectangle_hd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[3].addEventListener("drag",function(event) {majRectangle_bd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    return (box);
}



function creationCoins(rectangle) {

    var points = rectangle.getLatLngs();

    var coin_bg = L.marker(points[0][0],{draggable:'true'});
    var coin_hg = L.marker(points[0][1],{draggable:'true'});
    var coin_hd = L.marker(points[0][2],{draggable:'true'});
    var coin_bd = L.marker(points[0][3],{draggable:'true'});

    return([coin_hg, coin_bg, coin_hd,coin_bd]);
    
}

function coucheBox(rectangle, coin_hg, coin_bg, coin_hd,coin_bd) {
    var coins = new L.featureGroup();

    coins.addLayer(rectangle);
    coins.addLayer(coin_hd);
    coins.addLayer(coin_bd);
    coins.addLayer(coin_bg);
    coins.addLayer(coin_hg);

    return(coins);
}

function creationRectangle(point1_lat, point1_lng, point2_lat, point2_lng, color) {

    var latlngs = [[point1_lat, point1_lng],[point2_lat, point2_lng]];
    var rectangle = L.rectangle(latlngs, {color: color});
    return(rectangle);
}

box(50.924586, 5.467774,51.876607, 3.699219, 'red').addTo(mymap);