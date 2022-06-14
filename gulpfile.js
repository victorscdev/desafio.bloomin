const { src, series, parallel, dest, watch } = require("gulp");

const gulp_clean_css = require("gulp-clean-css");
const gulp_concat_css = require("gulp-concat-css");
const gulp_concat_js = require("gulp-concat");
const gulp_rename = require("gulp-rename");
const gulp_sass = require("gulp-sass")(require("sass"));
const gulp_sourcemaps = require("gulp-sourcemaps");
const gulp_terser = require("gulp-terser");
const gulp_uglify = require("gulp-uglify");
const gulp_webp = require("gulp-webp");

gulp_sass.compiler = require("node-sass");

/******************************** TAREFAS *******************************/

function img_webp_task() {
  return src("./assets/img/**/**/**")
    .pipe(gulp_webp())
    .pipe(dest("./build/img/"));
}

async function css_lib_task() {
  const css_path_libs = require("./plugins-css.json");
  return css_path_libs.map((item) => {
    src(item.arquivos, { allowEmpty: true })
      .pipe(gulp_concat_css("libs.min.css"))
      .pipe(gulp_clean_css({ compatibility: "ie8" }))
      .pipe(dest("./build/css"));
  });
}

async function js_lib_task() {
  const js_lib_path = require("./plugins-js.json");
  return js_lib_path.map((item) => {
    src(item.arquivos, { allowEmpty: true })
      .pipe(gulp_concat_js("libs.min.js"))
      .pipe(gulp_terser())
      .pipe(gulp_uglify())
      .pipe(dest("./build/js"));
  });
}

function css_task() {
  return src("./assets/sass/**/*.scss")
    .pipe(gulp_sourcemaps.init())
    .pipe(gulp_sass())
    .pipe(gulp_rename({ suffix: ".min" }))
    .pipe(gulp_sourcemaps.write("."))
    .pipe(dest("./build/css"));
}

function js_task() {
  return src("./assets/js/**/*.js")
    .pipe(gulp_sourcemaps.init())
    .pipe(gulp_rename({ suffix: ".min" }))
    .pipe(gulp_terser())
    .pipe(gulp_sourcemaps.write("."))
    .pipe(dest("./build/js"));
}

function watch_task() {
  watch(
    ["./assets/sass/**/*.scss", "./assets/js/**/*.js"],
    { interval: 1000 },
    parallel(css_task, js_task)
  );
}

exports.img_webp_task = img_webp_task;
exports.css_lib_task = css_lib_task;
exports.js_lib_task = js_lib_task;
exports.css_task = css_task;
exports.js_task = js_task;
exports.compile_libs = series(css_lib_task, js_lib_task);

exports.default = watch_task;
