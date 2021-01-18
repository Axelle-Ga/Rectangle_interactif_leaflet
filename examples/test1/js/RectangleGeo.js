L.Polygon.RectangleGeo = L.Polygon.extend({

    onAdd: function(map) {
        L.Polygon.prototype.onAdd.call(this, map);
    },

    initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
    },
    
    setBounds: function (latLngBounds) {
		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
    },
    
    _boundsToLatLngs: function (latLngBounds) {
        latLngBounds = creerLatLng_bounds(latLngBounds);
		return latLngBounds;
	}

});


function creerLatLng_bounds(bounds, n = 500) {
    //a factoriser!!!!!!

    latlng1_lat = bounds[0][0];
    latlng1_lng = bounds[0][1];
    latlng2_lat = bounds[1][0];
    latlng2_lng = bounds[1][1];

    var diffLat = latlng1_lat - latlng2_lat;
    var diffLng = latlng1_lng - latlng2_lng;
    var latlngs = [[latlng1_lat, latlng1_lng]];

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
    return(latlngs)
}



function rectangleGeo(bounds, options) {
    return new L.Polygon.RectangleGeo(bounds, options);
}