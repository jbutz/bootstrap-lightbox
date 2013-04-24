#!/usr/bin/env node
var hogan = require('hogan.js');
var fs    = require('fs');

var layout, pkg;
var data  = {};
var pagesData  = {};
var pages = [
	"home",
	"demo",
	"usage"
]; 

// Get bootstrap-lightbox's package.json file
pkg = JSON.parse( fs.readFileSync(__dirname + '/../../package.json', 'utf-8') );

data.version = pkg.version || "";

console.log("\033[32m✔\033[39m  Bootstrap Lightbox version extracted");

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.mustache', 'utf-8');
layout = hogan.compile(layout);

console.log("\033[32m✔\033[39m  Compiled templates");

pages.forEach(function(name)
{
	var page = fs.readFileSync(__dirname  + '/../templates/' + name + '.mustache', 'utf-8');

	page = hogan.compile(page);

	pagesData[ name ] = page;//.render(data);

});

console.log("\033[32m✔\033[39m  Built pages");

var index = layout.render(data,pagesData);

console.log("\033[32m✔\033[39m  Rendered page");

fs.writeFileSync(__dirname + '/../' + 'index.html', index, 'utf-8');

console.log("\033[32m✔\033[39m  Saved Output");

console.log("Done");