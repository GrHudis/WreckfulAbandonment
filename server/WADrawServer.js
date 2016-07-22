//Chats will only be visible if they are relevant to current signed on user 
Meteor.publish('pointsCollection', function () {
	return points.find( {} );
});	

Meteor.publish('Meteor.users', function () {
	return Meteor.users.find( {} );
});	



