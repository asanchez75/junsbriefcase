function initHerbFinder() {
	log("instantiate service for the widget");
	var service = new admed.herbtcm.Service("../../alzheimer-drug/data/tcm");
	log("instantiate a renderer for the tcm widget");
	var renderPane = document.getElementById("tcmWidget");
	var renderer = new admed.herbtcm.Widget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a tcm widget");
	widget = new admed.herbtcm.Widget(service, renderer);	
};

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
	
	initHerbFinder();
	initAtagWidget();
	
	log("hook form submission to widget call");
	widget.subscribe("HERBSFOUND", onHerbsFound, null);
	YAHOO.util.Event.addListener("queryForm", "submit", onFormSubmit);
	
	
	log("application loaded, showing main pane");
	admed.mvcutils.hide(document.getElementById("loadingPane"));
	admed.mvcutils.show(document.getElementById("applicationPane"));
}

function onFormSubmit(event) {
	log("form submitted");
	
	var query = document.getElementById("queryInput").value;
	log("query: "+query);
	

	widget.findMedicineFromDbpedia(query);
}

function onHerbsFound(type, args){
	var herbs = args[0];
	log ("Find herb " + herbs[0].fullmedicineURL);
	herb = 	herbs[0].fullmedicineURL;
	
	var dbherb = herbs[0].herbFromDbpedia;
	atagsWidget.findAtagsForMedicine(dbherb);
	
}


YAHOO.util.Event.onDOMReady(initialiseApplication);