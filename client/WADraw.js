Meteor.subscribe('Meteor.users')
Meteor.subscribe('pointsCollection')

var canvas;

var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness   =1;
var strokeColor = "black";
var radius=1;
var shape = 1;
var canvasCleared = 0;

  Template.wall.onCreated(function() {
	this.autorun(function() {
		Session.set('title',  'public');
		
		var title = Session.get('title');
		
		var data  = points.find({}).fetch({"title":title});
	
        if (!canvas) {	
		 canvas = new Canvas();
		}
		
		if (canvas) {
			canvas.draw(data, shape);
		} 
			
	}) 		  
  }); 

  Template.wall.onRendered(function() {
	if (!canvasCleared) {
		canvas.clear();
		canvasCleared = 1;
	}	
	
	
	if (!this.$('#slideThickness').data('uiSlideThickness')) {
		$("#slideThickness").slider({ 
            min: 1,
            max: 25
        });
	}
	
	if (!this.$('#slideRadius').data('uiSlideRadius')) {
		$("#slideRadius").slider({ 
            min: 1,
            max: 25
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
	
  }); 
  
Template.wall.events({
  'submit .js-submit-form':function(event){
		// stop the form from triggering a page reload
		event.preventDefault();

		shape = event.target.rbShape.value;	
		var action    = event.target.rbTitle.value;	
		var oldTitle  = Session.get('title');
		var newTitle  = event.target.title.value;		

		if (oldTitle != newTitle) {	
			if (!Meteor.user()) {
				alert("Please log in, only public canvas is available to anonymous users!");
			} else {	
				Session.set('title',  event.target.title.value);
				console.log("Title has been set to " + Session.get('title'));

				if (action == "reload") {
					  canvas.clear();
					  	var title = Session.get('title');
						var data  = points.find({"t":title}).fetch();
							if (canvas) {
							  canvas.draw(data, shape);
							}
					  console.log("Canvas Loaded " + Session.get('title'));
				} else 				
				if (action == "new") {
					  canvas.clear();
					  console.log("Canvas cleared " + Session.get('title'));
				} else if (action == "clone") {
						Meteor.call('cloneCanvas', {oldTitle, newTitle}  , function (error, result) {
							if (error) alert('clearTitle Returned Error ' + error.error);
						});
						console.log("Canvas copied from " + oldTitle + " to " + Session.get('title'));
				}	
			}
		}
	},
	
  "click button.clear": function (event) {
	var title = Session.get('title');
  Meteor.call('clearTitle', { title: title }  , function (error, result) {
			if (error) alert('clearTitle Returned Error ' + error.error);
	});	
    canvas.clear();
  },
  
    "click button.delete": function (event) {
	Meteor.call('clearAll', {title:"ALL"}  , function (error, result) {
			if (error) alert('clearTitle Returned Error ' + error.error);
	});
      canvas.clear();

  },

  "click button.btnColor01": function () {
    lastX=0; lastY=0; strokeColor = "black";
  },
  "click button.btnColor02": function () {
    lastX=0; lastY=0; strokeColor = "blue";
  },
  "click button.btnColor03": function () {
    lastX=0; lastY=0; strokeColor = "cyan";
  },  
  "click button.btnColor04": function () {
    lastX=0; lastY=0; strokeColor = "darkgreen";
  }, 
  "click button.btnColor05": function () {
    lastX=0; lastY=0; strokeColor = "green";
  },  
  "click button.btnColor06": function () {
    lastX=0; lastY=0; strokeColor = "fuchsia";
  },
  "click button.btnColor07": function () {
    lastX=0; lastY=0; strokeColor = "violet";
  },  
  "click button.btnColor08": function () {
    lastX=0; lastY=0; strokeColor = "firebrick";
  },  
  "click button.btnColor09": function () {
    lastX=0; lastY=0; strokeColor = "red";
  },  
  "click button.btnColor10": function () {
    lastX=0; lastY=0; strokeColor = "orange";
  },  
  "click button.btnColor11": function () {
    lastX=0; lastY=0; strokeColor = "goldenrod";
  },  
  "click button.btnColor12": function () {
    lastX=0; lastY=0; strokeColor = "deeppink";
  },  
  "click button.btnColor13": function () {
    lastX=0; lastY=0; strokeColor = "olive";
  },  
  "click button.btnColor14": function () {
    lastX=0; lastY=0; strokeColor = "saddlebrown";
  },  
  "click button.btnColor15": function () {
    lastX=0; lastY=0; strokeColor = "slategrey";
  },  
  "click button.btnColor16": function () {
    lastX=0; lastY=0; strokeColor = "teal";
  },  
  "click button.btnColor17": function () {
    lastX=0; lastY=0; strokeColor = "white";
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
	c: strokeColor,
	s: shape,
	t: Session.get('title')
  }); // end of points.insert()

	lastX = (event.pageX - offset.left);
	lastY = (event.pageY - offset.top);
}

 Template.header.helpers({
    doctitle:function(){
      return Session.get("title");
  }
  })
  
  Template.wall.helpers({
    doctitle:function(){
      return Session.get("title");
  }
  })

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
