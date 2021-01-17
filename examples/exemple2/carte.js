var mymap1;
var mymap2;
var mymap3;
var mymap4;

var LAMB93 = new L.Proj.CRS('IGNF:LAMB93');

var utm20 = new L.Proj.CRS('EPSG:4559',
    '+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

/* initMap met en place le fond de carte en spécifiant les limites de zooms possibles et,
bien entendu, la source du fond de carte désiré, ici, OpenStreetMap. */
function initMap(){

    mymap1 = L.map('map1',
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      minZoom:1,
      maxZoom: 18,
      id: 'mapbox/satellite-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWdhaWdlIiwiYSI6ImNrZ2huODE5YjBnMGoyc3RldGZkZThxcHgifQ.Hwxwc-MYlZ01QTPAIFSloQ'
  }).addTo(mymap1);

  mymap2 = L.map('map2',{
      crs:L.geoportalCRS.EPSG2154
  }
    ).setView([50.1210604, -3.021240],3);
    
    var lyr = L.geoportalLayer.WMTS({
        layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
    }, { // leafletParams
        opacity: 0.8
    });
    lyr.addTo(mymap2); // ou map.addLayer(lyr);

  mymap3 = L.map('map3',
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      minZoom:1,
      maxZoom: 18,
      id: 'mapbox/satellite-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWdhaWdlIiwiYSI6ImNrZ2huODE5YjBnMGoyc3RldGZkZThxcHgifQ.Hwxwc-MYlZ01QTPAIFSloQ'
  }).addTo(mymap3);

  mymap4 = L.map('map4',
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      minZoom:1,
      maxZoom: 18,
      id: 'mapbox/satellite-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWdhaWdlIiwiYSI6ImNrZ2huODE5YjBnMGoyc3RldGZkZThxcHgifQ.Hwxwc-MYlZ01QTPAIFSloQ'
  }).addTo(mymap4);
}

initMap();




//Affiche le systeme de coordonnées de référence
document.getElementById('scr1').innerHTML = mymap1.options.crs.code;
document.getElementById('scr2').innerHTML = mymap2.options.crs.code;
document.getElementById('scr3').innerHTML = mymap3.options.crs.code;
document.getElementById('scr4').innerHTML = mymap4.options.crs.code;











function rectangleInt(bounds) {
    var rectangle = rectangleGeo(bounds);
    var coins =creationCoins(rectangle);
    var geobox = couche(rectangle, coins[0], coins[1], coins[2],coins[3]);
    coins[0].addEventListener("drag",function(event) {majRectangle_hg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[1].addEventListener("drag",function(event) {majRectangle_bg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[2].addEventListener("drag",function(event) {majRectangle_hd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[3].addEventListener("drag",function(event) {majRectangle_bd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    return (geobox);
}


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

function couche(rectangle, coin_hg, coin_bg, coin_hd,coin_bd) {
    var coins = new L.featureGroup();

    coins.addLayer(rectangle);
    coins.addLayer(coin_hd);
    coins.addLayer(coin_bd);
    coins.addLayer(coin_bg);
    coins.addLayer(coin_hg);

    return(coins);
}



function majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hg.getLatLng().lat,coin_hg.getLatLng().lng]]);
    coin_bg.setLatLng([event.latlng.lat, coin_hg.getLatLng().lng]);
    coin_hd.setLatLng([coin_hg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bg.getLatLng().lat,coin_bg.getLatLng().lng]]);
    coin_bd.setLatLng([event.latlng.lat, coin_bg.getLatLng().lng]);
    coin_hg.setLatLng([coin_bg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hd.getLatLng().lat,coin_hd.getLatLng().lng]]);
    coin_bd.setLatLng([event.latlng.lat, coin_hd.getLatLng().lng]);
    coin_hg.setLatLng([coin_hd.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bd.getLatLng().lat,coin_bd.getLatLng().lng]]);
    coin_bg.setLatLng([event.latlng.lat, coin_bd.getLatLng().lng]);
    coin_hd.setLatLng([coin_bd.getLatLng().lat, event.latlng.lng]);
}



var hello1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello2 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello3 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello4 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
hello1.addTo(mymap1);
hello2.addTo(mymap2);
hello3.addTo(mymap3);
hello4.addTo(mymap4);