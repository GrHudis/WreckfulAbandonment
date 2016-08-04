Meteor.subscribe('canvasCollection')

function setDelBtn() { 
	var title = Session.get('title');

	if (title.toLowerCase() == 'public') {
		console.log("public canvas active");
		$('#btn-delete').prop('disabled', true);
	} else {
		console.log("private canvas active");
		$('#btn-delete').prop('disabled', false);
	}	
};


Template.options_form.onRendered( function() { 
	console.log("options_form rendered");
	setDelBtn();
});

Template.options_form.events({
  'submit .js-options-form':function(event){
		// stop the form from triggering a page reload
		event.preventDefault();

		var action    = event.target.rbTitle.value;	
		var oldTitle  = event.target.oldTitle.value;	
		var newTitle  = event.target.newTitle.value;		

		if (!Meteor.user()) {
			alert("Please log in, only public canvas is available to anonymous users!");
			return;
		}	

		if (action == "reload") {
			Session.set('title', oldTitle);
			console.log("Title been set to " + Session.get('title'));		
			

			setDelBtn();
			console.log("Canvas Loaded " + Session.get('title'));
			return;
		}  
		
		if (action == "new") {
			if (newTitle.toLowerCase() == "public") {
				alert("Choose A Name Other Than public");
			    event.target.newTitle.value = " ";						
				return;
			}
			
			var exists   = canvasSVGs.findOne({title:newTitle}); 
			if (exists) {
				event.target.newTitle.value = " ";						
				alert("Choose Another Unused Name");
				return;
			}		
			
			
			Session.set('title', newTitle);	
			console.log("Title has been set to " + Session.get('title'));				
	
			Meteor.call('canvasIns', {title:newTitle}  , function (error, result) {
				if (error) alert('canvasIns Returned Error ' + error.error);
			});

			setDelBtn();			
			console.log("Canvas Created " + Session.get('title'));	
			event.target.newTitle.value = " ";			
			return;
		}
		
		if (action == "clone") {
			if (newTitle.toLowerCase() == "public") {
				alert("Choose A Name Other Than public");
				event.target.newTitle.value = " ";						
				return;
			}
			
			var exists   = canvasSVGs.findOne({title:newTitle}); 
			if (exists) {
				alert("Choose Another Unused Name");
				event.target.newTitle.value = " ";						
				return;
			}		
			
			Meteor.call('cloneCanvas', {oldTitle:oldTitle, newTitle:newTitle}  , function (error, result) {
				if (error) alert('clearTitle Returned Error ' + error.error);
			});
			console.log("Canvas copied from " + oldTitle + " to " + Session.get('title'));
						
			Session.set('title', newTitle);	
			console.log("Title has been set to " + Session.get('title'));			

		    Meteor.call('canvasIns', {title:newTitle}  , function (error, result) {
			  if (error) alert('canvasIns Returned Error ' + error.error);
			});

			setDelBtn();
			console.log("Canvas Copied " + Session.get('title'));
			event.target.newTitle.value = " ";					
			return;
		}	

	},
 
    "click button.delete": function (event) {
		var title = Session.get('title');
		if (title.toLowerCase() == 'public') {
			alert("Cannot delete public");
			return
		}		
		
		$('#btn-delete').prop('disabled', true);
		
		Meteor.call('clearCanvasDB', {title:Session.get('title')}  , function (error, result) {
			if (error) alert('clearTitle Returned Error ' + error.error);
		});
		Meteor.call('clearTitle', { title: title }  , function (error, result) {
			if (error) alert('clearTitle Returned Error ' + error.error);
		});			
  }
});
  
  Template.options_form.helpers({
    doctitle:function(){
      return Session.get("title");
  },
	canvasSVGs:function(){
		return canvasSVGs.find({});
	}	
});