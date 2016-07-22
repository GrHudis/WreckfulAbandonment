Canvas = function () {
  var self = this;
  var svg;
  console.log("Entered Canvas");
  
  var createSvg = function() {
	  console.log("Entered Canvas createSvg");  
    svg = d3.select('#canvas').append('svg')
      .attr('width', 1600)
      .attr('height',600);
  };
  createSvg();

  self.clear = function() {
    d3.select('svg').remove();
    createSvg();
  };

  self.draw = function(data, shape) {
    if (data.length < 1) {
      self.clear();
      return;
    }
	
    if (svg) {
        if (shape == "circle") { 
           svg.selectAll('circle').data(data, function(d) { return d._id; })
         .enter().append('circle')
         .attr('r',    function (d) { return d.r; })
		 .attr("fill", function (d) { return d.c; })
         .attr('cx',   function (d) { return d.x; })
         .attr('cy',   function (d) { return d.y; });
		} else {
		  svg.selectAll('line').data(data, function(d) { return d._id; })
		  .enter().append('line')
		  .attr('x1', function (d) { return d.x; })
		  .attr('y1', function (d) { return d.y; })
		  .attr('x2', function (d) { return d.x1; })
		  .attr('y2', function (d) { return d.y1; })
		  .attr("stroke-width", function (d) { return d.w; })
		  .attr("stroke", function (d) { return d.c; })
		  .attr("stroke-linejoin", "round");
		} 
    } // end of the if(svg) statement
  }; // end of the canvas.draw function
  
} //end of the canvas function

