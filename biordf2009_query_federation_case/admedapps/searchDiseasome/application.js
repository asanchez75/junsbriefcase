/**
 * @fileoverview
 * TODO doc me
 */

function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	log("instantiate a service for the tcm widget");
	var service = new admed.genesome.Service("../../alzheimer-drug/data/diseasome");
	
	log("instantiate a renderer for the disease widget");
	var renderPane = document.getElementById("diseaseWidget");
	var renderer = new admed.genesome.Widget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a tcm widget");
	diseaseWidget = new admed.genesome.Widget(service, renderer);
	
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
	
	diseaseWidget.findDiseaseAssociatedWithGene(query);
}

YAHOO.util.Event.onDOMReady(initialiseApplication);