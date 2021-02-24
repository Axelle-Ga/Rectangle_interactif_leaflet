//Création de la classe RectangleGeo qui represente un rectangle suivant les méridiens et les parallèles
//Elle hérite de L.Polygon qui représente des polygones leaflet

L.Polygon.RectangleGeo = L.Polygon.extend({

    //Ajout sur la carte ce fait à partir de la méthode de la classe parente
    onAdd: function(map) {
        L.Polygon.prototype.onAdd.call(this, map);
    },

    //Initialisation à partir de la liste des coordonnées des deux points définissant le rectangle
    initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
    },
    
    //Modification du rectangle en redéfinissant ses points de définition
    setBounds: function (latLngBounds) {
		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
    },
    
    //Calcul des coordonnées des points permettant de tracer le rectangle à partir des coordonnées de ses deux points de définition
    _boundsToLatLngs: function (latLngBounds) {
        latLngBounds = creerLatLng_bounds(latLngBounds);
		return latLngBounds;
	}

});


function creerLatLng_bounds(bounds, n = 500) {
    //Calcul les coordonnées des points représentant le rectangle
    //n représente le nombre de points qui vont représenter la ligne

    //Récupération des coordonnées des deux points de définition du rectangle
    latlng1_lat = bounds[0][0];
    latlng1_lng = bounds[0][1];
    latlng2_lat = bounds[1][0];
    latlng2_lng = bounds[1][1];

    //Calcul de la différence de latitude
    var diffLat = latlng1_lat - latlng2_lat;
    
    //Calcul de la différence de longitude
    var diffLng = latlng1_lng - latlng2_lng;

    //Initialisation de la liste des coordonnées des points représentant le rectangle
    var latlngs = [[latlng1_lat, latlng1_lng]];

    //Ajout des points
    for (let i = 0; i < n; i++) {
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
    //Renvoie la liste de coordonnées des points représentant le rectangle
    return(latlngs)
}


//Renvoie le constructeur de la classe
function rectangleGeo(bounds, options) {
    return new L.Polygon.RectangleGeo(bounds, options);
}