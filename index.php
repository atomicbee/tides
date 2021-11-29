
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tides</title>
  <meta name="author" content="gemma">


</head>

 <link rel="stylesheet" href="leaflet/leaflet.css" />
 <link rel="stylesheet" href="css/style.css" />
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

 <script src="leaflet/leaflet.js"></script>
 <script src="https://code.jquery.com/jquery-1.11.0.min.js"></script>
 <script src='https://d3js.org/d3.v4.min.js'></script>

 <body>
     <h1>Tide Predictions</h1>
     <div class="container-fluid">

       <div class="container">
         <p>Select a station on the map to view the available data.</p>
         <p> <a href="#tempId">Temperature</a> | <a href="#graphId">Tides</a> | <a href="#windTable">Wind</a></p>
 <div id="map"> <script src="js/stations.js"></script>
  <script src="js/map.js"></script></div>

 <div class='temp' id='tempId'></script><script src='js/temp.js'></script></div>

 <div class='graph' id='graphId'> <script src='js/graph.js'></script></div>

 <div id='windTable' class='g-graphic'> <script src='./js/windTable.js'></script> <div class='g-table'>
     <div class='g-table-head'>
         <div class='g-table-caption'>Wind speed and direction over the last 48 Hours (if available)</div>
         <div class='g-table-row'>

         <div data-key='Time' class='g-table-cell g-table-cell-time'>
             <div class='g-table-column-sort' >Time</div>
         </div>

         <div data-key='Direction' class='g-table-cell'>
             <div class='g-table-column-sort'>Speed</div>
         </div>

         <div data-key='Speed' class='g-table-cell'>
             <div class='g-table-column-sort'>Direction</div>
     </div>
 </div>
</div>
 <div class='g-table-body g-table-body-time'></div>
 </div>
</div>

</div>

</div>

 </body>




</html>
