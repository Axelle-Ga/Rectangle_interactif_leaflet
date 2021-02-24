function rectangleInt(bounds, options) {
    //Fonction de création de la boite géodésique intéractive

    //Création d'un rectangle geodésique (qui suit les parallèles et les méridiens)
    var rectangle = rectangleGeo(bounds, options);

    //Création des markers sur les coins du rectangle pour pouvoir le modifier
    var coins =creationCoins(rectangle);

    //Création de la couche regroupant le rectangle et les coins
    var geoboite = couche(rectangle, coins[0], coins[1], coins[2],coins[3]);

    //Ajout des écouteurs pour modifier le rectangle en déplaçant les markers aux coins
    coins[0].addEventListener("drag",function(event) {majRectangle_hg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[1].addEventListener("drag",function(event) {majRectangle_bg(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[2].addEventListener("drag",function(event) {majRectangle_hd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    coins[3].addEventListener("drag",function(event) {majRectangle_bd(event, coins[0], coins[1], coins[2], coins[3], rectangle)});
    
    //On renvoie l'objet ainsi créé
    return (geoboite);
}


function creationCoins(rectangle) {
    //Fonction de création des markers représentant les coins de la boite géodésique

    //Récupération des coordonnées des deux points définissant le rectangle
    var points = rectangle.getBounds();

    //Création des coins du rectangle
    var coin_bg = L.marker([points._southWest.lat,points._southWest.lng],{draggable:'true'});
    var coin_hg = L.marker([points._northEast.lat,points._southWest.lng],{draggable:'true'});
    var coin_hd = L.marker([points._northEast.lat,points._northEast.lng],{draggable:'true'});
    var coin_bd = L.marker([points._southWest.lat,points._northEast.lng],{draggable:'true'});

    //On renvoie les coins ainsi créés
    return([coin_hg, coin_bg, coin_hd,coin_bd]);
    
}

function couche(rectangle, coin_hg, coin_bg, coin_hd,coin_bd) {
    //Regroupement du rectangle et des coins dans un seul featureGroup

    //Création du featureGroup
    var coins = new L.featureGroup();

    //Ajout des objets dans le featureGroup
    coins.addLayer(rectangle);
    coins.addLayer(coin_hd);
    coins.addLayer(coin_bd);
    coins.addLayer(coin_bg);
    coins.addLayer(coin_hg);

    //Renvoie la couche créée
    return(coins);
}



function majRectangle_bd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    //Mise à jour du rectangle quand le coin bas droit est déplacé

    //Modification du rectangle avec ses nouvelles coordonnées
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hg.getLatLng().lat,coin_hg.getLatLng().lng]]);

    //Déplacement des markers à la bonne position
    coin_bg.setLatLng([event.latlng.lat, coin_hg.getLatLng().lng]);
    coin_hd.setLatLng([coin_hg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hd(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    //Mise à jour du rectangle quand le coin haut droit est déplacé

    //Modification du rectangle avec ses nouvelles coordonnées
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bg.getLatLng().lat,coin_bg.getLatLng().lng]]);

    //Déplacement des markers à la bonne position
    coin_bd.setLatLng([event.latlng.lat, coin_bg.getLatLng().lng]);
    coin_hg.setLatLng([coin_bg.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_bg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    //Mise à jour du rectangle quand le coin bas gauche est déplacé

    //Modification du rectangle avec ses nouvelles coordonnées
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_hd.getLatLng().lat,coin_hd.getLatLng().lng]]);

    //Déplacement des markers à la bonne position
    coin_bd.setLatLng([event.latlng.lat, coin_hd.getLatLng().lng]);
    coin_hg.setLatLng([coin_hd.getLatLng().lat, event.latlng.lng]);
}

function majRectangle_hg(event, coin_hg, coin_bg, coin_hd,coin_bd, rectangle){
    //Mise à jour du rectangle quand le coin haut gauche est déplacé

    //Modification du rectangle avec ses nouvelles coordonnées
    rectangle.setBounds([[event.latlng.lat,event.latlng.lng],[coin_bd.getLatLng().lat,coin_bd.getLatLng().lng]]);

    //Déplacement des markers à la bonne position
    coin_bg.setLatLng([event.latlng.lat, coin_bd.getLatLng().lng]);
    coin_hd.setLatLng([coin_bd.getLatLng().lat, event.latlng.lng]);
}