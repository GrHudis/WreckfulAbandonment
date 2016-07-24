WAImages = new Mongo.Collection("imagesCollection");

WAImages.allow({
		insert: function (userId, doc) {
			return true;
		}	
});