Websites = new Mongo.Collection("websitesCollection");

Websites.allow({	// we need to be able to update websites for ratings.
	update:function(userId, doc){
		console.log("testing security on website update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the website. 
			return false;
		}
	},

	insert:function(userId, doc){
		console.log("testing security on website insert");
		if (Meteor.user()){ 
			return true;
		} else {// user not logged in
			return false;
		}
	}
}) //end of authorizations for Websites	

Websites.deny({
		remove: function (userId, doc) {
			return true;
		}
});	
	

  Meteor.methods({
	'WebsiteIns': function(data) {

		if (!Meteor.user()) {
			return null;
		}	
		
		var category       = data.category;
		var title          = data.title;
		console.log("title-" + title);
		var url            = data.url;
		console.log("url-" +url);
		var description    = data.description;
		var location       = data.location;
 		var created        = new Date();		

	return Websites.insert( {category:category, title:title, url:url, description:description, location:location, createdBy:Meteor.user()._id, 
							createdOn:created, 	ratingsDown:0,	ratingsUp:0} );	
	}
  });	