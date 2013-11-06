module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     *
     *  Pull in environment-specific vars
     *
     */
    env: grunt.file.readJSON('config.json'),

    /**
     * https://github.com/gruntjs/grunt-contrib-less
     */
    less: {
        development: {
            options: {
                paths: ['<%= env.frontEndPath %>/css/less', '<%= env.frontEndPath %>/css/less/module', '<%= env.frontEndPath %>/css/less/media-queries', '<%= env.frontEndPath %>/css/less/media-queries/breakpoints'],
                yuicompress: true
            },
            files: {
                "<%= env.frontEndPath %>/css/style.min.css": "<%= env.frontEndPath %>/css/less/main.less"
            }
        }
    },

    /**
     * Docco is that nifty biz that Backbone has for its annotated source
     *
     * https://github.com/eliias/grunt-docco
     */
    docco: {
        src: ['<%= env.frontEndPath %>/js/source/*.js', '<%= env.frontEndPath %>/js/source/views/*.js'],
        options: {
            output: '<%= env.frontEndPath %>/docs/v/head'
        }
    },

    styleguide: {
            dist: {
                options: {
                    name: 'eRegs Styleguide'
                },
                files: {
                    '<%= env.frontEndPath %>/docs/styleguide': '<%= env.frontEndPath %>/css/'
                }
            }
        },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     * 
     * Validate files with JSHint.
     * Below are options that conform to idiomatic.js standards.
     * Feel free to add/remove your favorites: http://www.jshint.com/docs/#options
     */
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        undef: true,
        strict: true,
        unused: true,
        boss: true,
        browser: true,
        globalstrict: true,
        sub: true,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          require: true,
          define: true,
          subhead: true,
          toc: true,
          sidebar: true,
          regContent: true
        }
      },
      all: ['<%= env.frontEndPath %>/js/source/*.js', '<%= env.frontEndPath %>/js/source/views/*.js', '<%= env.frontEndPath %>/js/source/views/*/*.js', '!<%= env.frontEndPath %>/js/source/require.config.js']
    },

    /**
     * https://github.com/jsoverson/grunt-plato
     * http://jscomplexity.org/complexity
     */
    plato: {
        all: {
            options: {
                jshint: grunt.file.readJSON('.jshintrc')
            },
            files: {
                '<%= env.frontEndPath %>/docs/complexity': ['<%= env.frontEndPath %>/js/source/*.js', '<%= env.frontEndPath %>/js/source/views/*.js']
            }
        }
    },

    casperjs: {
        files: ['<%= env.frontEndPath %>/js/tests/functional/*.js'],
        options: {
            custom: {
                url: '<%= env.testUrl %>'
            }
        }
    },

    requirejs: {
        compile: {
            options: {
                baseUrl: '<%= env.frontEndPath %>/js/source',
                dir: "<%= env.frontEndPath %>/js/built",
                modules: [ {name: "regulations"} ],
                paths: grunt.file.readJSON('require.paths.json'),
                shim: grunt.file.readJSON('require.shim.json')
            }
        }
    },

    shell: {
      'build-require': {
        command: './require.sh',
      },

      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R dot <%= env.testUrl %>/static/regulations/js/tests/browser/runner.html --verbose',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },

    // https://github.com/yatskevich/grunt-bower-task
    bower: {
        install: {
            options: {
                targetDir: '<%= env.frontEndPath %>/js/source/lib'
            }
        }
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     * 
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      gruntfile: {
        files: ['Gruntfile.js', '<%= env.frontEndPath %>/css/less/*.less', '<%= env.frontEndPath %>/css/less/module/*.less', '<%= env.frontEndPath %>/css/less/media-queries/breakpoints/*.less','<%= env.frontEndPath %>/js/tests/specs/*.js', '<%= env.frontEndPath %>/js/source/*.js', '<%= env.frontEndPath %>/js/source/views/*.js', '<%= env.frontEndPath %>/js/source/views/*/*.js', '<%= env.frontEndPath %>/js/tests/functional/*.js'],
        tasks: ['less', 'test']
      }
    },
  });

  /**
   * The above tasks are loaded here.
   */
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    //grunt.loadNpmTasks('grunt-casperjs');
    grunt.loadNpmTasks('grunt-docco2');
    grunt.loadNpmTasks('grunt-styleguide');
    grunt.loadNpmTasks('grunt-plato');
    grunt.loadNpmTasks('grunt-bower-task');

    /**
    * Create task aliases by registering new tasks
    */
    grunt.registerTask('test', ['jshint', 'shell:mocha-phantomjs', /*'casperjs'*/]);
    grunt.registerTask('build', ['jshint', 'shell', 'requirejs', 'less', 'docco', 'plato']);
    grunt.registerTask('squish', ['requirejs', 'less']);
};
