/**
 * model_loader.js
 *
 * @description :: Load the models to start generation.
 *
 */

var libs = require('./lib_loader.js');
var folder_path = require('./path.js');
var error = require('./error_handler.js');

module.exports = {

	class_name: 'model_loader',

	//List all files in the folder model
	get_all_models: folder_path.model_folder,

	//Return a model instance or an arry with all the model intances
	get_model: function(model_file_name){
		var result = folder_path.model_folder;

		if(result.length == 0){
			result = error.folder_empty;
		}
		else{
			if(model_file_name == null){//Put all the models in array

				var arr = [];
				var obj;

				//Iterate through the model file
				result.forEach(function(element, index, array){

					if(element != '.gitkeep'){
						obj = require(folder_path.model_folder_path + '/' + element);
						obj.file_name = element;
						obj.class_name = element.replace('.js','');
						obj.class_name_lowercase = obj.class_name.toLowerCase();
						obj.class_name_plural = obj.class_name_lowercase + 's';
						arr.push(obj);
					}					
				});
				
				result = arr;
			}
			else{//Create model instance

				//Capitalize the model name
				model_file_name = libs._.capitalize(model_file_name);

				//Iterate through the model file array until found the name passed as parameter
				result.forEach(function(element, index, array){

					if((element != '.gitkeep') && (element == model_file_name + '.js')){
						result = require(folder_path.model_folder_path + '/' + model_file_name + '.js');
						result.file_name = model_file_name + '.js';
						result.class_name = model_file_name;
						result.class_name_lowercase = result.class_name.toLowerCase();
						result.class_name_plural = result.class_name_lowercase + 's';
					}
					else{
						result = error.file_dont_exist;
					}
				});
			}			
		}
		return result;
	},
};
