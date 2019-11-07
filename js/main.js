// **** Your JavaScript code goes here ****
// NOTE: this is the D3 v4 loading syntax. For more details, see https://piazza.com/class/jnzgy0ktwi34lk?cid=75.
// Variables
var svg = d3.select("svg")
    margin = 180,
    width = svg.attr('width') - (margin + 350),
    height = svg.attr('height') - margin;

var x = d3.scaleBand().range([0, width]).padding(0.3),
    y = d3.scaleLinear().range([height, 0]);

var g1 = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

var g2 = svg.append("g")
    .attr("transform", "translate(" + 480 + "," + 100 + ")");

// Load in graph 1 data from csv
d3.csv("./data/coffee_data.csv", function(data) {
    // Aggregate data into region & sales
    var databyRegion = d3.nest()
        .key(function(d) {return d.region;})
        .rollup(function(v) {return d3.sum(v, function(d) { return +d.sales;})})
        .entries(data);

    // Set x & y scale
    x.domain(databyRegion.map(function(d) {return d.key;}));
    y.domain([0, d3.max(databyRegion, function(d) {return +d.value;})]);

    // Draw axes
    g1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g1.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
        return (d / 1000) + "K";
        }).ticks(6))
        .append("text")
        .text("value");

    // Draw bars
    g1.selectAll(".bar")
        .data(databyRegion)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('x', function(d){return x(d.key)})
        .attr('y', function(d){return y(+d.value)})
        .attr('width', x.bandwidth())
        .attr('height', function(d){return height - y(+d.value);})
        .style("fill", function(d) {
            if (d.key == "Central") {
                return "#66c2a5"
            } else if (d.key == "East") {
                return "#fc8d62"
            } else if (d.key == "South") {
                return "#8da0cb"
            } else {
                return "#e78ac3"
            }
        });

    // Graph 1 title
    g1.append("text")
        .attr("class", "title")
        .attr("transform", "translate (4, -25)")
        .text("Coffee Sales by Region (USD)")

    // Region (x axis) label
    g1.append("text")
        .attr("class", "label")
        .attr("transform", "translate (95, 460)")
        .text("Region")

    // Sales (y axis) label
    g1.append("text")
        .attr("class", "label")
        .attr("dx", "-25em")
        .attr("dy", "-5.1em")
        .attr("transform", "rotate(-90)")
        .text("Coffee Sales (USD)");
});

//-------------------------------GRAPH 2--------------------------------------//

    // Load in graph 2 data from csv
    d3.csv("./data/coffee_data.csv", function(data) {
    // Aggregate data into category & sales
    var databyCategory = d3.nest()
        .key(function(d) {return d.category;})
        .rollup(function(v) {return d3.sum(v, function(d) { return +d.sales;})})
        .entries(data);

    // Set x & y scale
    x.domain(databyCategory.map(function(d) {return d.key;}));
    y.domain([0, d3.max(databyCategory, function(d) {return +d.value;}) + 50000]);

    // Draw axes
    g2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g2.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
        return (d / 1000) + "K";
        }).ticks(6))
        .append("text")
        .text("value");

    // Draw bars
    g2.selectAll(".bar")
        .data(databyCategory)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr('x', function(d){return x(d.key)})
        .attr('y', function(d){return y(+d.value)})
        .attr('width', x.bandwidth())
        .attr('height', function(d){return height - y(+d.value);})
        .style("fill", function(d) {
            if (d.key == "Coffee") {
                return "#e41a1c"
            } else if (d.key == "Tea") {
                return "#377eb8"
            } else if (d.key == "Espresso") {
                return "#4daf4a"
            } else {
                return "#984ea3"
            }
        });

    // Graph 2 title
    g2.append("text")
        .attr("class", "title")
        .attr("transform", "translate (4, -25)")
        .text("Coffee Sales by Product (USD)")

    // Category (x axis) label
    g2.append("text")
        .attr("class", "label")
        .attr("transform", "translate (95, 460)")
        .text("Product")

    // Sales (y axis) label
    g2.append("text")
        .attr("class", "label")
        .attr("dx", "-25em")
        .attr("dy", "-5.1em")
        .attr("transform", "rotate(-90)")
        .text("Coffee Sales (USD)");
});