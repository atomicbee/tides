
var wt = 960;
var ht = 500;
var margin = {top: 20, right: 20, bottom: 40, left: 40};
var width = wt- margin.left - margin.right;
var height = ht- margin.top - margin.bottom;

var svg = d3.select("#graphId").append("svg")
    .attr("width", wt)
    .attr("height", ht);
g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m-%d %H:%M");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) {
        return x(d.time);
    })
    .y(function(d) {
        return y(d.value);
    });

g.append("rect")
    .attr("width", wt)
    .attr("height", ht)
    .attr("fill", "#fff")
    .attr("transform", "translate(" + -margin.left + "," + -margin.top + ")");


var getGraph = function(stationId, prediction) {
    //cleanup if needed
    d3.selectAll('.axis').remove();
    d3.selectAll('.line').remove();

    d3.json('lib/getTides.php')
        .header("Content-Type", "application/x-www-form-urlencoded")
        .post("stationId=" + stationId + "&prediction="+prediction,
    //d3.json("data/test.json", function(data) {
    function(error, data){
    console.log("vars are "+ stationId + prediction);

        data.predictions.forEach(function(d) {
            d.time = parseTime(d.t);
            d.value = +d.v;
            d.name = d.name;

        });

        x.domain(d3.extent(data.predictions, function(d) {
            return d.time;
        }));
        y.domain(d3.extent(data.predictions, function(d) {
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

        g.append("path")
            .datum(data.predictions)
            .attr("class", "line")
            .attr("d", line);

    });
};
