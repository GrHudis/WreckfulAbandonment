Meteor.publish('imagesCollection', function () {
	return WAImages.find( {} );
});	


  Meteor.startup(function () {
    if (WAImages.findOne()){
    	console.log("Using images loaded prior");
		return;
	}
	
    if (!WAImages.findOne()){
    	console.log("No images yet. Creating starter data.");
		
    	  WAImages.insert({
			name:"BlueRidge.jpg",   
    		category:"Mill", 
    		description:"Old grist mill in Blue Ridge Mountains", 
    		location: "Blue Ride Parkway, North Carolina"
    	});
    	  WAImages.insert({
			name:"Peckman.jpg",   
    		category:"Grafitti", 
    		description:"Bride for rail trail over Peckman River", 
    		location: "Cedar Grove, New Jersey"
    	});	
    	 WAImages.insert({
			name:"Mununkachunk.jpg",   
    		category:"Railroad", 
    		description:"Tunnel on Lackawanna Old Main Line", 
    		location: "Belvidere, New Jersey"
    	});			
   	  WAImages.insert({
			name:"MorrisCanalMontclair.jpg",   
    		category:"Canal", 
    		description:"Morris Canal in Golf Course", 
    		location: "Montclair, New Jersey"
    	});	
   	  WAImages.insert({
			name:"Stumphouse.jpg",   
    		category:"Railroad", 
    		description:"Unfinished and abamdoned tunnel", 
    		location: "Cherokee Scenic Byway, South Carolina"
    	});	
   	  WAImages.insert({
			name:"PineBarrens.jpg",   
    		category:"Railroad", 
    		description:"Washed out bridge", 
    		location: "Hammonton, New Jersey"
    	});
   	  WAImages.insert({
			name:"Radar.jpg",   
    		category:"Grafitti", 
    		description:"Drain pipe into Delaware River under Norfolk & Southern Track", 
    		location: "Phillipsburg, New Jersey"
    	});	
   	  WAImages.insert({
			name:"LHRBridge.jpg",   
    		category:"Railroad", 
    		description:"Abandoned Lehigh to Hudson River Bridge over the Delaware River", 
    		location: "Phillipsburg, New Jersey"
    	});				
   	  WAImages.insert({
			name:"PineBarrensTrestle.jpg",   
    		category:"Railroad", 
    		description:"Trestle bridge", 
    		location: "Hammonton, New Jersey"
    	});		
 	  WAImages.insert({
			name:"CNJChester.jpg",   
    		category:"Railroad", 
    		description:"Patriots Path by Black River, Central Railroad of NJ", 
    		location: "Chester, New Jersey"
    	});			
 	  WAImages.insert({
			name:"JerseyCityGraffiti.jpg",   
    		category:"Graffiti", 
    		description:"On railroad bridge support", 
    		location: "Jersey City, New Jersey"
    	});	
 	  WAImages.insert({
			name:"Zydeco.jpg",   
    		category:"Graffiti", 
    		description:"Creole Mural", 
    		location: "Opelousas, Louisiana"
    	});
 	  WAImages.insert({
			name:"AndoverArt.jpg",   
    		category:"Graffiti", 
    		description:"Sussex Branch Rail Trail", 
    		location: "Andover, New Jersey"
    	});	
 	  WAImages.insert({
			name:"Clarksdale.jpg",   
    		category:"Graffiti", 
    		description:"Delta Mural", 
    		location: "Clarksdale, Mississippi"
		});		
 	  WAImages.insert({
			name:"Octopus.jpg",   
    		category:"Graffiti", 
    		description:"Abandoned Highway", 
    		location: "Centralia, Pennsylvania"
    	});	
 	  WAImages.insert({
			name:"Tutwiler.jpg",   
    		category:"Railroad", 
    		description:"Trestle", 
    		location: "Tutwiler, Mississippi"
    	});	
 	  WAImages.insert({
			name:"Cotton.jpg",   
    		category:"Mill", 
    		description:"Abandoned Cotton Gin Mill", 
    		location: "Indianola, Mississippi"
    	});	
 	  WAImages.insert({
			name:"Vernon.jpg",   
    		category:"Railroad", 
    		description:"Active New York Susquehanna and Western",
    		location: "Vernon, New Jersey"
    	});	
 	  WAImages.insert({
			name:"GhostTrain.jpg",   
    		category:"Graffiti", 
    		description:"Abandoned Central Railroad of NJ",
    		location: "Bloomsbury, New Jersey"
    	});		
		
		return;
    }
  });