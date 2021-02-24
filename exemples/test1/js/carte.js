var mymap;

/* initMap met en place le fond de carte en spécifiant les limites de zooms possibles et,
bien entendu, la source du fond de carte désiré, ici, OpenStreetMap. */
function initMap(){

    mymap = L.map('map',
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
        }).addTo(mymap);
}

initMap();



var salut = new rectangleGeo([[55.924586, 20.467774],[30.876607, 0.699219]],{color:"red"});
salut.addTo(mymap);

var hello = rectangleInt([[50.924586, 20.467774],[30.876607, 0.699219]], );
hello.addTo(mymap);

hello.addEventListener("draggend", function onDrag(){
    console.log("salut");
});