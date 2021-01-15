var mymap;

// initMap initialise la carte : fond de carte(ici OSM), zoom, vue etc
function initMap(){

    mymap= L.map('map',
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
}


//On initilise la carte
initMap();




//Affiche le systeme de coordonnées de référence
document.getElementById('scr').innerHTML = mymap.options.crs.code;









//Fonction qui permet de créer le rectangle géodésique intéractif
function rectangleInt(bounds) {
    var rectangle = rectangleGeo(bounds);
    var coins =creationCoins(rectangle);
    var geobox = couche(rectangle, coins[0], coins[1], coins[2],coins[3]);
    //On ajoute l'ecouteur pour chaque coin afin de faire la mise à jour des positions
    coins[0].addEventListener("drag",function(event) {majRectangle_hg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[1].addEventListener("drag",function(event) {majRectangle_bg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[2].addEventListener("drag",function(event) {majRectangle_hd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[3].addEventListener("drag",function(event) {majRectangle_bd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    return (geobox);
}

//
function creationCoins(rectangle) {

    var points = rectangle.getBounds();

    var coin_bg = L.marker([points._southWest.lat,points._southWest.lng],{draggable:'true'});
    var coin_hg = L.marker([points._northEast.lat,points._southWest.lng],{draggable:'true'});
    var coin_hd = L.marker([points._northEast.lat,points._northEast.lng],{draggable:'true'});
    var coin_bd = L.marker([points._southWest.lat,points._northEast.lng],{draggable:'true'});

    coin_hg.bindPopup("Haut gauche");
    coin_bg.bindPopup("Bas gauche");
    coin_hd.bindPopup("Haut droit");
    coin_bd.bindPopup("Bas droit");

    return([coin_hg, coin_bg, coin_hd,coin_bd]);
    
}

//Réuni les markers et le rectangle dans une seule couche
function couche(rectangle, coin_hg, coin_bg, coin_hd,coin_bd) {
    var coins = new L.featureGroup();

    coins.addLayer(rectangle);
    coins.addLayer(coin_hd);
    coins.addLayer(coin_bd);
    coins.addLayer(coin_bg);
    coins.addLayer(coin_hg);

    return(coins);
}


//
function majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hg.getLatLng().lat,coin_hg.getLatLng().lng]]);
    coin_bg.setLatLng([event.latlng.lat, coin_hg.getLatLng().lng]);
    coin_hd.setLatLng([coin_hg.getLatLng().lat, event.latlng.lng]);
}

//
function majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bg.getLatLng().lat,coin_bg.getLatLng().lng]]);
    coin_bd.setLatLng([event.latlng.lat, coin_bg.getLatLng().lng]);
    coin_hg.setLatLng([coin_bg.getLatLng().lat, event.latlng.lng]);
}

//
function majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hd.getLatLng().lat,coin_hd.getLatLng().lng]]);
    coin_bd.setLatLng([event.latlng.lat, coin_hd.getLatLng().lng]);
    coin_hg.setLatLng([coin_hd.getLatLng().lat, event.latlng.lng]);
}

//
function majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bd.getLatLng().lat,coin_bd.getLatLng().lng]]);
    coin_bg.setLatLng([event.latlng.lat, coin_bd.getLatLng().lng]);
    coin_hd.setLatLng([coin_bd.getLatLng().lat, event.latlng.lng]);
}


//Créer le rectangle géodésique intéractif et l'ajoute à la carte
var boite = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]).addTo(mymap);