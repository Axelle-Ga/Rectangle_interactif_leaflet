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



var hello1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello2 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello3 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var hello4 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);

hello1.addTo(mymap1);
hello2.addTo(mymap2);
hello3.addTo(mymap3);
hello4.addTo(mymap4);