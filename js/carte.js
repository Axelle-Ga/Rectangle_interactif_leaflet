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

var coin_bg = L.marker(points[0][0],{draggable:'true'});
var coin_hg = L.marker(points[0][1],{draggable:'true'});
var coin_hd = L.marker(points[0][2],{draggable:'true'});
var coin_bd = L.marker(points[0][3],{draggable:'true'});

console.log(coin_bd);


coin.addLayer(coin_hd);
coin.addLayer(coin_bd);
coin.addLayer(coin_bg);
coin.addLayer(coin_hg);

coin.addTo(mymap);

function majRectangle_bd(event, coin_hg, coin_bg, coin_hd, rectangle){
    rectangle.setBounds([event.latlng,coin_hg.getLatLng()]);
    var points = rectangle.getLatLngs();
    coin_bg.setLatLng(points[0][0]);
    coin_hd.setLatLng(points[0][2]);
}

function majRectangle_hd(event, coin_bg, coin_bd, coin_hg, rectangle){
    rectangle.setBounds([event.latlng,coin_bg.getLatLng()]);
    var points = rectangle.getLatLngs();
    coin_hg.setLatLng(points[0][0]);
    coin_bd.setLatLng(points[0][2]);
}

function majRectangle_bg(event, coin_hd, coin_bd, coin_hg,  rectangle){
    rectangle.setBounds([event.latlng,coin_hd.getLatLng()]);
    var points = rectangle.getLatLngs();
    coin_hg.setLatLng(points[0][0]);
    coin_bd.setLatLng(points[0][2]);
}

function majRectangle_hg(event, coin_bd, coin_bg, coin_hd, rectangle){
    rectangle.setBounds([event.latlng,coin_bd.getLatLng()]);
    var points = rectangle.getLatLngs();
    coin_bg.setLatLng(points[0][0]);
    coin_hd.setLatLng(points[0][2]);
}

coin_bd.addEventListener("drag",function(event) {majRectangle_bd(event, coin_hg, coin_bg, coin_hd, rectangle)});
coin_bg.addEventListener("drag",function(event) {majRectangle_bg(event, coin_hd, coin_bd, coin_hg, rectangle)});
coin_hd.addEventListener("drag",function(event) {majRectangle_hd(event, coin_bg, coin_bd, coin_hg, rectangle)});
coin_hg.addEventListener("drag",function(event) {majRectangle_hg(event, coin_bd, coin_bg, coin_hd,rectangle)});