Canvas = function () {
	var self = this;
	var svg;
	console.log("Entered Canvas");
  
	var createSvg = function() {
		svg = d3.select('#canvas').append('svg')
		  .attr('width', 1600)
		  .attr('height',600);
		console.log("SVG created");  
	};

	self.clear = function() {
		d3.select('svg').remove();
		console.log("SVG removed");
		createSvg();
	};
  
    self.draw = function(data, shape) {
		if ( (svg) && (data.length > 1) ){
			if (shape == "ellipse") { 
			   svg.selectAll('ellipse').data(data, function(d) { return d._id; })
			 .enter().append('ellipse')
			 .attr('rx',     function (d) { return d.r; })
			 .attr('ry',     function (d) { return d.h; })			 
			 .attr("fill",   function (d) { return d.c; })
			 .attr('cx',     function (d) { return d.x; })
			 .attr('cy',     function (d) { return d.y; });
			} else			
			if (shape == "rectangle") { 
			   svg.selectAll('rect').data(data, function(d) { return d._id; })
			 .enter().append('rect')
			 .attr('width',  function (d) { return d.r; })
			 .attr('height', function (d) { return d.h; })			 
			 .attr("fill",   function (d) { return d.c; })
			 .attr('x',      function (d) { return d.x; })
			 .attr('y',      function (d) { return d.y; });
			} else if (shape == "circle") { 
			   svg.selectAll('circle').data(data, function(d) { return d._id; })
			 .enter().append('circle')
			 .attr('r',      function (d) { return d.r; })
			 .attr("fill",   function (d) { return d.c; })
			 .attr('cx',     function (d) { return d.x; })
			 .attr('cy',     function (d) { return d.y; });
			} else {
			  svg.selectAll('line').data(data, function(d) { return d._id; })
			  .enter().append('line')
			  .attr('x1',              function (d) { return d.x; })
			  .attr('y1',              function (d) { return d.y; })
			  .attr('x2',              function (d) { return d.x1; })
			  .attr('y2',              function (d) { return d.y1; })
			  .attr("stroke-width",    function (d) { return d.w; })
			  .attr("stroke",          function (d) { return d.c; })
			  .attr("stroke-linejoin", "round");
			} 
		} // end of the if(svg) statement
		
		
		return;
  }; // end of the canvas.draw function
  
} //end of the canvas function