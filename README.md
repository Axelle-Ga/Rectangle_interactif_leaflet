# Rectangle_interactif_leaflet
Projet WebMapping ING2

Rectangle_interactif_leaflet est un plugin Leaflet.js qui permet d'ajouter des rectangles géodésiques intéractifs.
Un rectangle géodésique est ici un rectangle dont les côtés suivent les parallèles et les méridiens de la projection utilisée.
Par exemple dans la projection WebMercotor on obtient un véritable rectangle :
![Alt text](img/rectangleGeo_webmercator.PNG?raw=true "Rectangle Géodésique en WebMercator")

Mais en conique conforme comme en Lambert 93 il serait incurvé :
![Alt text](img/rectangleGeo_lambert93.PNG?raw=true "Rectangle Géodésique en Lambert 93")
  
Voici un exemple avec deux rectangles identiques représentés dans deux projections différentes (que vous pouvez retrouver dans exemples/exemple2) :
![Alt text](img/rectanglegeo_mercator_lambert93.PNG?raw=true "Rectangle Géodésique en Lambert 93")
  
Le plugin RectangleGeo.js permet de tracer ce type de rectangle sur un carte Leaflet.
Le plugin RectangleGeoInt.js permet de tracer ce type de rectangle avec des interactions pour pouvoir le modifier en l'étirant.

# Utilisation

Afin d'utiliser les fonctions ajouter le lien vers les scripts dans le body de votre page.
  
Pour créer des rectangles géodésiques sans interaction ajouter le script rectangleGeo.js :
  
```html
	<script src="../../src/rectangleGeo.js"></script>
```


  
Pour créer des rectangles géodésiques intéractifs ajouter le script rectangleGeoInt.js en plus du script rectangleGeo.js:
  
```html
	<script src="../../src/rectangleGeo.js"></script>
	<script src="../../src/rectangleGeoInt.js"></script>
```

Dans votre script js appeler rectangleGeo(liste_coord, options) ou rectangleInt(liste_coord, options) pour créer respectivement un rectangle géodésique et un rectangle géodésique intéractif.
Où liste_coord est la liste de coordonnée des deux points de définition du rectangle, et options les options héritées de la classe Polygon de Leaflet (cf [documentation leaflet] (https://leafletjs.com/reference-1.7.1.html#polygon)).

```javascript
var rect1 = rectangleGeo([[51.1564,-5.1084],[41.1842,10.0195]])
```

```javascript
var rect1 = rectangleInt([[51.1564,-5.1084],[41.1842,10.0195]])
```

**Attention** : les données leaflet sont toujours en EPSG:3857 bien que l'affichage puisse utiliser un autre système de coordonnées. Il faut donc rentrer les coordonnées du rectangle projetées en Web-Mercator. 

# Démo

Vous pouvez trouver une demo du plugin sur cette [page](https://axelle-ga.github.io/Rectangle_interactif_leaflet/) où le même rectangle est affiché dans des projections différentes.

https://axelle-ga.github.io/Rectangle_interactif_leaflet/
