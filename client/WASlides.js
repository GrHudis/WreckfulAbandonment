  Meteor.subscribe('imagesCollection');
  
   Template.slides.helpers({
    images:function(){
		var cat = Session.get("myCategory");
		if ((!cat) || (cat == "All")) {
			return WAImages.find({}); 
		} else {
			return WAImages.find({category:cat}); 
		}	
    }	
  })
  
 Template.slides.onRendered(function() {
	 this.autorun(function() {
		$('.carousel').carousel({interval: 1000});
	 })  
	  
});	  

 
