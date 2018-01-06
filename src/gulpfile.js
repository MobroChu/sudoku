const gulp = require("gulp");

// 转译js
gulp.task("webpack", () => {
    const config = require("./webpack.config.js");
    const webpack = require("webpack-stream");
    gulp.src("./js/**/*.js")
    .pipe(webpack(config))
    .pipe(gulp.dest("../www/js"));
});

// 编译 less
gulp.task("less", () => {
    const less = require("gulp-less");
    gulp.src("./less/*.less")
    .pipe(less())
    .pipe(gulp.dest("../www/css"));
});

gulp.task("default", ["webpack", "less"]);

// gulp.watch(["./less/*.less", "./js/**/*.js"], ["default"]);
gulp.task("watch", () => {
    gulp.watch("./less/**/*.less", ["less"]);
    gulp.watch("./js/**/*.js", ["webpack"]);
})
