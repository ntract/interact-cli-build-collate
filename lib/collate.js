events.on("task:collate", function(options) {

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

	FileSystem.mkdir(options.build);

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
		console.log("Collate done.");
		events.emit("task:done", "collate");
	});

});