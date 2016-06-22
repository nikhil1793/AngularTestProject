/**
 * Created by Nikhil on 07-05-2016.
 */

   // gulp utilities
var gulp=require('gulp');
var g_util=require('gulp-util');
var g_if=require('gulp-if');
var g_uglify=require('gulp-uglify');
var g_concat=require('gulp-concat');

// browserify
var browserify=require('browserify');
var b_annotate=require('browserify-ngannotate');

// watchify
var watchify=require('watchify');

// souce file plugins
var v_source=require('vinyl-source-stream');
var v_buffer=require('vinyl-buffer');

// browser-sync plugin
var browserSync=require('browser-sync');



// initialising global flag

global.flag=false;

var browserSyncInstance=browserSync.create();
gulp.task('browserSync',function(){

    return browserSyncInstance.init({
        server:{
         baseDir:'./app/'
        }
    })

});

function buildScript(file){

    // create bundler
    var bundler=browserify({
        entries:'./app/js/_index.js',
        cache:{},
        packageCache:{},
        fullpaths:true
    },watchify.args);


    function rebundle(){
        var stream = bundler.bundle();
        g_util.log('Rebundling....');

        return stream.pipe(v_source(file))
            .pipe(v_buffer())
            //.pipe(g_uglify())
            .pipe(gulp.dest('./app/build/js/'))
            .pipe(browserSyncInstance.reload({
                stream:true,
                once:true
            }));
    };

    if(!global.flag){
       // g_util.log('global flag :' + global.flag);
        bundler=watchify(bundler);
        bundler.on('update',function(){
           rebundle();
            //browserSync.reload();
            g_util.log('Rebundling completed....');
        });
    }

    bundler.transform(b_annotate);

    return rebundle();
}

gulp.task('browserify',['browserSync'],function(){

    return buildScript('site.js');

});

gulp.task('default',['browserify']);

/*
gulp.task('browserify',function(){

    return  browserify('./app/js/_index.js')
        .bundle()
        .pipe(v_source('site.js'))
        .pipe(gulp.dest('./app/build/js/'));

});
*/


