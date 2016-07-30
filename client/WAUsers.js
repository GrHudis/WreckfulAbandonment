  Template.users.helpers({
    users:function(){
      return Meteor.users.find();
    }
  })
  
 Template.available_user.helpers({
    getUsername:function(userId){
	  console.log("user=" + userId);
      var user = Meteor.users.findOne({_id:userId});
      return user.username;
    }, 
	getUserstatus:function(userId){
		var user = Meteor.users.findOne({_id:userId});
		return user.status.online;
	}
  })