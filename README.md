# awesomecrud-js

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

###A `crud generator` for Sails.

The `awesomecrudjs` takes the data in the model (the model attributes) and generate the controller, the actions in the controller (e.g. index, create, createModel, edit, show, update, and destroy), and corresponding views of a Sails project.   The `awesomecrudjs` will also create and copy the files and folders needed (e.g. bootstrap, jquery, jquery-validator). 

### Requirements :
- node.js
- sails v0.12

### To install:

**Step 1:** 
```sh
Download `awesomecrudjs`.
```

**Step 2:** 
```sh
Copy `awesomecrudjs` folder in the root of your Sails project.
```

**Step 3** 
```sh
Open a console inside the `awesomecrudjs` folder. (/path-to-your-project/project_name/awesomecrudjs)
```

**Step 4** 
```sh
Generate!
```

### To generate:

##### On the command line

Generate only one model:
```sh
$ node crud_gen.js -m <name_of_the_model>
```

Or generate all the models:
```sh
$ node crud_gen.js -a
```

#####Example:

One model:
```sh
$ node crud_gen.js -m user
```
###One more thing:
Need to add the datatables css files and the corect order of the .js files in the pippeline.js file.

.css
```sh
var cssFilesToInject = [
  'styles/**/*.css', 

  //datatables css
  'js-plugins/dataTables/datatables.min.css',
];
```
.js
```sh
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Load jquery
  'js/dependencies/jquery-1.12.0.min.js',
  'js/dependencies/jquery.validate.min.js',

  //datatables  
  'js-plugins/datatable/datatables.min.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',

  //bootstrap
  'js/bootstrap.min.js', 

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  'js/**/*.js'
];
```
#####In order to use the breadcrumb system click [here breadcrumb.js] (https://github.com/SamyOteroGlez/breadcrumb.js)

#####Note: Tested with Sails v0.12

### Features
- [Twitter Bootstrap v3.3.6] (http://getbootstrap.com)
- [jQuery v1.12.0](https://jquery.com/) (c) [jQuery Foundation] (https://jquery.org/license/)
- [jQuery Validation Plugin v1.14.0] (http://jqueryvalidation.org) Copyright (c) 2015 Jörn Zaefferer Licensed MIT
- [DataTables] (https://www.datatables.net) designed and created by [SpryMedia Ltd] (https://sprymedia.co.uk/) © 2007-2016. [MIT licensed] (https://www.datatables.net/license/mit)
- [breadcrumb.js] (https://github.com/SamyOteroGlez/breadcrumb.js) [MIT License] (https://github.com/SamyOteroGlez/breadcrumb.js/blob/master/LICENSE)

### More Resources
- [Sails] (http://sailsjs.org/)
- [Stackoverflow](http://stackoverflow.com/questions/tagged/sails.js)
- [#sailsjs on Freenode](http://webchat.freenode.net/) (IRC channel)
- [Twitter](https://twitter.com/sailsjs)
- [Professional/enterprise](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#are-there-professional-support-options)
- [Tutorials](https://github.com/balderdashy/sails-docs/blob/master/FAQ.md#where-do-i-get-help)

### License

**[MIT License](./LICENSE)**
2016 [SamyOteroGlez](http://github.com/SamyOteroGlez) & contributors


