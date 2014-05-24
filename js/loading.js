//For: MarioPong
//File Name: loading.js
//Last Modified: Dec 5, 2012
//Purpose: loading function

function loading() {
	$("<div>").addClass("loading-visible").attr("id", "loading").appendTo("body");
	var loaded = function() {
		$("#loading").attr("class", "loading-invisible");
                animloop();
        };
	window.onload = loaded;
};

loading();

