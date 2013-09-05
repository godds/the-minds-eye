var overviewChart = function(selector, sortFunction) {
    var data =
        [ //{ label: "First, a story...", time: 5, id: "a-story" },
          { label: "Thinking, Fast and Slow", time: 4, id: "thinking-fast-and-slow" },
          { label: "Why Visualisation?", time: 2, id: "why-visualisation" },
          { label: "How We See", time: 10, id: "visual-process" },
          { label: "Perceiving Values", time: 8, id: "perceiving-values" },
          { label: "Perceiving Relationships", time: 7, id: "perceiving-relationships" } ];

    if (sortFunction) {
        data.sort(sortFunction);
    }

    var margin = { top: 58, right: 10, bottom: 30, left: 330 },
        width = 860 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.time;})])
        .range([0, width]);
    var y = d3.scale.ordinal()
        .domain(data.map(function(d) { return d.label; }))
        .rangeRoundBands([0, height], .2);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top")
        .ticks(5);
    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", function(d) { return "bar " + d.id; })
        .attr("y", function(d) { return y(d.label); })
        .attr("width", function(d) { return x(d.time); })
        .attr("height", y.rangeBand());
    svg.append("g")
        .attr("class", "axis")
        .call(xAxis);
    svg.selectAll(".yAxisLabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", function(d) { return "yAxisLabel " + d.id; })
        .attr("text-anchor", "end")
        .attr("x", -10)
        .attr("y", function(d) { return y(d.label) + (y.rangeBand() / 2) + 10; })
        .text(function(d) { return d.label; });
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "axis-title")
        .attr("x", width / 2)
        .attr("y", -40)
        .text("minutes");
};

var barChart = function(selector) {
    var data = [ 8, 10, 12, 8, 5, 2 ];

    var margin = { top: 10, right: 10, bottom: 30, left: 30 },
        width = 640 - margin.left - margin.right,
        height = 490 - margin.top - margin.bottom;
    var x = d3.scale.ordinal()
        .domain(data)
        .rangeRoundBands([0, width], .2);
    var y = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([height, 0]);
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });
    svg.append("g")
        .attr("class", "axis")
        .call(yAxis);
};

var pieChart = function(selector) {
    var data = [ 8, 10, 7, 5, 2 ];

    var width = 600,
        height = 500,
        radius = Math.min(width, height) / 2;

    var colour = d3.scale.ordinal()
        .range(["#3585a0", "#ffcb4e", "#ff694e", "#ba399d", "#39bb65"])
        .domain(data);
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
    var pie = d3.layout.pie()
        .sort(null);

    var svg = d3.select(selector).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return colour(d.data); });
};

var scatterChart = function(selector) {

    var data =
        [
            { "sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.9, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.6, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.7, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 4.6, "sepalWidth": 3.4, "petalLength": 1.4, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.4, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.4, "sepalWidth": 2.9, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.9, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.1, "species": "setosa" },
            { "sepalLength": 5.4, "sepalWidth": 3.7, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.8, "sepalWidth": 3.4, "petalLength": 1.6, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.8, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.1, "species": "setosa" },
            { "sepalLength": 4.3, "sepalWidth": 3.0, "petalLength": 1.1, "petalWidth": 0.1, "species": "setosa" },
            { "sepalLength": 5.8, "sepalWidth": 4.0, "petalLength": 1.2, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.7, "sepalWidth": 4.4, "petalLength": 1.5, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 5.4, "sepalWidth": 3.9, "petalLength": 1.3, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.5, "petalLength": 1.4, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 5.7, "sepalWidth": 3.8, "petalLength": 1.7, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.8, "petalLength": 1.5, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 5.4, "sepalWidth": 3.4, "petalLength": 1.7, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.7, "petalLength": 1.5, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 4.6, "sepalWidth": 3.6, "petalLength": 1.0, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.3, "petalLength": 1.7, "petalWidth": 0.5, "species": "setosa" },
            { "sepalLength": 4.8, "sepalWidth": 3.4, "petalLength": 1.9, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.0, "petalLength": 1.6, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.4, "petalLength": 1.6, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 5.2, "sepalWidth": 3.5, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.2, "sepalWidth": 3.4, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.7, "sepalWidth": 3.2, "petalLength": 1.6, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.8, "sepalWidth": 3.1, "petalLength": 1.6, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.4, "sepalWidth": 3.4, "petalLength": 1.5, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 5.2, "sepalWidth": 4.1, "petalLength": 1.5, "petalWidth": 0.1, "species": "setosa" },
            { "sepalLength": 5.5, "sepalWidth": 4.2, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.9, "sepalWidth": 3.1, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.2, "petalLength": 1.2, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.5, "sepalWidth": 3.5, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.9, "sepalWidth": 3.6, "petalLength": 1.4, "petalWidth": 0.1, "species": "setosa" },
            { "sepalLength": 4.4, "sepalWidth": 3.0, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.4, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.5, "petalLength": 1.3, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 4.5, "sepalWidth": 2.3, "petalLength": 1.3, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 4.4, "sepalWidth": 3.2, "petalLength": 1.3, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.5, "petalLength": 1.6, "petalWidth": 0.6, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.8, "petalLength": 1.9, "petalWidth": 0.4, "species": "setosa" },
            { "sepalLength": 4.8, "sepalWidth": 3.0, "petalLength": 1.4, "petalWidth": 0.3, "species": "setosa" },
            { "sepalLength": 5.1, "sepalWidth": 3.8, "petalLength": 1.6, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 4.6, "sepalWidth": 3.2, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.3, "sepalWidth": 3.7, "petalLength": 1.5, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 5.0, "sepalWidth": 3.3, "petalLength": 1.4, "petalWidth": 0.2, "species": "setosa" },
            { "sepalLength": 7.0, "sepalWidth": 3.2, "petalLength": 4.7, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 6.4, "sepalWidth": 3.2, "petalLength": 4.5, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 6.9, "sepalWidth": 3.1, "petalLength": 4.9, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 5.5, "sepalWidth": 2.3, "petalLength": 4.0, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.5, "sepalWidth": 2.8, "petalLength": 4.6, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 5.7, "sepalWidth": 2.8, "petalLength": 4.5, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.3, "sepalWidth": 3.3, "petalLength": 4.7, "petalWidth": 1.6, "species": "versicolor" },
            { "sepalLength": 4.9, "sepalWidth": 2.4, "petalLength": 3.3, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 6.6, "sepalWidth": 2.9, "petalLength": 4.6, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.2, "sepalWidth": 2.7, "petalLength": 3.9, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 5.0, "sepalWidth": 2.0, "petalLength": 3.5, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 5.9, "sepalWidth": 3.0, "petalLength": 4.2, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 6.0, "sepalWidth": 2.2, "petalLength": 4.0, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 6.1, "sepalWidth": 2.9, "petalLength": 4.7, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 5.6, "sepalWidth": 2.9, "petalLength": 3.6, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.7, "sepalWidth": 3.1, "petalLength": 4.4, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 5.6, "sepalWidth": 3.0, "petalLength": 4.5, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 5.8, "sepalWidth": 2.7, "petalLength": 4.1, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 6.2, "sepalWidth": 2.2, "petalLength": 4.5, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 5.6, "sepalWidth": 2.5, "petalLength": 3.9, "petalWidth": 1.1, "species": "versicolor" },
            { "sepalLength": 5.9, "sepalWidth": 3.2, "petalLength": 4.8, "petalWidth": 1.8, "species": "versicolor" },
            { "sepalLength": 6.1, "sepalWidth": 2.8, "petalLength": 4.0, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.3, "sepalWidth": 2.5, "petalLength": 4.9, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 6.1, "sepalWidth": 2.8, "petalLength": 4.7, "petalWidth": 1.2, "species": "versicolor" },
            { "sepalLength": 6.4, "sepalWidth": 2.9, "petalLength": 4.3, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.6, "sepalWidth": 3.0, "petalLength": 4.4, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 6.8, "sepalWidth": 2.8, "petalLength": 4.8, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 6.7, "sepalWidth": 3.0, "petalLength": 5.0, "petalWidth": 1.7, "species": "versicolor" },
            { "sepalLength": 6.0, "sepalWidth": 2.9, "petalLength": 4.5, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 5.7, "sepalWidth": 2.6, "petalLength": 3.5, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 5.5, "sepalWidth": 2.4, "petalLength": 3.8, "petalWidth": 1.1, "species": "versicolor" },
            { "sepalLength": 5.5, "sepalWidth": 2.4, "petalLength": 3.7, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 5.8, "sepalWidth": 2.7, "petalLength": 3.9, "petalWidth": 1.2, "species": "versicolor" },
            { "sepalLength": 6.0, "sepalWidth": 2.7, "petalLength": 5.1, "petalWidth": 1.6, "species": "versicolor" },
            { "sepalLength": 5.4, "sepalWidth": 3.0, "petalLength": 4.5, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 6.0, "sepalWidth": 3.4, "petalLength": 4.5, "petalWidth": 1.6, "species": "versicolor" },
            { "sepalLength": 6.7, "sepalWidth": 3.1, "petalLength": 4.7, "petalWidth": 1.5, "species": "versicolor" },
            { "sepalLength": 6.3, "sepalWidth": 2.3, "petalLength": 4.4, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.6, "sepalWidth": 3.0, "petalLength": 4.1, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.5, "sepalWidth": 2.5, "petalLength": 4.0, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.5, "sepalWidth": 2.6, "petalLength": 4.4, "petalWidth": 1.2, "species": "versicolor" },
            { "sepalLength": 6.1, "sepalWidth": 3.0, "petalLength": 4.6, "petalWidth": 1.4, "species": "versicolor" },
            { "sepalLength": 5.8, "sepalWidth": 2.6, "petalLength": 4.0, "petalWidth": 1.2, "species": "versicolor" },
            { "sepalLength": 5.0, "sepalWidth": 2.3, "petalLength": 3.3, "petalWidth": 1.0, "species": "versicolor" },
            { "sepalLength": 5.6, "sepalWidth": 2.7, "petalLength": 4.2, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.7, "sepalWidth": 3.0, "petalLength": 4.2, "petalWidth": 1.2, "species": "versicolor" },
            { "sepalLength": 5.7, "sepalWidth": 2.9, "petalLength": 4.2, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.2, "sepalWidth": 2.9, "petalLength": 4.3, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 5.1, "sepalWidth": 2.5, "petalLength": 3.0, "petalWidth": 1.1, "species": "versicolor" },
            { "sepalLength": 5.7, "sepalWidth": 2.8, "petalLength": 4.1, "petalWidth": 1.3, "species": "versicolor" },
            { "sepalLength": 6.3, "sepalWidth": 3.3, "petalLength": 6.0, "petalWidth": 2.5, "species": "verginica" },
            { "sepalLength": 5.8, "sepalWidth": 2.7, "petalLength": 5.1, "petalWidth": 1.9, "species": "verginica" },
            { "sepalLength": 7.1, "sepalWidth": 3.0, "petalLength": 5.9, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 6.3, "sepalWidth": 2.9, "petalLength": 5.6, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.5, "sepalWidth": 3.0, "petalLength": 5.8, "petalWidth": 2.2, "species": "verginica" },
            { "sepalLength": 7.6, "sepalWidth": 3.0, "petalLength": 6.6, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 4.9, "sepalWidth": 2.5, "petalLength": 4.5, "petalWidth": 1.7, "species": "verginica" },
            { "sepalLength": 7.3, "sepalWidth": 2.9, "petalLength": 6.3, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.7, "sepalWidth": 2.5, "petalLength": 5.8, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 7.2, "sepalWidth": 3.6, "petalLength": 6.1, "petalWidth": 2.5, "species": "verginica" },
            { "sepalLength": 6.5, "sepalWidth": 3.2, "petalLength": 5.1, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 6.4, "sepalWidth": 2.7, "petalLength": 5.3, "petalWidth": 1.9, "species": "verginica" },
            { "sepalLength": 6.8, "sepalWidth": 3.0, "petalLength": 5.5, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 5.7, "sepalWidth": 2.5, "petalLength": 5.0, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 5.8, "sepalWidth": 2.8, "petalLength": 5.1, "petalWidth": 2.4, "species": "verginica" },
            { "sepalLength": 6.4, "sepalWidth": 3.2, "petalLength": 5.3, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 6.5, "sepalWidth": 3.0, "petalLength": 5.5, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 7.7, "sepalWidth": 3.8, "petalLength": 6.7, "petalWidth": 2.2, "species": "verginica" },
            { "sepalLength": 7.7, "sepalWidth": 2.6, "petalLength": 6.9, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 6.0, "sepalWidth": 2.2, "petalLength": 5.0, "petalWidth": 1.5, "species": "verginica" },
            { "sepalLength": 6.9, "sepalWidth": 3.2, "petalLength": 5.7, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 5.6, "sepalWidth": 2.8, "petalLength": 4.9, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 7.7, "sepalWidth": 2.8, "petalLength": 6.7, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 6.3, "sepalWidth": 2.7, "petalLength": 4.9, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.7, "sepalWidth": 3.3, "petalLength": 5.7, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 7.2, "sepalWidth": 3.2, "petalLength": 6.0, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.2, "sepalWidth": 2.8, "petalLength": 4.8, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.1, "sepalWidth": 3.0, "petalLength": 4.9, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.4, "sepalWidth": 2.8, "petalLength": 5.6, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 7.2, "sepalWidth": 3.0, "petalLength": 5.8, "petalWidth": 1.6, "species": "verginica" },
            { "sepalLength": 7.4, "sepalWidth": 2.8, "petalLength": 6.1, "petalWidth": 1.9, "species": "verginica" },
            { "sepalLength": 7.9, "sepalWidth": 3.8, "petalLength": 6.4, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 6.4, "sepalWidth": 2.8, "petalLength": 5.6, "petalWidth": 2.2, "species": "verginica" },
            { "sepalLength": 6.3, "sepalWidth": 2.8, "petalLength": 5.1, "petalWidth": 1.5, "species": "verginica" },
            { "sepalLength": 6.1, "sepalWidth": 2.6, "petalLength": 5.6, "petalWidth": 1.4, "species": "verginica" },
            { "sepalLength": 7.7, "sepalWidth": 3.0, "petalLength": 6.1, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 6.3, "sepalWidth": 3.4, "petalLength": 5.6, "petalWidth": 2.4, "species": "verginica" },
            { "sepalLength": 6.4, "sepalWidth": 3.1, "petalLength": 5.5, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.0, "sepalWidth": 3.0, "petalLength": 4.8, "petalWidth": 1.8, "species": "verginica" },
            { "sepalLength": 6.9, "sepalWidth": 3.1, "petalLength": 5.4, "petalWidth": 2.1, "species": "verginica" },
            { "sepalLength": 6.7, "sepalWidth": 3.1, "petalLength": 5.6, "petalWidth": 2.4, "species": "verginica" },
            { "sepalLength": 6.9, "sepalWidth": 3.1, "petalLength": 5.1, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 5.8, "sepalWidth": 2.7, "petalLength": 5.1, "petalWidth": 1.9, "species": "verginica" },
            { "sepalLength": 6.8, "sepalWidth": 3.2, "petalLength": 5.9, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 6.7, "sepalWidth": 3.3, "petalLength": 5.7, "petalWidth": 2.5, "species": "verginica" },
            { "sepalLength": 6.7, "sepalWidth": 3.0, "petalLength": 5.2, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 6.3, "sepalWidth": 2.5, "petalLength": 5.0, "petalWidth": 1.9, "species": "verginica" },
            { "sepalLength": 6.5, "sepalWidth": 3.0, "petalLength": 5.2, "petalWidth": 2.0, "species": "verginica" },
            { "sepalLength": 6.2, "sepalWidth": 3.4, "petalLength": 5.4, "petalWidth": 2.3, "species": "verginica" },
            { "sepalLength": 5.9, "sepalWidth": 3.0, "petalLength": 5.1, "petalWidth": 1.8, "species": "verginica" }
        ];

    var margin = { top: 10, right: 10, bottom: 30, left: 30 },
        width = 550 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice()
        .range([0, width]);
    var y = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.sepalLength; })).nice()
        .range([height, 0]);
    var color = d3.scale.category10();
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(selector).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.sepalWidth); })
        .attr("cy", function(d) { return y(d.sepalLength); })
        .style("fill", function(d) { return color(d.species); });
};
