events.on("task:collate", function(task, options) {

	//load all backend/routes
	var globs = new GlobCollection([
		"**",
		"*"
	]);
	var treecontext = new TreeContext({
	    files: true,
	    dirs: true,
	    cache: true
	});

	FileSystem.mkdir(options.build, {norel:true});

	var exclude = [
		"!_plugins.css",
		"!_plugins.js",
		"!**/"+cli.plugins_dirname
	];

	FileSystem.remove(options.build, exclude);

	Tree.clearCache();

	FileSystem.collate(options.src, options.build, "/root/", [
		"**/root/*",
		"**/root/**",
		"!**/res",
		"!**/cfg"
	], exclude, function() {
		task.success();
	});

});