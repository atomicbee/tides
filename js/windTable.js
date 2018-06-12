function getWindTable(station) {

    var rowHeight = 20;
    var columns = ["Speed", "Direction"];
    var sortKey = "Time",
        sortOrder = d3.descending;
    var formatNumber = d3.format(",.0f"),
        formatDate = d3.timeFormat("%m/%d/%Y %H:%M ");
    var x = d3.scaleLinear()
        .domain([0, 500000000])
        .range([0, 200]);
    var theData;
    var stationId = station;

    d3.json('lib/getWind.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId,
            function (error, data) {

                data.data.forEach(function (d) {
                    d.time = parseTime(d.t);
                    d.speed = +d.s;
                    d.direction = d.dr;
                    //console.log("data is " + d.time + " " + d.value + " " + d.direction);

                });

                data.data.sort(function (a, b) {
                    return b.time - a.time;
                });



                var timeRow = d3.select(".g-table-body-time")
                    .style("height", data.data.length * rowHeight + "px")
                    .selectAll(".g-table-row")
                    .data(data.data, function (d) {
                        return formatDate(d.time);
                    })
                    .enter().append("div")
                    .attr("class", "g-table-row removeable")
                    .style("top", function (d, i) {
                        return i * rowHeight + "px";
                    });

                var row = d3.selectAll(".g-table-body .g-table-row");

                row.append("div")
                    .attr("class", "g-table-cell g-table-cell-time")
                    .text(function (d) {
                        return formatDate(d.time);

                    });

                columns.forEach(function (c) {
                    row.append("div")
                        .attr("class", "g-table-cell g-table-cell-activity")
                        .append("div")
                        .data(data.data)
                        .datum(function (d) {
                            if (c === "Direction") {
                                return d.direction;
                            } else {

                                return formatNumber(d.speed);
                            }

                        })
                        .attr("class", "g-table-bar")
                        .append("div")
                        .attr("class", "g-table-label")
                        .text(function (d) {
                            return d;

                        });

                });

                var bar = row.selectAll(".g-table-bar")
                    .style("width", 0);

                row.transition()
                    .delay(function (d, i) {
                        return i * 8;
                    })
                    .selectAll(".g-table-bar")
                    .style("width", function (d) {
                        this.style.width = x(d) + "px";
                    });

                var columnLabel = d3.selectAll(".g-table-head .g-table-cell")
                    .datum(function () {
                        return this.getAttribute("data-key");
                    })
                    .on("click", clicked)
                    .select(".g-table-column-sort")
                    .classed("g-table-column-sort-" + (sortOrder === d3.descending ? "descending" : "ascending"), function (d) {
                        return d === sortKey;
                    });

                function clicked(key) {
                    d3.event.preventDefault();

                    columnLabel.classed("g-table-column-sort-" + (sortOrder === d3.descending ? "descending" : "ascending"), false);

                    if (sortKey === key) sortOrder = sortOrder === d3.descending ? d3.ascending : d3.descending;
                    else sortKey = key;

                    if (key === "Time") {
                        data.data.sort(function (a, b) {
                            return sortOrder(a.time, b.time);
                        }).forEach(function (d, i) {
                            d.index = i;
                        });

                    }

                    columnLabel.classed("g-table-column-sort-" + (sortOrder === d3.descending ? "descending" : "ascending"), function (d) {
                        //console.log(" d is " + d);
                        return d === key;
                    });

                    timeRow.transition()
                        .delay(function (d) {
                            return d.index * 8;
                        })
                        .style("top", function (d) {
                            return this.style.top = d.index * rowHeight + "px";
                        });


                }

            });


}


function clearTable() {
    d3.select(".g-table-body-time").text("");
}