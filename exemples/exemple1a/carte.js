var mymap;

//Initialisation de la carte avec un scr 3857 (Webmercator) et un fond de carte OSM
function initMap(){

    mymap= L.map('map',
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
}


//Initialisation de la carte
initMap();


//Affiche le systeme de coordonnées de référence
document.getElementById('scr').innerHTML = mymap.options.crs.code;


//Création du rectangle géodésique intéractif et ajout à la carte
var boite = rectangleGeo([[51.1564,-5.1084],[41.1842,10.0195]]).addTo(mymap);