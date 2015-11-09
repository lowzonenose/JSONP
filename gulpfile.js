/* global process */

(function (gulp, gulpLoadPlugins) {
    'use strict';

    var $ = gulpLoadPlugins({ pattern: '*', lazy: true }),
        _ = {
            src  : 'src',
            lib  : 'lib',
            test : 'test',
            dist : 'dist',
            build: 'build'
        };

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ Options
    //| > usage : gulp [task] --minify
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var opts = require('minimist')(process.argv.slice(2));
    var isMinify = opts.minify;

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ mocha with phantomJS 
    //| > JavaScript test framework running on node.js and the browser
    //| > http://mochajs.org/
    //| > https://www.npmjs.com/package/gulp-mocha-phantomjs
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('mocha-phantomjs', function () {

        // pour information, 
        // la ligne de commande est la suivante :
        // $.shelljs.exec('./node_modules/.bin/mocha --recursive -R list ../test/spec/');
        
        var gmochaPhantomJS = require('gulp-mocha-phantomjs');

        return gulp
                .src(_.test + '/index.html')
                .pipe(gmochaPhantomJS({reporter: 'spec'}));
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ requirejs avec optimisation avec amdclean
    //| > Framework RequireJS 
    //| > https://github.com/gfranko/amdclean
    //| > principe -> http://requirejs.org/docs/optimization.html
    //| > options  -> https://github.com/jrburke/r.js/blob/master/build/example.build.js
    //| > astuces  -> http://stackoverflow.com/questions/23978361/using-gulp-to-build-requirejs-project-gulp-requirejs
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('optimize', function (taskReady) {

        var requirejs = require('requirejs');
        
        // Pour information,
        // les valeurs possibles sont les suivantes :
        // uglify, uglify2, closure, or closure.keepLines
        var mode = 'none';
        if (isMinify) {
            $.util.log("OK, mode optimisation...");
            mode = 'uglify2';
        }
        
        requirejs.optimize({
            mainConfigFile: _.src + '/Config.js',
            paths : {
                log4js : (isMinify) ? "../" + _.lib + "/empty" /* FIXME "empty:" */ :  "../" + _.lib + "/woodman/woodman-amd"
            },
            baseUrl: _.src,
            optimize: mode,
            uglify2: {
                output: {
                    beautify: false
                },
                warnings: false,
                mangle: false
            },
            include: [
                'JSONP'
            ],
            out: (isMinify) ? _.build + '/js/JSONP.js' : _.build + '/js/debug/JSONP.js',
            findNestedDependencies: false,
            preserveLicenseComments: false, // FIXME ne semble pas fonctionner !?
            useStrict: true,
            onBuildRead: function (moduleName, path, contents) {
                
                if (isMinify) {
                    var groundskeeper = require('groundskeeper');
                    var cleaner = groundskeeper({
                        console: true,                          // Keep console logs
                        debugger: false,                        // Keep debugger; statements
                        pragmas: ['development'],               // Keep pragmas with the following identifiers
                        namespace: [
                            'this.logger', 
                            'self.logger',
                            'logger'
                       ] // Besides console also remove function calls in the given namespace,
                    });
                    cleaner.write(contents);
                    return cleaner.toString();
                }
                return contents;
            },
            onModuleBundleComplete: function (data) {

                var fs = require('fs'),
                         amdclean = require('amdclean'),
                         outputFile = data.path;

                fs.writeFileSync(outputFile, amdclean.clean({
                    'filePath': outputFile,
                    'prefixMode': 'camelCase',
                    'wrap': {
                         'start': '\n/* BEGIN CODE */\n',
                         'end'  : '\n/* END CODE   */\n'
                       },
                       'escodegen': {
                         'comment': false,
                         'format': {
                           'indent': {
                             'style': '    ',
                             'adjustMultilineComment': true
                           }
                         }
                       }
                }));
            }
        }, function () {
            taskReady();
        }, function (error) {
            console.error('requirejs task failed', JSON.stringify(error));
            process.exit(1);
        });
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ umd
    //| > Framework UMD 
    //| > https://github.com/umdjs/umd
    //| > https://www.npmjs.com/package/gulp-umd
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('umd', ['optimize'], function () {

        var umd = require('gulp-umd');

        return gulp.src((isMinify) ? _.build + '/js/JSONP.js' :  _.build + '/js/debug/JSONP.js')
            .pipe(umd({
                exports: function (file) {
                    return 'JSONP';
                },
                namespace: function (file) {
                    return 'JSONP';
                }
            }))
            .pipe(gulp.dest((isMinify) ? _.build + '/umd/' : _.build + '/umd/debug/'))
            .pipe($.plumber())
            .pipe($.size());
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ licence
    //| > ajout d'une licence au bundle
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('licence', function () {
        
        // pour information, 
        // le fichier de licence peut être un template,
        // les balises en nottion ES6-style : ${date}
        var fs      = require('fs');
        var header  = require('gulp-header');
        var licence = "./LICENCE";
        
        return gulp.src([_.build + '/**/*.js'])
                .pipe(header(fs.readFileSync(licence, 'utf8'), { date : new Date().getFullYear().toString()}))
                .pipe(gulp.dest(_.dist))
                .pipe($.plumber())
                .pipe($.size()) ;
    });
    
    
    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ connect to web server for test
    //| > http://localhost:9001
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('connect', $.connect.server({
        root: [_.test],
        livereload: true,
        port: 9001
    }));

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ server web test
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('server', ['connect'], function () {
        gulp.start('webtest');
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ environnement
    //| > open web server 
    //| > FIXME Linux : Impossible d'obtenir le descripteur de fichier faisant 
    //|                 référence à la console
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('webtest', function () {
        $.shelljs.exec('open http://localhost:9001');
    });
    
    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ watch test change
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('watch', ['server'], function () {
        $.watch({glob: [_.test + '/spec/**/*.js']}, function () {
            gulp.start('mocha-phantomjs');
        });
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ clean
    //| > nettoyage 
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('clean', [], function () {

        var stream = gulp.src([
            _.build
        ], {force: true});
        return stream.pipe($.clean());
    });

    
    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ help
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('help', function () {
        $.util.log("Liste des 'target' principales :");
        $.util.log(" -- build : construction complète du projet 'jsonp'.");
        $.util.log(" -- compile : minification des JS.");
        $.util.log(" -- test : execution des tests unitaires.");
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ tâche = alias
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('mocha', ['mocha-phantomjs']);
    gulp.task('test', ['mocha']);
    gulp.task('test-cloud', ['server']);
    gulp.task('compile', ['umd']);
    
    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ synchronisation des tâches
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    var runSequence = require('run-sequence');
    gulp.task('build', function(callback) {
        runSequence('test', 'compile', 'licence', callback);
    });

    //|**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //| ✓ tâche par default
    //'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    gulp.task('default', ['clean'], function () {
        gulp.start('build');
    });

}(require('gulp'), require('gulp-load-plugins')));
