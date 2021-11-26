var wt = 700;
var ht = 460;
var margin = {
    top: 80,
    right: 120,
    bottom: 60,
    left: 40
};
var width = wt - margin.left - margin.right;
var height = ht - margin.top - margin.bottom;

var svg = d3.select("#graphId").append("svg")
    .attr("width", wt)
    .attr("height", ht);
g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d %H:%M");
var shortTime = d3.timeFormat("%H:%M");

var bisectDate = d3.bisector(function (d) {
    return d.time;
}).left;


var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function (d) {
        return x(d.time);
    })
    .y(function (d) {
        return y(d.value);
    });

g.append("rect")
    .attr("width", wt)
    .attr("height", ht)
    .attr("fill", "#fff");
//    .attr("transform", "translate(" + -margin.left + "," + -margin.top + ")");


var getGraph = function (stationId, prediction) {
    //cleanup if needed
    d3.selectAll('.axis').remove();
    d3.selectAll('.line').remove();

    d3.json('lib/getTides.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId + "&prediction=" + prediction,
            function (error, data) {

                data.predictions.forEach(function (d) {
                    d.time = parseTime(d.t);
                    d.value = +d.v;
                    d.name = d.name;

                });

                x.domain(d3.extent(data.predictions, function (d) {
                    return d.time;
                }));
                y.domain(d3.extent(data.predictions, function (d) {
                    return d.value;
                }));

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + (height) + ")")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .attr("class", "axis axis--y")
                    .call(d3.axisLeft(y))
                    .append("text")
                    .attr("fill", "#000")
                    //.attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.8em")
                    .style("text-anchor", "end")
                    .text("feet");

                var focus = g.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                focus.append('line')
                    .classed('x', true);

                focus.append('line')
                    .classed('y', true);


                focus.append("circle")
                    .attr("r", 7.5);

                focus.append("text")
                    .attr("x", 15)
                    .attr("dy", ".31em");

                g.append("path")
                    .datum(data.predictions)
                    .attr("class", "line")
                    .attr("d", line);

                g.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height)
                    .on("mouseover", function () {
                        focus.style("display", null);
                    })
                    .on("mouseout", function () {
                        focus.style("display", "none");
                    })
                    .on("mousemove", mousemove);


                function mousemove() {
                    var x0 = x.invert(d3.mouse(this)[0]),
                        i = bisectDate(data.predictions, x0, 1),
                        d0 = data.predictions[i - 1],
                        d1 = data.predictions[i],
                        d = x0 - d0.time > d1.time - x0 ? d1 : d0;
                    focus.attr("transform", "translate(" + x(d.time) + "," + y(d.value) + ")");

                    focus.select('line.x')
                        .attr('x1', 0)
                        .attr('x2', -x(d.time))
                        .attr('y1', 0)
                        .attr('y2', 0);

                    focus.select('line.y')
                        .attr('x1', 0)
                        .attr('x2', 0)
                        .attr('y1', 0)
                        .attr('y2', height - y(d.value));

                    focus.select("text").text(d.value.toFixed(1) + " feet at " + shortTime(d.time));
                }



            });
};