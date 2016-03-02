/**
 * lib_loader.js
 *
 * @description :: Load all the node.js libs.
 *
 */

var _ = require('lodash');
var path = require('path');
var fs = require('fs-extra');

module.exports = {

	class_name: 'lib_loader',

	_: _, 

	path: path, 
	
	fs: fs, 
}; 
