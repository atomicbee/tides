<?php
if (isset($_POST['stationId'])) {
    $stationId = ($_POST['stationId']);
}
if (isset($_POST['prediction'])) {
    $prediction = ($_POST['prediction']);
}

if ($prediction == "Harmomic") {
    $datum = "mtl";
    getTideData($prediction, $datum);
} else {
    $datum = "mllw";
}

$arrContextOptions=array(
    "ssl"=>array(
        "cafile" => "",
        "verify_peer"=> true,
        "verify_peer_name"=> true,
    ),
);

//$tideData = file_get_contents('https://tidesandcurrents.noaa.gov/api/datagetter?range=24&station='.$stationId.'&product=predictions&datum='.$datum.'&units=metric&time_zone=lst&format=json', false, stream_context_create($arrContextOptions));
$tideData = file_get_contents('https://tidesandcurrents.noaa.gov/api/datagetter?range=24&station='.$stationId.'&product=predictions&datum='.$datum.'&units=english&time_zone=lst&format=json');
$tides = json_decode($tideData, true);

echo($tideData);
