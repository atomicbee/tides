var base1 = L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ3NodXN0ZXJtYW4iLCJhIjoianF6b3FzWSJ9.D8-79Fb73kS6xXRN5h630g', {
    attribution: 'MapBox'
});

var base2 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

/* map groups*/
var baseMaps = {
    "mapbox terrain": base1,
    "osm": base2
};

var map = L.map('map').setView([-122.3818588256836, 37.92795083988293], 11).addLayer(base2);
/*map controls*/
L.control.layers(baseMaps).addTo(map);


var stations = [];

function onEachFeature(feature, layer) {
    var theStation = {};

    if (feature.properties && feature.properties.Name) {
        //add the station info to an array
        theStation.name = feature.properties.Name;
        theStation.id = feature.properties.id;
        theStation.prediction = feature.properties.predictions;


        stations.push(theStation);
        //layer.bindPopup("<iframe src='graph.html'></iframe>");
        layer.bindPopup(theStation.name);



    }
}


markerLayer = L.geoJson(stationData, {

    onEachFeature: onEachFeature,

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
}).addTo(map);

markerLayer.on("click", function (event) {
    var properties = event.layer.feature.properties;
    if (properties.predictions == "Harmonic") {
        clearTable();
        getGraph(properties.id, properties.predictions);
        getWindTable(properties.id);
        getTemp(properties.id);

    }
    // do some stuff…
});
/*map*/

map.fitBounds([
    [38.312568460056966, -121.94137573242186],
    [37.6631679243197, -122.85186767578125]
]);