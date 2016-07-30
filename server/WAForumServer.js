Meteor.publish('websitesCollection', function () {
	return Websites.find( {} );
});	

Meteor.startup(function () {
    if (Websites.findOne()){
    	console.log("Using forum entries loaded prior");
		return;
	}
	
    if (!Websites.findOne()){
    	console.log("No forum entries yet. Creating  starter data."); 
		
    	  Websites.insert({
			ratingsDown: 0,
			ratingsUp: 0, 
		    category:"Railroad",
    		title:"Lehigh & Hudson River", 
    		url:"http://www.metrotrails.org/Metrotrails/Lehigh_%26_Hudson_River.html", 
    		description:"Hike Guide", 
			location:"Warren & Sussex Counties, New Jersey",
    		createdOn:new Date(),
			username:"Server"
    	});
    	  Websites.insert({
			ratingsDown: 0,
			ratingsUp: 0,  			  
		    category:"Railroad",
    		title:"Lehigh & New England", 
    		url:"http://www.metrotrails.org/Metrotrails/Lehigh_and_New_England_Railbed.html", 
    		description:"Hike Guide", 
			location:"Warren & Sussex Counties, New Jersey",
    		createdOn:new Date(),
			username:"Server"
    	});	
    	  Websites.insert({
			ratingsDown: 0,
			ratingsUp: 0, 			  
		    category:"Railroad",
    		title:"Lackawanna Old Main Line", 
    		url:"http://www.metrotrails.org/Metrotrails/Warren_Railroad.html", 
    		description:"Hike Guide", 
			location:"Portand Pennsylvania to Changewater New Jersey",
    		createdOn:new Date(),
			username:"Server"
    	});		
		
	}	
});