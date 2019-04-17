var express 	= require('express'),
	fileinclude = require('gulp-file-include'),
	gulp		= require('gulp'),
	http 		= require('http'),
	less		= require('gulp-less'),
	path 		= require('path'),
	rename 		= require('gulp-rename'),
	runSequence = require('run-sequence'),
	watch		= require('gulp-watch'),
	bodyParser 	= require('body-parser');

gulp.task('less', function(){
	return gulp.src('./public/less/theme.less')
		.pipe(less({
			paths: [path.join(__dirname, 'less', 'includes')]
		}))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('watchFiles', function(){
	return watch('./public/less/**/*.less', function(){
		gulp.start('less');
	});
});

gulp.task('fileinclude', function() {
	gulp.src(['./public/templates/index.tmpl.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./public'));

});

gulp.task('default', function(){
	runSequence(['less', 'fileinclude'], 'watchFiles');
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes = require('./routes');
routes(app);

//Serve the puplic dir
app.use(express.static(__dirname + "/public"));

app.listen(3000)
console.log("Now listening on port 3000 Go to http://127.0.0.1:3000/admin to control");
console.log("run 'play 1-1 [html] http://127.0.0.1:3000 in CasparCG to start the graphics");
