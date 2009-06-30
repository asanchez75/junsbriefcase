
function initAtagWidget(){
	log("instantiate service for the atags widget");
	var atagsService = new admed.atags.Service("../../alzheimer-drug/data/atags");
	
	log("instantiate a renderer for the atags widget");
	var atagsRenderPane = document.getElementById("atagsWidget");
	var atagsRenderer = new admed.atags.Widget.DefaultRenderer();
	atagsRenderer.setCanvas(atagsRenderPane);
	
//	log("instantiate a atags widget");
	atagsWidget = new admed.atags.Widget(atagsService, atagsRenderer);
	
};



function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	initAtagWidget();
	
	log("hook form submission to widget call");
	YAHOO.util.Event.addListener("queryForm", "submit", onFormSubmit);
	
	log("application loaded, showing main pane");
	admed.mvcutils.hide(document.getElementById("loadingPane"));
	admed.mvcutils.show(document.getElementById("applicationPane"));
}

function onFormSubmit(event) {
	log("form submitted");
	
	var query = document.getElementById("queryInput").value;
	log("query: "+query);
	
	atagsWidget.findAtagsForMedicine(query);
}


YAHOO.util.Event.onDOMReady(initialiseApplication);