var gulp 		= require("gulp");
var sass 		= require("gulp-sass");
var htmlmin 	= require("gulp-htmlmin");
var notify 		= require("gulp-notify");
var concat 		= require("gulp-concat");
var uglify 		= require("gulp-uglify");
var browserSync = require("browser-sync").create();
var del 		= require("del");




gulp.task("cache:css", function() {
	del("./dist/css/*.css")
});
gulp.task("cache:js", function() {
	del("./dist/js/app.js")
});


gulp.task("sass", ['cache:css'], function(){
	return gulp.src(["./src/scss/hover-animate.scss", "./src/scss/style.scss", "node_modules/bootstrap/scss/bootstrap.scss"])
				.pipe(sass())
				.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css"))
				.pipe(browserSync.stream());
});

gulp.task("html", function() {
	return gulp.src(["./src/*.html"])
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(gulp.dest("./dist"))
				.pipe(browserSync.stream());
});




/* Task minify js */
gulp.task("js", ['cache:js'], function() {
	return gulp.src("./src/js/app.js")
				.pipe(uglify())
				.pipe(gulp.dest("./dist/js"))
				.pipe(browserSync.stream());
});


/* Task concat js */
gulp.task("concat-js", function() {
	return gulp.src([
					'node_modules/jquery/dist/jquery.js',
					'node_modules/tether/dist/js/tether.js',
					'node_modules/bootstrap/dist/js/bootstrap.js'
				])
				.pipe(concat("main.js"))
				.pipe(gulp.dest("./dist/js"))

});



gulp.task("server", function() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});

	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch("node_modules/bootstrap/scss/bootstrap.scss", ['sass']);
	gulp.watch("./src/js/**/*.js", ['js']);
	gulp.watch("./src/*.html", ['html']);
});

gulp.task("default", ["html", "sass", "js", "concat-js", "server"]);

