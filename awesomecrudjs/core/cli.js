/**
 * cli.js
 *
 * @description :: Command lone arguments.
 *
 */

var commandLineArgs = require('command-line-args');

var error = require('./error_handler.js');

var options = commandLineArgs([			
			
			{
				name: 'model_name', 
			  	alias: 'm', 
			  	type: String, 
			  	multiple: false, 
			  	//defaultValue: 'all', 
			},
			{
				name: 'all', 
			  	alias: 'a', 
			  	type: String, 
			  	multiple: false, 
			},
			{
				name: 'help', 
			  	alias: 'h', 
			  	type: String, 
			  	multiple: false, 
			},
			{
				name: 'version', 
			  	alias: 'v', 
			  	type: String, 
			  	multiple: false, 
			},
		]);

function parseOption(){

	var result;

	try{

		result = options.parse();

	} catch(err){
		console.log(error.bad_command);

		result = [{}];
	}

	return result;
}

module.exports = {

	class_name: 'cli',

	args: parseOption(), 
};