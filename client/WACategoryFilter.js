Template.categories.events({
	"click .js-toggle-category-filter-form":function(event){
		$("#category-filter-form").toggle('slow');
	}, 
	"submit .js-category-filter-form":function(event){
		
		var myCategory  = event.target.category.value;
		Session.set("myCategory", myCategory);
		
		
		$('category-filter-form').val(' ');		
		$('#category-filter-form').toggle('slow');
		return false;// stop the form submit from reloading the page

	}, 
	"reset .js-category-filter-form":function(event){
		Session.set("myCategory", "All");
		
		$('category-filter-form').val(' ');
		$('#category-filter-form').toggle('slow');
		return false;// stop the form submit from reloading the page
	}
});
	
Template.categories.helpers({
		myCategory:function(){
			var cat = Session.get("myCategory");
			if (!cat) {
				Session.set("myCategory", "All");
			}	
			
		return Session.get("myCategory");	
		}		
});	
	