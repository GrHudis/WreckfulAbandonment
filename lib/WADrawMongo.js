points = new Meteor.Collection('pointsCollection');
canvasSVGs = new Meteor.Collection('canvasCollection');

points.allow({
		insert: function (userId, doc) {
			return true;
		},	
		update: function (userId, doc, fieldnames, modifier) {
			return true;
		},
		remove: function (userId, doc) {
			return true;
		}		
});

canvasSVGs.allow({
		insert: function (userId, doc) {
			return true;
		},	
		update: function (userId, doc, fieldnames, modifier) {
			return true;
		},		
		remove: function (userId, doc) {
			return true;
		}		
});


Meteor.methods({
   'clearTitle': function (data) {
		 if (!this.userId) {
        	return null;
		}	
		
		var title = data.title;  
		points.remove({"t":title});
		 console.log(title + " points deleted");
  },
  'cloneCanvas': function(data) {
	 	 if (!this.userId) { 
				return null;
		}		
		
		var oldTitle = data.oldTitle; 
		var newTitle = data.newTitle; 
		
		var cursor  = points.find({"t":oldTitle})
		
		cursor.forEach(function(p) {
			points.insert({
					x:  p.x,
					y:  p.y,
					x1: p.x1,
					y1: p.y1,
					w:  p.w,
					r:  p.r,
					c:  p.c,
					s:  p.s,
					t: newTitle
			});
		});		
		 console.log(oldTitle + "points copied to " + newTitle);
  },
  	'canvasDel': function(data) {
		if (!Meteor.user()) {
			return null;
		}
		var title    = data.title;
		
		if (title != "public") {
			return canvasSVGs.remove( {title:title} );
		}		
	 },	
	'canvasIns': function(data) {
		if (!Meteor.user()) {
			return null;
		}	
		
		var title    = data.title;
 		var created  = new Date();		
		var exists   = canvasSVGs.findOne({title:title}); 
		if (!exists) {
			console.log("inserting into canvasSBGs for " + title);
			return canvasSVGs.insert( {title:title, createdBy:Meteor.user()._id, createdOn:created }); 
		} 
	 }		 
});