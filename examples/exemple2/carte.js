var mymap1;
var mymap2;
var mymap3;
var mymap4;

//Définition du scr Lambert 93 (Conique conforme)
var LAMB93 = new L.Proj.CRS('IGNF:LAMB93');

//Définition du scr utm20
var utm20 = new L.Proj.CRS('EPSG:4559',
    '+proj=utm +zone=20 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');

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
        crs:L.geoportalCRS.EPSG2154
    }
    ).setView([50.1210604, -3.021240],3);
    
    var PlanIGN = L.tileLayer('https://wxs.ign.fr/{ignApiKey}/geoportail/wmts?'+
            '&REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&TILEMATRIXSET=PM'+
            '&LAYER={ignLayer}&STYLE={style}&FORMAT={format}'+
            '&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}',
            {
	            ignApiKey: 'choisirgeoportail',
	            ignLayer: 'GEOGRAPHICALGRIDSYSTEMS.FRANCERASTER.L93',
	            style: 'normal',
	            format: 'image/jpeg',
	            service: 'WMTS',
	            attribution: '&copy; <a href="http://www.ign.fr/">IGN</a>'
        }).addTo(mymap2); // ou map.addLayer(lyr);

    //Initialisation de la carte 1 avec un scr 3857 (Webmercator)
    mymap3 = L.map('map3',
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
        }).addTo(mymap3);
    

    mymap4 = L.map('map4',{
        crs : crs
    }
    ).setView([50.1210604, -3.021240],3);
    L.tileLayer.wms('https://geodatatest.havochvatten.se/geoservices/ows', {
	layers: 'hav-bakgrundskartor:hav-grundkarta',
	format: 'image/png',
	maxZoom: 14,
	minZoom: 0,
	attribution: '&copy; OpenStreetMap contributors <a href="https://www.havochvatten.se/kunskap-om-vara-vatten/kartor-och-geografisk-information/karttjanster.html">Havs- och vattenmyndigheten (Swedish Agency for Marine and Water Management)</a>'
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