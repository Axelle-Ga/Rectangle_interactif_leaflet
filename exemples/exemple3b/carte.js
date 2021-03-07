var mymap1;
var mymap2;



function initMap(){
    //Initialisation des cartes

    //Initialisation de la carte 1 avec un scr 3857 (Webmercator)
    mymap1 = L.map('map1',
    ).setView([1.43607, 22.78702],2);

    //Ajout du fond de carte de l'IGN avec géoportail
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
    ).setView([1.43607, 22.78702],2);
    
    //Ajout du fond de carte à partir de la couche MondeGADM geoserver publiée en local
    var wms = L.tileLayer.wms('http://localhost:8080/geoserver/test_monde/wms', {
        layers: 'test_monde:MondeGadmLambert93',
        transparent: true
    }).addTo(mymap2);
}

//Initialisation des deux cartes
initMap();


//Affiche le systeme de coordonnées de référence de chaque carte
document.getElementById('scr1').innerHTML = mymap1.options.crs.code;
document.getElementById('scr2').innerHTML = mymap2.options.crs.code;


//Création de deux même rectangle géodésique intéractif contenant l'Afrique
var rect1 = rectangleInt([[38.274156526143294,52.38261870670867],[-35.461050715344605,-18.63223112012598]],{color:"red"});
var rect2 = rectangleInt([[38.274156526143294,52.38261870670867],[-35.461050715344605,-18.63223112012598]],{color:"red"});

//Ajout des rectangles géodésiques intéractif à sa carte respective
rect1.addTo(mymap1);
rect2.addTo(mymap2);


//Lien entre les deux cartes si on zoom sur l'une on zoom sur l'autre
mymap1.on("zoom", function onZoom1(){
    mymap2.setView(mymap1.getCenter(),mymap1.getZoom());
});

mymap2.on("zoom", function onZoom2(){
    mymap1.setView(mymap2.getCenter(),mymap2.getZoom());
});

//Lien entre les deux cartes si on se déplace sur l'une on se déplace sur l'autre
mymap1.on("drag", function onDrag1(){
    mymap2.setView(mymap1.getCenter(),mymap1.getZoom());
});

mymap2.on("drag", function onDrag2(){
    mymap1.setView(mymap2.getCenter(),mymap2.getZoom());
});
