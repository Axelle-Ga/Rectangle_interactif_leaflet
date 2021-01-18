var mymap;

/* initMap met en place le fond de carte en spécifiant les limites de zooms possibles et,
bien entendu, la source du fond de carte désiré, ici, OpenStreetMap. */
function initMap(){

    var crs = new L.Proj.CRS('EPSG:3006',
	'+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
	{
		resolutions: [
			8192, 4096, 2048, 1024, 512, 256, 128,
			64, 32, 16, 8, 4, 2, 1, 0.5
		],
		origin: [0, 0]
    })


    mymap= L.map('map', {
		crs: crs,
	}
    ).setView([56.1210604, -3.021240],5);
/*    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      minZoom:1,
      maxZoom: 18,
      id: 'mapbox/satellite-v9',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiYWdhaWdlIiwiYSI6ImNrZ2huODE5YjBnMGoyc3RldGZkZThxcHgifQ.Hwxwc-MYlZ01QTPAIFSloQ'
  }).addTo(mymap); */
}

initMap();

console.log("map crs: " + mymap.options.crs.code);











// Rectangle avec des polylignes


function rectangleInt(point1_lat, point1_lng, point2_lat, point2_lng, color='green', n = 100) {
    var rectangle = creationRectangle(point1_lat, point1_lng, point2_lat, point2_lng, color, n)
    var coins =creationCoins(rectangle)
    var geobox = couche(rectangle, coins[0], coins[1], coins[2],coins[3]);
    coins[0].addEventListener("drag",function(event) {majRectangle_hg(event, coins[0], coins[1], coins[2], coins[3], rectangle, n)});
    coins[1].addEventListener("drag",function(event) {majRectangle_bg(event, coins[0], coins[1], coins[2], coins[3], rectangle, n)});
    coins[2].addEventListener("drag",function(event) {majRectangle_hd(event, coins[0], coins[1], coins[2], coins[3], rectangle, n)});
    coins[3].addEventListener("drag",function(event) {majRectangle_bd(event, coins[0], coins[1], coins[2], coins[3], rectangle, n)});
    return (geobox);
}

function creationRectangle(point1_lat, point1_lng, point2_lat, point2_lng, color, n) {

    latlngs = creerLatLng(L.latLng(point1_lat, point1_lng), L.latLng(point2_lat, point2_lng), n);

    const rectangle = new L.polygon(latlngs, {color: color});
    
    return(rectangle);
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



function majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle, n){
    var latlngs = creerLatLng(event.latlng,coin_hg.getLatLng(), n);
    rectangle.setLatLngs(latlngs);
    coin_bg.setLatLng([event.latlng.lat, coin_hg.getLatLng().lng]);
    coin_hd.setLatLng([coin_hg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle, n){
    var latlngs = creerLatLng(event.latlng,coin_bg.getLatLng(), n);
    rectangle.setLatLngs(latlngs);
    coin_bd.setLatLng([event.latlng.lat, coin_bg.getLatLng().lng]);
    coin_hg.setLatLng([coin_bg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle, n){
    var latlngs = creerLatLng(event.latlng,coin_hd.getLatLng(), n);
    rectangle.setLatLngs(latlngs);
    coin_bd.setLatLng([event.latlng.lat, coin_hd.getLatLng().lng]);
    coin_hg.setLatLng([coin_hd.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle, n){
    var latlngs = creerLatLng(event.latlng,coin_bd.getLatLng(), n);
    rectangle.setLatLngs(latlngs);
    coin_bg.setLatLng([event.latlng.lat, coin_bd.getLatLng().lng]);
    coin_hd.setLatLng([coin_bd.getLatLng().lat, event.latlng.lng]);
}

function creerLatLng(latlng1, latlng2, n) {
    //a factoriser!!!!!!
    var diffLat = latlng1.lat - latlng2.lat;
    var diffLng = latlng1.lng - latlng2.lng;
    var latlngs = [latlng1];
    for (let i = 0; i < n; i++) {
        latlngs.push([latlng1.lat, latlng1.lng-(diffLng/n*i)]);
    }
    for (let i = 0; i < n; i++) {
        latlngs.push([latlng1.lat-diffLat/n*i, latlng2.lng]);
    }
    for (let i = 0; i < n; i++) {
        latlngs.push([latlng2.lat, latlng2.lng+diffLng/n*i]);
    }
    for (let i = 0; i <= n; i++) {
        latlngs.push([latlng2.lat+diffLat/n*i, latlng1.lng]);
    }
    return(latlngs);
}

function creerLatLng_bounds(bounds, n = 100) {
    //a factoriser!!!!!!

    latlng1_lat = bounds[0][0];
    latlng1_lng = bounds[0][1];
    latlng2_lat = bounds[1][0];
    latlng2_lng = bounds[1][1];

    var diffLat = latlng1_lat - latlng2_lat;
    var diffLng = latlng1_lng - latlng2_lng;
    var latlngs = [[latlng1_lat, latlng1_lng]];

    for (let i = 0; i < n; i++) {
        console.log(i);
        latlngs.push([latlng1_lat, latlng1_lng-(diffLng/n*i)]);
    }
    for (let i = 0; i < n; i++) {
        latlngs.push([latlng1_lat-diffLat/n*i, latlng2_lng]);
    }
    for (let i = 0; i < n; i++) {
        latlngs.push([latlng2_lat, latlng2_lng+diffLng/n*i]);
    }
    for (let i = 0; i <= n; i++) {
        latlngs.push([latlng2_lat+diffLat/n*i, latlng1_lng]);
    }
    console.log(latlngs);
    return(latlngs)
}

var boite = rectangleInt(55.924586, 20.467774,30.876607, 0.699219);
boite.addTo(mymap);










//test extension de leaflet 
//Fonctionne quand l'extension est au même endroit que là ou on appelle le construction
//Créer un script pour mettre le code



L.Polygon.RectangleGeo = L.Polygon.extend({

    onAdd: function(map) {
        L.Polygon.prototype.onAdd.call(this, map);
    },

    initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
    },
    
    setBounds: function (latLngBounds) {
		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
    },
    
    _boundsToLatLngs: function (latLngBounds) {
        console.log(latLngBounds);
        latLngBounds = creerLatLng_bounds(latLngBounds);
        console.log(latLngBounds);
		return latLngBounds;
	}

});




function rectangleGeo(bounds, options) {
    return new L.Polygon.RectangleGeo(bounds, options);
}



var salut = new rectangleGeo([[55.924586, 20.467774],[30.876607, 0.699219]]);
console.log(salut);
salut.addTo(mymap);