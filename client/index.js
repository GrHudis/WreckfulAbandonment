Meteor.subscribe("Meteor.users");

/// accounts config
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});
	
	
	Template.home.onCreated( function() {
		console.log("Home Page rendered");
		Session.set('title',  'public');
		console.log("Title has been set to " + Session.get('title'));
  }); // end of home.onCreated
