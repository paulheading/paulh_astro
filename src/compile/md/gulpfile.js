const gulp = require("gulp");

const nunjucksRender = require("gulp-nunjucks-render");

const log = require("fancy-log");

const renderSettings = {
  path: ["templates"],
  ext: ".md",
};

function process({ src = "*", dest = "", message = "markdown complete!" }) {
  return gulp
    .src("src/" + src)
    .pipe(nunjucksRender({ ...renderSettings }))
    .pipe(gulp.dest("../../markdown/" + dest))
    .on("end", () => log(message));
}

let subfolders = ["articles", "learning", "project", "role"];

gulp.task("basic", process);

subfolders.forEach((subfolder) =>
  gulp.task(subfolder, () =>
    process({
      src: subfolder + "/*",
      dest: subfolder,
      message: subfolder + " complete!",
    })
  )
);

gulp.task("default", gulp.parallel("basic", ...subfolders));

gulp.task("watch", function () {
  gulp.watch(["src/*", "src/*/*", "templates/*/*"], gulp.series("default"));
  return;
});
