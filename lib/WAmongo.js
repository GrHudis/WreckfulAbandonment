points = new Meteor.Collection('pointsCollection');

Meteor.methods({
  'clearAll': function (data) {
		 if (!this.userId) {
				return null;
		}		  
		
		var title = data.title;  
		if (title!= "ALL") {
				throw new Meteor.Error("Safety flag missing for clear all !");
		}
			
		points.remove({});
		console.log("All points deleted");
  },
   'clearTitle': function (data) {
		 if (!this.userId) {
				return null;
		}		  
		var title = data.title;  
		points.remove({"t":title});
		 console.log(title + "points deleted");
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
  }	
});


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



