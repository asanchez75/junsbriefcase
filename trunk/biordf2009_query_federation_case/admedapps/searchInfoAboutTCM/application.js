/**
 * @fileoverview
 * TODO doc me
 */

function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	log("instantiate service for the widget");
	var service = new admed.tcm.Service("../../alzheimer-drug/data/tcm");
	var effectService = new admed.effecttcm.Service("../../alzheimer-drug/data/tcm");
	var trialService = new admed.linkedct.Service("../../alzheimer-drug/data/linkedct");
	var geneService = new admed.genetcm.Service("../../alzheimer-drug/data/tcm");
	
	log("instantiate a renderer for the tcm widget");
	var renderPane = document.getElementById("tcmWidget");
	var renderer = new admed.tcm.Widget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a renderer for the effect-tcm widget");
	var effectRenderPane = document.getElementById("effectTcmWidget");
	var effectRenderer = new admed.effecttcm.Widget.DefaultRenderer();
	effectRenderer.setCanvas(effectRenderPane);
		
	log("instantiate a renderer for the clinical trial widget");
	var trialRenderPane = document.getElementById("trialWidget");
	var trialRenderer = new admed.linkedct.Widget.DefaultRenderer();
	trialRenderer.setCanvas(trialRenderPane);
	
	log("instantiate a renderer for the gene widget");
	var geneRenderPane = document.getElementById("geneWidget");
	var geneRenderer = new admed.genetcm.Widget.DefaultRenderer();
	geneRenderer.setCanvas(geneRenderPane);
	
	log("instantiate a tcm widget");
	widget = new admed.tcm.Widget(service, renderer);
	
	log("instantiate a effect-tcm widget");
	effectWidget = new admed.effecttcm.Widget(effectService, effectRenderer);
	
	log("instantiate a trial widget");
	trialWidget = new admed.linkedct.Widget(trialService, trialRenderer);
	
	log("instantiate a gene widget");
	geneWidget = new admed.genetcm.Widget(geneService, geneRenderer);
	
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
	effectWidget.findEffectByMedicineName(query);
	trialWidget.findTrialsForMedicine(query);
	geneWidget.findGenesAssociatedWithMedicine(query);
}

YAHOO.util.Event.onDOMReady(initialiseApplication);