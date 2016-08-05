Meteor.subscribe('pointsCollection')
Meteor.subscribe('canvasCollection')

var canvas;

var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness   =1;
var strokeColor = "black";
var radius=1;
var height=1;
var shape = 1;

Template.wall.onRendered( function() {
	console.log("Wall rendered");

    if (!canvas) {	
		console.log("Creating fresh canvas");
		canvas = new Canvas(); 
	} else {
		console.log("Found canvas");
	}

	canvas.clear();		
	
	Deps.autorun( function() {
		var title = Session.get('title');
		var data    = points.find( {"t":title} ).fetch();
		
		if (canvas) {
		  canvas.draw(data, shape);
		}
	});
	
	if (!this.$('#slideThickness').data('uiSlideThickness')) {
		$("#slideThickness").slider({ 
            min: 1,
            max: 10
        });
	}
	
	if (!this.$('#slideRadius').data('uiSlideRadius')) {
		$("#slideRadius").slider({ 
            min: 1,
            max: 50
        });
	}
	
	if (!this.$('#slideHeight').data('uiSlideHeight')) {
		$("#slideHeight").slider({ 
            min: 1,
            max: 50
        });
	}	
		
	if (!this.$('#slideThickness').data('uiSlideThickness')) {
        $("#slideThickness").slider({
			change: function() {
				thickness = $(this).slider('value');
			}
		 });
    }	
	
	if (!this.$('#slideRadius').data('uiSlideRadius')) {
        $("#slideRadius").slider({
			change: function() {
				radius = $(this).slider('value');
			}
		 });
    }		
	
	if (!this.$('#slideHeight').data('uiSlideHeight')) {
        $("#slideHeight").slider({
			change: function() {
				height = $(this).slider('value');
			}
		 });
    }		
	
  }); // end of onRendered
  
Template.wall.events({
  'submit .js-brushes-form':function(event){
		// stop the form from triggering a page reload
		event.preventDefault();
		
		shape = event.target.rbShape.value;	
		console.log("Shape set to " + shape);
  },
	
  "click button.clear": function (event) {
	  	if (!Meteor.user()) {
			alert("Please Log On");
		} else {		
			var title = Session.get('title');
			Meteor.call('clearTitle', { title: title }  , function (error, result) {
				if (error) alert('clearTitle Returned Error ' + error.error);
			});	
			canvas.clear();
		}
  },
  
   "click button.btnColor01": function () {
    lastX=0; lastY=0; strokeColor = "black";
  },
   "click button.btnColor02": function () {
    lastX=0; lastY=0; strokeColor = "darkblue";
  }, 
  "click button.btnColor03": function () {
    lastX=0; lastY=0; strokeColor = "darslateblue";
  },  
  "click button.btnColor04": function () {
    lastX=0; lastY=0; strokeColor = "blue";
  },
   "click button.btnColor05": function () {
    lastX=0; lastY=0; strokeColor = "powderblue";
  },
    "click button.btnColor06": function () {
    lastX=0; lastY=0; strokeColor = "cadetblue";
  },
   "click button.btnColor17": function () {
    lastX=0; lastY=0; strokeColor = "teal";
  }, 
  "click button.btnColor08": function () {
    lastX=0; lastY=0; strokeColor = "cyan";
  },  
  "click button.btnColor09": function () {
    lastX=0; lastY=0; strokeColor = "darkgreen";
  }, 
  "click button.btnColor10": function () {
    lastX=0; lastY=0; strokeColor = "green";
  },  
   "click button.btnColor11": function () {
    lastX=0; lastY=0; strokeColor = "darkviolet";
  },  
  "click button.btnColor12": function () {
    lastX=0; lastY=0; strokeColor = "violet";
  },  
  "click button.btnColor13": function () {
    lastX=0; lastY=0; strokeColor = "firebrick";
  },  
  "click button.btnColor14": function () {
    lastX=0; lastY=0; strokeColor = "red";
  },  
  "click button.btnColor15": function () {
    lastX=0; lastY=0; strokeColor = "deeppink";
  },  
    "click button.btnColor16": function () {
    lastX=0; lastY=0; strokeColor = "fuchsia";
  },  
  "click button.btnColor17": function () {
    lastX=0; lastY=0; strokeColor = "orange";
  },  
  "click button.btnColor18": function () {
    lastX=0; lastY=0; strokeColor = "goldenrod";
  },  
 "click button.btnColor19": function () {
    lastX=0; lastY=0; strokeColor = "olive";
  },  
  "click button.btnColor20": function () {
    lastX=0; lastY=0; strokeColor = "saddlebrown";
  },  
  "click button.btnColor21": function () {
    lastX=0; lastY=0; strokeColor = "slategrey";
  }, 	
  "click button.btnColor22": function () {
    lastX=0; lastY=0; strokeColor = "springgreen";
  },  
  
    "click button.btnColor23": function () {
    lastX=0; lastY=0; strokeColor = "greenyellow";
  }, 
    "click button.btnColor24": function () {
    lastX=0; lastY=0; strokeColor = "yellow";
  },  

});  

var markPoint = function() {
  var offset = $('#canvas').offset();
  if (lastX==0) {// check that x was something not top-left. should probably set this to -1
	lastX = (event.pageX - offset.left);
	lastY = (event.pageY - offset.top);
  }
  points.insert({

	x: (event.pageX - offset.left),
	y: (event.pageY - offset.top),
	x1: lastX,
	y1: lastY,
	w: thickness,
	r: radius,
	h: height,
	c: strokeColor,
	s: shape,
	t: Session.get('title')
  }); // end of points.insert()

	lastX = (event.pageX - offset.left);
	lastY = (event.pageY - offset.top);
}


Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
	lastX=0;
    lasyY=0;
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});

  
  Template.wall.helpers({
    doctitle:function(){
      return Session.get("title");
    },
	canvasSVGs:function(){
		return canvasSVGs.find({});
	}	
});