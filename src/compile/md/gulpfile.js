const gulp = require("gulp");

const nunjucksRender = require("gulp-nunjucks-render");

const log = require("fancy-log");

const src = "src/*.njk";

const dest = "../../markdown";

const renderSettings = {
  path: ["templates"],
  ext: ".md",
};

function defaultTask() {
  return gulp
    .src(src)
    .pipe(nunjucksRender({ ...renderSettings }))
    .pipe(gulp.dest(dest))
    .on("end", () => log("markdown compiled!"));
}

gulp.task("default", defaultTask);
