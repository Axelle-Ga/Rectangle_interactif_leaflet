<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Rectangle interactif</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" media="screen" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>

    <script data-key="choisirgeoportail" src="../../lib/GpPluginLeaflet-2.1.7/GpPluginLeaflet.js"></script>
    <link data-key="choisirgeoportail" rel="stylesheet" href="../../lib/GpPluginLeaflet-2.1.7/GpPluginLeaflet.css" />
    
  </head>

  <body>
    <div id="titre">
      <h1>Rectangle géodésique intéractif</h1>
    </div>

    <div id = carte1>
      Systeme de coordonnées de référence : <span id = "scr1"></span>
      <div id = map1></div>
    </div>

    <div id = carte2>
      Systeme de coordonnées de référence : <span id = "scr2"></span>
      <div id = map2></div>
    </div>
    
    <div id = carte3>
      Systeme de coordonnées de référence : <span id = "scr3"></span>
      <div id = map3></div>
    </div>
    
    <div id = carte4>
      Systeme de coordonnées de référence : <span id = "scr4"></span>
      <div id = map4></div>
    </div>
    
    <script src="../../src/rectangleGeo.js"></script>
    <script src="../../src/rectangleGeoInt.js"></script>
    <script type="text/javascript" src="carte.js"></script>
  </body>