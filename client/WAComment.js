	Template.comment_form.events({
		"click .js-toggle-comment-form":function(event){
			$("#comment_form").toggle('slow');
		}, 
		"submit .js-save-comment-form":function(event){

			var post  = event.target.post.value;
			var website_id = this._id;
				
			if (Meteor.user()) {
				Websites.update( 
					{_id:website_id},
					{ $addToSet: 
						{ comments:  {'posting': post, 'postdate': new Date(), poster: Meteor.user().username } }
					} );
			}
			
			$('comment_form').val(' ');
			$("#comment_form").toggle('slow');
			return false;// stop the form submit from reloading the page

		}
	});