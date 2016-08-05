Meteor.publish('pointsCollection', function () {
	return points.find( {} );
});	

Meteor.publish('canvasCollection', function () {
	return canvasSVGs.find( {} );
});	


Meteor.startup(function () {
    if (canvasSVGs.findOne()){
    	console.log("Using canvas entries loaded prior");
		return;
	}
	
    if (!canvasSVGs.findOne()){
    	console.log("No canvas entries yet. Creating  starter data."); 
		
    	  canvasSVGs.insert({
    		title:"public", 
    		createdOn:new Date(),
			createdBy:"Server"
    	});
	}	
});