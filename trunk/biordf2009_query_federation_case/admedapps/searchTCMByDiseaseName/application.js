/**
 * @fileoverview
 * TODO doc me
 */

function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	log("instantiate a service for the tcm widget");
	var service = new admed.tcm.Service("../../alzheimer-drug/data/tcm");
	
	log("instantiate a renderer for the tcm widget");
	var renderPane = document.getElementById("tcmWidget");
	var renderer = new admed.tcm.Widget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a tcm widget");
	widget = new admed.tcm.Widget(service, renderer);
	
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
	
	widget.findMedicinesByDiseaseName(query);
}

YAHOO.util.Event.onDOMReady(initialiseApplication);