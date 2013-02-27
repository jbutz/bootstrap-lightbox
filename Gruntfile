module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*!=========================================================\n' +
					  '* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
                 '* <%= pkg.homepage %>\n' +
                 '* HEAVILY based off bootstrap-modal.js\n'+
                 '* ==========================================================\n' +
                 '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              	  '*\n' +
					  '* Licensed under the Apache License, Version 2.0 (the "License");\n' +
					  '* you may not use this file except in compliance with the License.\n' +
					  '* You may obtain a copy of the License at\n' +
					  '*\n' +
					  '* http://www.apache.org/licenses/LICENSE-2.0\n' +
					  '*\n' +
					  '* Unless required by applicable law or agreed to in writing, software\n' +
					  '* distributed under the License is distributed on an "AS IS" BASIS,\n' +
					  '* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
					  '* See the License for the specific language governing permissions and\n' +
					  '* limitations under the License.\n' +
					  '* ========================================================= */\n'
		},
		lint: {
			all: ['js/*.js']
		},
		jshint: {
			options: {
				"validthis": true,
				"laxbreak" : true,
				"browser"  : true,
				"eqnull"   : true,
				"boss"     : true,
				"expr"     : true,
				"asi"      : true
			},
			globals: {
				"jQuery"   : true
			}
		},
		concat: {
			js: {
				src: ['<banner>', '<file_strip_banner:js/bootstrap-lightbox.js>'],
				dest: 'build/bootstrap-lightbox.js'
			},
			less: {
				src: ['<banner>', '<file_strip_banner:less/bootstrap-lightbox.less>'],
				dest: 'build/bootstrap-lightbox.less'
			}
		},
		min: {
			dist: {
				src: ['<banner>', '<file_strip_banner:js/bootstrap-lightbox.js>'],
				dest: 'build/bootstrap-lightbox.min.js'
			}
		},
		less: {
			"dist": {
				options: {
					paths: [
						"build",
						"less"
					]
				},
				files: {
					"build/bootstrap-lightbox.css" : "build/bootstrap-lightbox.less"
				}
			},
			"distmin": {
				options: {
					paths: [
						"build",
						"less"
					],
					yuicompress: true
				},
				files: {
					"build/bootstrap-lightbox.min.css" : "build/bootstrap-lightbox.less"
				}
			}
		},
		clean: {
			dist: [
				"build/bootstrap-lightbox.less"
			]
		},
		copy: {
			dist: {
				files: {
					"docs/assets/js/": "build/bootstrap-lightbox.min.js",
					"docs/assets/css/": "build/bootstrap-lightbox.min.css",
				}
			}
		},
		exec: {
			docs_dep: {
				command: 'cd docs/build;npm install'
			},
			build_docs: {
				command: 'node docs/build'
			}
		},
		qunit: {
			all: [
				'test/**.html'
			]
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-exec');

	// Default task.
	grunt.registerTask('default', 'qunit lint concat min less copy');

	grunt.registerTask('docs', 'exec:docs_dep exec:build_docs');

	grunt.registerTask('test', 'qunit lint');

};