  Meteor.subscribe('imagesCollection');
  
   Template.slides.helpers({
    images:function(){
		return WAImages.find({}); 
    }	
  })
  
 Template.slides.onRendered(function() {
	 this.autorun(function() {
		$('.carousel').carousel({interval: 1000});
	 })  
	  
});	  

 
