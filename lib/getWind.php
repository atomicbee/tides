<?php
if (isset($_POST['stationId'])) {
    $stationId = ($_POST['stationId']);
}

$startDate = date("Ymd");
$endDate = date("Ymd", strtotime("+1 day"));


$arrContextOptions=array(
    "ssl"=>array(
        "cafile" => "",
        "verify_peer"=> true,
        "verify_peer_name"=> true,
    ),
);

$windData = file_get_contents(
      'https://tidesandcurrents.noaa.gov/api/datagetter?product=wind&begin_date=20180605&end_date=20180606&station='.$stationId.'&time_zone=lst_ldt&units=english&interval=6&format=json'
 );

$wind = json_decode($windData, true);

echo($windData);
