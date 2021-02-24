var mymap1;
var mymap2;
var mymap3;
var mymap4;


//Définition du scr EPSG3006
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
    
    //Initialisation de la carte 1 avec un scr 3006 (Système suédois)
    mymap4 = L.map('map4',{
        crs : crs
    }
    ).setView([50.1210604, -3.021240],3);

    
}

//Initialisation des quatre cartes
initMap();




//Affiche le système de coordonnées de référence de chaque carte
document.getElementById('scr1').innerHTML = mymap1.options.crs.code;
document.getElementById('scr2').innerHTML = mymap2.options.crs.code;
document.getElementById('scr3').innerHTML = mymap3.options.crs.code;
document.getElementById('scr4').innerHTML = mymap4.options.crs.code;


//Création de quatre même rectangle géodésique intéractif
var rect1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect2 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect3 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);
var rect4 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]]);

//Ajout des rectangles géodésiques intéractifs à leur carte respective
rect1.addTo(mymap1);
rect2.addTo(mymap2);
rect3.addTo(mymap3);
rect4.addTo(mymap4);