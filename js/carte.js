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

var couche = new L.featureGroup();

//Ajout des markers
var mark_hd = L.marker([56.1210604, -3.021240],{draggable:'true'});
var mark_hg = L.marker([56.121013, -5.767865],{draggable:'true'});
var mark_bd = L.marker([54.543393, -3.010254],{draggable:'true'});
var mark_bg = L.marker([54.559322, -5.767822],{draggable:'true'});

couche.addLayer(mark_hd);
couche.addLayer(mark_hg);
couche.addLayer(mark_bd);
couche.addLayer(mark_bg);

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

var polygon = L.polygon(latlngs, {color: 'red'}).addTo(mymap);

function majRectangle(couche){
    for (m in couche.getLayers()){
    }
}