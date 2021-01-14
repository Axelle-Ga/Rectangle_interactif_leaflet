<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Rectangle interactif</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link rel="stylesheet" media="screen" href="css/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    <script src="https://cdn.jsdelivr.net/npm/leaflet.geodesic"
    integrity="sha512-5hu8xzx09aoq4eHRCNLXRAmwYNgsMzBSLj02kPAaD48G03otgNf7PIOJaHlchkK2kfTAMhO3oaTxX5HgniXb2g=="
    crossorigin=""></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.6.3/proj4.js"></script>
    <script src="lib/proj4leaflet.js"></script>
  </head>

  <body>
    <div id = map></div>
    <form id="position" action="POST">
    <div id="point1">
      <label>Latitude 1:<input id="lat1" type="text"></label>
      <label >Longitude 1:<input id="lng1" type="text"></label>
    </div>
    
    <div id="point2">
      <label>Latitude 2:<input id="lat2" type="text"></label>
      <label >Longitude 2:<input id="lng2" type="text"></label>
    </div>

    <div id="point3">
      <label>Latitude 3:<input id="lat3" type="text"></label>
      <label >Longitude 3:<input id="lng3" type="text"></label>
    </div>

    <div id="point4">
      <label>Latitude 4:<input id="lat4" type="text"></label>
      <label >Longitude 4:<input id="lng4" type="text"></label>
    </div>

    </form>
    <script type="text/javascript" src="js/rectangle.js"></script>
  </body>