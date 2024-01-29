const gulp = require("gulp");

const nunjucksRender = require("gulp-nunjucks-render");

const src = "src/*.njk";

const dest = "../";

const renderSettings = {
  path: ["templates"],
  ext: ".md",
};

function defaultTask() {
  return gulp
    .src(src)
    .pipe(nunjucksRender({ ...renderSettings }))
    .pipe(gulp.dest(dest));
}

gulp.task("default", defaultTask);
