function getTemp(stationId) {


    d3.json('lib/getTemp.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId,
            function (error, data) {
                temp = data.data[0].v;
                console.log(temp);

                d3.selectAll("#tempId")
                    .data(temp)
                    .text(temp + " degrees F");
            });

}