var mymap1;
var mymap2;
var mymap3;
var mymap4;

//Définition du scr Lambert 93 (Conique conforme)
var LAMB93 = new L.Proj.CRS('IGNF:LAMB93');

//Définition du scr utm20
var utm20 = new L.Proj.CRS('EPSG:4559',
    '+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

    //c'est pas une mercator mais flemme c'est itrf2008 à supprimer
var mercator_oblique = new L.Proj.CRS("EPSG:4896",
"+proj=geocent +ellps=GRS80 +units=m +no_defs");

//Def crs epsg 3006
var crs = new L.Proj.CRS('EPSG:3006',
'+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',

{
    resolutions: [
        8192, 4096, 2048, 1024, 512, 256, 128,
        64, 32, 16, 8, 4, 2, 1, 0.5
    ],
    origin: [0, 0]
});

//Initialisation de la carte 1 avec un scr 3857 (Webmercator)
function initMap(){

    mymap1 = L.map('map1',
    ).setView([50.1210604, -3.021240],3);
    var PlanIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?'+
            '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM'+
            '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}'+
            '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}',
            {
	            ignApiKey: 'choisirgeoportail',
	            ignLayer: 'ORTHOIMAGERY.ORTHOPHOTOS',
	            style: 'normal',
	            format: 'image/jpeg',
	            service: 'WMTS',
	            attribution: '&copy; <a href="http://www.ign.fr/">IGN</a>'
        }).addTo(mymap1);

    //Initialisation de la carte 2 avec un scr 2154 (Lambert 93)
    mymap2 = L.map('map2',{
        crs:L.geoportalCRS.EPSG2154,
        minZoom: 3
    }
    ).setView([50.1210604, -3.021240],3);
    
    var wms = L.tileLayer.wms('http://localhost:8080/geoserver/test_monde/wms', {
        layers: 'test_monde:MondeGadmLambert93',
        transparent: true,
    });
    
    wms.addTo(mymap2); // ou map.addLayer(lyr);
    
    
}

//Initialisation des quatre cartes
initMap();




//Affiche le systeme de coordonnées de référence de chaque carte
document.getElementById('scr1').innerHTML = mymap1.options.crs.code;
document.getElementById('scr2').innerHTML = mymap2.options.crs.code;


//Création de quatre même rectangle geodésique intéractif
var rect1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect2 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);

//Ajout des rectangles géodésiques intéractif à sa carte respective
rect1.addTo(mymap1);
rect2.addTo(mymap2);