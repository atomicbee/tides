<?php
if (isset($_POST['stationId'])) {
    $stationId = ($_POST['stationId']);
}


$arrContextOptions=array(
    "ssl"=>array(
        "cafile" => "",
        "verify_peer"=> true,
        "verify_peer_name"=> true,
    ),
);

$tempData = file_get_contents(
     'https://tidesandcurrents.noaa.gov/api/datagetter?product=air_temperature&date=latest&range=24&station='.$stationId.'&time_zone=lst_ldt&units=english&interval=6&format=json'
 );

$temp = json_decode($tempData, true);

echo($tempData);
