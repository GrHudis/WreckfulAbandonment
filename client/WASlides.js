  Meteor.subscribe('imagesCollection');
  
   Template.slides.helpers({
    images:function(){
		var cat = Session.get("myCategory");
		if ((!cat) || (cat == "All")) {
			return WAImages.find({}).map(function(picture, index){
				if (index === 0) {
					picture.isFirst = true;
					return picture;
				} else {
					picture.isFirst = false;
					return picture;					
				}			
			});
			
		} else {
			return WAImages.find({category:cat}).map(function(picture, index) {
				if (index === 0) {
					picture.isFirst = true;
					return picture;
				} else {
					picture.isFirst = false;
					return picture;					
				} 
			}); 
		}	
    }	
  })
 
 Template.slides.onRendered(function() {
	 this.autorun(function() {
		var speed = Session.get('speed');
		if (!speed) {
			var speed = 500;
			Session.set('speed', speed);
			console.log("Slideshow speed default set"); 
		}	
		console.log("Slideshow speed delay  =" + speed + " milliseconds"); 
		$('.carousel').carousel({interval: speed});
	 })  
	  
});	  

 
