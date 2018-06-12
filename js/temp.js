function getTemp(stationId) {


    d3.json('lib/getTemp.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId,
            function (error, data) {
                temp = data.data[0].v;
                console.log(temp);

                d3.selectAll("#tempId")
                    .data(temp)
                    .attr("class", function () {
                        var style;
                        if (temp < 55) {
                            style = "vcold";
                        } else if ((temp > 55) && (temp < 60)) {
                            style = "cold";
                        } else if ((temp > 60) && (temp < 75)) {
                            style = "moderate";
                        } else {
                            style = "warm";
                        }
                        return style;
                    })
                    .text(temp + " degrees F");
            });

}