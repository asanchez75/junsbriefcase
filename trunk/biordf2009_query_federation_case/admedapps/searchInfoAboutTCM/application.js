/**
 * @fileoverview
 * TODO doc me
 */

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

function initEffectWidget(){
	var effectService = new admed.effecttcm.Service("../../alzheimer-drug/data/tcm");
	
	log("instantiate a renderer for the effect-tcm widget");
	var effectRenderPane = document.getElementById("effectTcmWidget");
	var effectRenderer = new admed.effecttcm.Widget.DefaultRenderer();
	effectRenderer.setCanvas(effectRenderPane);
	
	log("instantiate a effect-tcm widget");
	effectWidget = new admed.effecttcm.Widget(effectService, effectRenderer);
	
};

function initTrialWidget(){
	var trialService = new admed.linkedct.Service("../../alzheimer-drug/data/linkedct");
			
	log("instantiate a renderer for the clinical trial widget");
	var trialRenderPane = document.getElementById("trialWidget");
	var trialRenderer = new admed.linkedct.Widget.DefaultRenderer();
	trialRenderer.setCanvas(trialRenderPane);
	
	log("instantiate a trial widget");
	trialWidget = new admed.linkedct.Widget(trialService, trialRenderer);
};


function initGeneWidget(){
	var geneService = new admed.genetcm.Service("../../alzheimer-drug/data/tcm");
	log("instantiate a renderer for the gene widget");
	var geneRenderPane = document.getElementById("geneWidget");
	var geneRenderer = new admed.genetcm.Widget.DefaultRenderer();
	geneRenderer.setCanvas(geneRenderPane);
	
	log("instantiate a gene widget");
	geneWidget = new admed.genetcm.Widget(geneService, geneRenderer);
};

function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	initHerbFinder();
	
	initEffectWidget();
	
	initTrialWidget();
	
	widget.subscribe("HERBSFOUND", onHerbsFound, null);
	
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
	
	widget.findMedicineFromDbpedia(query);
}

function onHerbsFound(type, args){
	var herbs = args[0];
	log ("Find herb " + herbs[0].fullmedicineURL);
	var herb = 	herbs[0].fullmedicineURL;
	var herbname = herbs[0].herbname;
	effectWidget.findEffectByMedicineName(herb);
	trialWidget.findTrialsForMedicine(herbname);
	geneWidget.findGenesAssociatedWithMedicine(herb);
}

YAHOO.util.Event.onDOMReady(initialiseApplication);