Meteor.publish('Meteor.users', function () {
	return Meteor.users.find( {} );
});	