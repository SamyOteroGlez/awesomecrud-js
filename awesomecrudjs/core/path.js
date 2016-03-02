/**
 * path.js
 *
 * @description :: Load all the path.
 *
 */

var libs = require('./lib_loader.js');

module.exports = {

	class_name: 'path',

	/**
	*	Awesomecrudjs path
	*/

	//template folder
	template_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates')), 
	template_folder_path: libs.path.resolve(__dirname, '..', './templates'), 

	//controller template
	template_controller: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/controller')), 
	template_controller_path: libs.path.resolve(__dirname, '..', './templates/controller'),

	//index template
	template_index: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/index')), 
	template_index_path: libs.path.resolve(__dirname, '..', './templates/index'),

	//create template
	template_create: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/create')), 
	template_create_path: libs.path.resolve(__dirname, '..', './templates/create'),

	//update template
	template_update: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/update')), 
	template_update_path: libs.path.resolve(__dirname, '..', './templates/update'),

	//show template
	template_show: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/show')), 
	template_show_path: libs.path.resolve(__dirname, '..', './templates/show'),

	//breadcrumb template
	template_breadcrumb: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/breadcrumb')), 
	template_breadcrumb_path: libs.path.resolve(__dirname, '..', './templates/breadcrumb'),

	//datatable template
	template_datatable: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/datatable')), 
	template_datatable_path: libs.path.resolve(__dirname, '..', './templates/datatable'),

	//validate template
	template_validate: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './templates/validate')), 
	template_validate_path: libs.path.resolve(__dirname, '..', './templates/validate'),

	//libs folder
	libs_folder:libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './front_end_libs')), 
	libs_folder_path: libs.path.resolve(__dirname, '..', './front_end_libs'),

	//bootstrap folder
	bootstrap_folder:libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './front_end_libs/bootstrap')), 
	bootstrap_folder_path: libs.path.resolve(__dirname, '..', './front_end_libs/bootstrap'),

	//jquery folder
	jquery_folder:libs.fs.readdirSync(libs.path.resolve(__dirname, '..', './front_end_libs/jquery')), 
	jquery_folder_path: libs.path.resolve(__dirname, '..', './front_end_libs/jquery'),


	/**
	*	Framework path
	*/

	//model folder
	model_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './api/models')),
	model_folder_path: libs.path.resolve(__dirname, '..', '..', './api/models'), 

	//controller folder
	controller_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './api/controllers')), 
	controller_folder_path: libs.path.resolve(__dirname, '..', '..', './api/controllers'),

	//view folder
	view_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './views')), 
	view_folder_path: libs.path.resolve(__dirname, '..', '..', './views'),

	//assets folder
	assets_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './assets')), 
	assets_folder_path: libs.path.resolve(__dirname, '..', '..', './assets'),

	//styles folder
	styles_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './assets/styles')), 
	styles_folder_path: libs.path.resolve(__dirname, '..', '..', './assets/styles'),

	//js folder
	js_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './assets/js')), 
	js_folder_path: libs.path.resolve(__dirname, '..', '..', './assets/js'),

	//dependencies folder
	dependencies_folder: libs.fs.readdirSync(libs.path.resolve(__dirname, '..', '..', './assets/js/dependencies')), 
	dependencies_folder_path: libs.path.resolve(__dirname, '..', '..', './assets/js/dependencies'),

}; 
