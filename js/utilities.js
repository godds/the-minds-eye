var overviewChart = function(selector) {
    var data =
        [ { label: "What? Why?", time: 8, id: "set-the-scene" },
          { label: "Thinking, Fast and Slow", time: 10, id: "thinking-fast-and-slow" },
          { label: "The Visual Process", time: 12, id: "visual-process" },
          { label: "Perceiving Values", time: 8, id: "perceiving-values" },
          { label: "Chartjunk?", time: 5, id: "chartjunk-debate" }];

    var margin = { top: 58, right: 10, bottom: 30, left: 310 },
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