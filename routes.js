
 
Router.route('/', function () {
   this.render('home');
});

Router.route('/forum', function () {
   this.render('forum');
});

Router.route('/wall', function () {
   this.render('wall');
});

Router.route('/slides', function () {
   this.render('slides');
});

Router.route('/about', function () {
   this.render('about');
});