var mymap1;
var mymap2;
var mymap3;
var mymap4;

//Définition du scr Lambert 93 (Conique conforme)
var LAMB93 = new L.Proj.CRS('IGNF:LAMB93');

//Définition du scr utm20
var utm20 = new L.Proj.CRS('EPSG:4559',
    '+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

//Initialisation de la carte 1 avec un scr 3857 (Webmercator)
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

    //Initialisation de la carte 2 avec un scr 2154 (Lambert 93)
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

    //Initialisation de la carte 1 avec un scr 3857 (Webmercator)
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

//Initialisation des quatre cartes
initMap();




//Affiche le systeme de coordonnées de référence de chaque carte
document.getElementById('scr1').innerHTML = mymap1.options.crs.code;
document.getElementById('scr2').innerHTML = mymap2.options.crs.code;
document.getElementById('scr3').innerHTML = mymap3.options.crs.code;
document.getElementById('scr4').innerHTML = mymap4.options.crs.code;


//Création de quatre même rectangle geodésique intéractif
var rect1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect2 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect3 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect4 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);

//Ajout des rectangles géodésiques intéractif à sa carte respective
rect1.addTo(mymap1);
rect2.addTo(mymap2);
rect3.addTo(mymap3);
rect4.addTo(mymap4);