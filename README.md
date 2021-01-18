# Rectangle_interactif_leaflet
Projet WebMapping ING2

Rectangle_interactif_leaflet est un plugin Leaflet.js qui permet d'ajouter des rectangles géodésiques intéractifs.
Un rectangle géodésique est ici un rectangle dont les côtés suivent les parallèles et les méridiens de la projection utilisée.
Par exemple dans la projection WebMercotor on obtient un véritable rectangle :
![Alt text](img/rectangleGeo_webmercator.PNG?raw=true "Rectangle Géodésique en WebMercator")

Mais en conique conforme comme en Lambert 93 il serait incurvé :
![Alt text](img/rectangleGeo_lambert93.PNG?raw=true "Rectangle Géodésique en Lambert 93")

Le plugin RectangleGeo.js permet de tracer ce type de rectangle sur un carte Leaflet.
Le plugin RectangleGeoInt.js permet de tracer ce type de rectangle avec des interaction pour pouvoir le modifier en l'étirant.

# Utilisation

Pour l'instant le code ne fonctionne pas comme un véritable plugin afin d'utiliser les fonctions ajouter le lien vers les scripts dans le body de votre page.
  
Pour créer des rectangles géodésiques sans interaction pré-codé ajouter le script rectangleGeo.js :
  
```html
	<script src="../../src/rectangleGeo.js"></script>
```


  
Pour créer des rectangles géodésiques intéractifs ajouter le script rectangleGeoInt.js :
  
```html
	<script src="../../src/rectangleGeo.js"></script>
	<script src="../../src/rectangleGeoInt.js"></script>
```


# Démo
