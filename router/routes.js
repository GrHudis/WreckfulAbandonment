Router.configure({
		layoutTemplate: 'masterLayout'
});		
 
Router.route('/', function () {
   this.render('home');
});

Router.route('/options', function () {
   this.render('options');
})

Router.route('/forum', function () {
   this.render('forum');
});

Router.route('/wall', function () {
   this.render('wall');
});

Router.route('/slides', function () {
   this.render('slides');
});

Router.route('/users', function () {
   this.render('users');
});

Router.route('/about', function () {
   this.render('about');
});

Router.route('/comments/:_id', function () {
  this.render('comments', {
      data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });
});