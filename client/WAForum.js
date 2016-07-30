Meteor.subscribe('websitesCollection');

Template.website_list.helpers({
		
		websites:function(){
		    var options = {sort:{ratingsUp:-1, createdOn: -1}};	

			var cat = Session.get("myCategory");
			if ((!cat) || (cat == "All")) {
				return Websites.find( {}, options);
			} else {
				return Websites.find( {category:cat}, options);				
			}		
		},
		
		comments:function() {
			return Websites.find({_id: this._id}, { comments }  );
		}
});
	

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){
		var category    = event.target.category.value;
		var title       = event.target.title.value;
		var url         = event.target.url.value;
		var description = event.target.description.value;
		var location    = event.target.location.value;
		
		console.log("Calling WebsiteIns");
		Meteor.call('WebsiteIns', {category:category, title:title, url:url, description:description, location:location}  , 
		function (error, result) {
			if (error) console.log('WebsiteIns Returned Error ' + error.error);
		});		
	
		$('website-form').val(' ');
		$("#website_form").toggle('slow');

		return false;// stop the form submit from reloading the page
	}
});

Template.website_item.events({
	"click .js-upvote":function(event){
		var website_id = this._id;
		console.log("Up voting website with id " + website_id);
		Websites.update({_id:website_id},  { $inc: { ratingsUp: 1 } } );
	
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);
		
		Websites.update({_id:website_id},  { $inc: { ratingsDown: 1 } } );
		
			return false;// prevent the button from reloading the page
	}
});