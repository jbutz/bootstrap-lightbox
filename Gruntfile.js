module.exports = function(grunt)
{
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['js/*.js'],
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
			options: {
				stripBanners: true,
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
			js: {
				src: ['js/bootstrap-lightbox.js'],
				dest: 'build/bootstrap-lightbox.js'
			},
			less: {
				src: ['less/bootstrap-lightbox.less'],
				dest: 'build/bootstrap-lightbox.less'
			}
		},
		uglify: {
			options: {
				stripBanners: true,
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
			dist: {
				files: {
					'build/bootstrap-lightbox.min.js':['js/bootstrap-lightbox.js']
				}
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

	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-exec');

	// Default task.
	grunt.registerTask('default', ['qunit','jshint','concat','uglify','less','copy']);
	//grunt.registerTask('default', 'qunit lint concat min less copy');

	grunt.registerTask('docs', ['exec:docs_dep','exec:build_docs']);

	grunt.registerTask('test', ['qunit','jshint']);

};
