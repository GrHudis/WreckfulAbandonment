Meteor.publish('pointsCollection', function () {
	return points.find( {} );
});	