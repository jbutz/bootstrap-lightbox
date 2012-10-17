var vows = require('vows');
var assert = require('assert');
var jshint = require('jshint').JSHINT;
var fs = require('fs');

vows.describe('Valid JS').addBatch({
	'when tested with JSHint': {
		topic: function ()
		{
			var buffer = fs.readFileSync('bootstrap-lightbox.js');
			var data   = buffer.toString();
			if(data.length <= 0)
				return false;
			return jshint(data, {
				"validthis": true,
				"laxbreak" : true,
				"browser"  : true,
				"eqnull"   : true,
				"boss"     : true,
				"expr"     : true,
				"asi"      : true
			});
		},
		'is true': function (topic)
		{
			assert.ok(topic);
		},
		'results': function(topic)
		{
			if(!topic)
				console.log(jshint.errors);
		}
	}
}).export(module); // Export the Suite