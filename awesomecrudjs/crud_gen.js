/**
 * crud_gen.js
 *
 * @description :: Main class.
 *
 */

var libs = require('./core/lib_loader.js');
var path = require('./core/path.js');
var cli = require('./core/cli.js');
var error = require('./core/error_handler.js');

var model = require('./core/model_loader.js');

//Run the application
run();

/**
*	Functions
*/

function run(){	

	var keys =  Object.keys(cli.args);

	switch(keys[0]){

		case 'model_name':
			console.log('Preparing the enviroment.', '\n');	

			//create folders and copy libs
			createLibsFolders();
			createController(model.get_model(cli.args.model_name));
			break;

		case 'all':
			console.log('Preparing the enviroment.', '\n');	

			//create folders and copy libs
			createLibsFolders();
			createController(model.get_model(cli.args.all));
			break;

		case 'help':
			console.log('Help! To do.');
			break;

		case 'version':
			console.log('Version => 1.0.0.');
			break;

		default:
			console.log(error.nothing_to_do);
			//console.log(cli.args);					
	}
	
}

function createController(obj){
	
	console.log('Checking controller folder.', '\n');

	//Check if one class or all the classes
	if(obj instanceof Array){
		obj.forEach(function(element, index, array){
			newController(element);
		});
	}
	else{
		newController(obj);
	}		
	console.log();
	console.log('Controller creation was successfully.', '\n');
}

function newController(obj){

	try{
		//if don't exist create the folder
	    if(!libs.fs.existsSync(path.view_folder_path + '/' + obj.file_name)){

		    //load templates
		    var template = libs.fs.readFileSync(path.template_controller_path + '/Controller.txt', 'utf8');

		    //replace in template the tags		    
		    template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		    template = template.replace(new RegExp('class_name_plural', 'g'), obj.class_name_plural);
		    template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		    //file creation		    
		    libs.fs.outputFileSync(path.controller_folder_path + '/' + obj.class_name + 'Controller.js', template);
		}
	} catch(err) {
	    console.log(error.controller_error);
	    console.log(err.stack);
	}
	console.log(obj.class_name + 'Controller.js --> Ok.');

	//create folder for the view
	createViewFolder(obj.class_name_lowercase);

	//create index.ejs;
	createIndex(obj);

	//create datatable-init.js
	datatableInit(obj);

	//create create.ejs
	createCreate(obj);

	//create edit.ejs
	createUpdate(obj);

	//create show.ejs
	createShow(obj);

}

function createViewFolder(view){

	try{
		//if exist the folder erase it
		if(libs.fs.existsSync(path.view_folder_path + '/' + view)){
			libs.fs.removeSync(path.view_folder_path + '/' + view);
		}

		//create view folder
		libs.fs.mkdirSync(path.view_folder_path + '/' + view);
		console.log('Create view folder ' + view + ' --> Ok.');

	} catch(err){
		console.log(error.cant_create_folder);
	    console.log(err.stack);
	}	
}

function createIndex(obj){	

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_index_path + '/index01.txt', 'utf8');
		template = template + '\n';		

		//create header
		libs._.each(Object.keys(obj.attributes), function(attr){
			template = template + '<td>' + libs._.capitalize(attr) + '</td>\n';
		});

		template = template + libs.fs.readFileSync(path.template_index_path + '/index02.txt', 'utf8');

		//create data of the columns of each row
		libs._.each(Object.keys(obj.attributes), function(attr){
			template = template + '<td><%= ' + obj.class_name_lowercase + '.' + attr + '%></td>\n';
		});

		template = template + libs.fs.readFileSync(path.template_index_path + '/index03.txt', 'utf8');

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name_plural', 'g'), obj.class_name_plural);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.view_folder_path + '/' + obj.class_name_lowercase + '/index.ejs', template);
		console.log('Create view file index.ejs --> Ok.');

	} catch(err){
		console.log(error.index_error);
	    console.log(err.stack);
	}
}

function datatableInit(obj){

	//js_folder_path
	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_datatable_path + '/dtinit.txt', 'utf8');

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);

		//file creation		    
		libs.fs.outputFileSync(path.js_folder_path + '/datatable-init/' + obj.class_name_lowercase + '-datatable-init.js', template);
		console.log('Create file ' + obj.class_name_lowercase + '-datatable-init.js --> Ok.');

	} catch(err){
		console.log(error.datatable_init_error);
	    console.log(err.stack);
	}
}

function createCreate(obj){

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_create_path + '/create01.txt', 'utf8');
		template = template + '\n';		

		//create each form input field
		libs._.each(Object.keys(obj.attributes), function(attr){
			template = template + libs.fs.readFileSync(path.template_create_path + '/create02.txt', 'utf8') + '\n';
			template = template.replace(new RegExp('model_attr', 'g'), attr);
		});

		template = template + libs.fs.readFileSync(path.template_create_path + '/create03.txt', 'utf8') + '\n';

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.view_folder_path + '/' + obj.class_name_lowercase + '/create.ejs', template);
		console.log('Create view file create.ejs --> Ok.');

		validateCreateForm(obj);

	} catch(err){
		console.log(error.create_error);
	    console.log(err.stack);
	}
}

function validateCreateForm(obj){

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_validate_path + '/validateCreate01.txt', 'utf8');

		//remove not useful attributes for validation
		libs._.each(obj.attributes, function(attr){
			delete attr.type;
			delete attr.unique;
		});		

		template = template + JSON.stringify(obj.attributes);
		template = template + libs.fs.readFileSync(path.template_validate_path + '/validateCreate02.txt', 'utf8') + '\n';

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.js_folder_path + '/validation-init/' + obj.class_name_lowercase + '-validation-create-init.js', template);
		console.log('Create view file ' + obj.class_name_lowercase + '-validation-create-init.js create form --> Ok.');

	} catch(err){
		console.log(error.validate_create_error);
	    console.log(err.stack);
	}
}

function createUpdate(obj){

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_update_path + '/edit01.txt', 'utf8');
		template = template + '\n';		

		//create each form input field
		libs._.each(Object.keys(obj.attributes), function(attr){
			template = template + libs.fs.readFileSync(path.template_update_path + '/edit02.txt', 'utf8') + '\n';
			template = template.replace(new RegExp('model_attr', 'g'), attr);
		});

		template = template + libs.fs.readFileSync(path.template_update_path + '/edit03.txt', 'utf8') + '\n';

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.view_folder_path + '/' + obj.class_name_lowercase + '/edit.ejs', template);
		console.log('Create view file edit.ejs --> Ok.');

		validateUpdateForm(obj);

	} catch(err){
		console.log(error.update_error);
	    console.log(err.stack);
	}
}

function validateUpdateForm(obj){

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_validate_path + '/validateEdit01.txt', 'utf8');

		//remove not useful attributes for validation
		libs._.each(obj.attributes, function(attr){
			delete attr.type;
			delete attr.unique;
		});

		template = template + JSON.stringify(obj.attributes);
		template = template + libs.fs.readFileSync(path.template_validate_path + '/validateEdit02.txt', 'utf8') + '\n';

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.js_folder_path + '/validation-init/' + obj.class_name_lowercase + '-validation-edit-init.js', template);
		console.log('Create view file ' + obj.class_name_lowercase + '-validation-edit-init.js edit form --> Ok.');

	} catch(err){
		console.log(error.validate_create_error);
	    console.log(err.stack);
	}
}

function createShow(obj){

	try{

		//Preparing view
		var template = libs.fs.readFileSync(path.template_show_path + '/show01.txt', 'utf8');
		template = template + '\n';		

		//create each data row
		libs._.each(Object.keys(obj.attributes), function(attr){
			template = template + libs.fs.readFileSync(path.template_show_path + '/show02.txt', 'utf8') + '\n';
			template = template.replace(new RegExp('model_attr', 'g'), attr);
			template = template.replace(new RegExp('model_cap_attr', 'g'), libs._.capitalize(attr));
		});

		template = template + libs.fs.readFileSync(path.template_show_path + '/show03.txt', 'utf8') + '\n';

		//replace in template the tags		    
		template = template.replace(new RegExp('class_name_lowercase', 'g'), obj.class_name_lowercase);
		template = template.replace(new RegExp('class_name', 'g'), obj.class_name);

		//file creation		    
		libs.fs.outputFileSync(path.view_folder_path + '/' + obj.class_name_lowercase + '/show.ejs', template);
		console.log('Create view file show.ejs --> Ok.');

	} catch(err){
		console.log(error.update_error);
	    console.log(err.stack);
	}
}

function createValidation(){

}

function createLibsFolders(){

	try{
		//fonts
		libs.fs.copy(path.bootstrap_folder_path + '/fonts', path.assets_folder_path + '/fonts', { replace: false });
		console.log('Copy fonts --> Ok.');

		//js-plugins
		libs.fs.copy(path.libs_folder_path + '/js-plugins', path.assets_folder_path + '/js-plugins', { replace: false });
		console.log('Create folder and copy js-plugins --> Ok.');

		//styles
		libs.fs.copy(path.bootstrap_folder_path + '/css', path.assets_folder_path + '/styles', { replace: false });
		console.log('Copy bootstrap styles --> Ok.');

		//datatable init
		if(!libs.fs.existsSync(path.js_folder_path + '/datatable-init')){
			libs.fs.mkdirSync(path.js_folder_path + '/datatable-init');
			console.log('Create folder datatable-init --> Ok.');
		}
		else{
			console.log('Folder datatable-init exist --> Ok.');
		}
		
		//validation init
		if(!libs.fs.existsSync(path.js_folder_path + '/validation-init')){
			libs.fs.mkdirSync(path.js_folder_path + '/validation-init');
			console.log('Create folder validation-init --> Ok.');
		}
		else{
			console.log('Folder validation-init exist --> Ok.');
		}		
/*
		//breadcrumb init
		if(!libs.fs.existsSync(path.js_folder_path + '/breadcrumb-init')){
			libs.fs.mkdirSync(path.js_folder_path + '/breadcrumb-init');
			console.log('Create folder breadcrumb-init --> Ok.');
		}
		else{
			console.log('Folder breadcrumb-init exist --> Ok.');
		}		
*/
		//jquery
		libs.fs.copy(path.jquery_folder_path, path.js_folder_path + '/dependencies', { replace: false });
		console.log('Copy jquery and jquery.validation --> Ok.', '\n');

	} catch(err){
		console.log(error.cant_create_folder);
	    console.log(err.stack);
	}
}
