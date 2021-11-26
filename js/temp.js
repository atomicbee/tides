function getTemp(stationId) {


    d3.json('lib/getTemp.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId,
            function (error, data) {
                if(!data.error){
                    temp = data.data[0].v;
                } else {
                    temp = "no data";
                }


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
                        } else if (temp > 75){
                            style = "warm";
                        }else if (temp === "no data"){
                            style = "note";
                        }
                        return style;
                    })
                    .text(function(){
                     if(temp !== "no data"){
                        return (temp + " degrees F");
                     }else{
                         return "no temperature sensor at this location";
                     }});
            });

}
