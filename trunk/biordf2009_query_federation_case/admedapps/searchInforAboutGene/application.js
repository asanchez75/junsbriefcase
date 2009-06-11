/**
 * @fileoverview
 * TODO doc me
 */

function initGeneFinder() {
	log("instantiate service for the gene-finder widget");
	var service = new admed.genetcm.Service("../../alzheimer-drug/data/tcm");
	log("instantiate a renderer for the tcm widget");
	var renderPane = document.getElementById("geneFinderWidget");
	var renderer = new admed.genetcm.GeneWidget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a tcm gene-finder widget");
	widget = new admed.genetcm.GeneWidget(service, renderer);	
};

function initDiseaseWidget(){
	log("instantiate service for the disease widget");
	var diseaseService = new admed.genesome.Service("../../alzheimer-drug/data/diseasome");
	
	log("instantiate a renderer for the disease widget");
	var diseaseRenderPane = document.getElementById("diseaseWidget");
	var diseaseRenderer = new admed.genesome.Widget.DefaultRenderer();
	diseaseRenderer.setCanvas(diseaseRenderPane);
	
	log("instantiate a disease widget");
	diseaseWidget = new admed.genesome.Widget(diseaseService, diseaseRenderer);
	
};



function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	initGeneFinder();
	
//	initDiseaseWidget();
	
	log("subscribe to the widget-level listerner");
	
	widget.subscribe("GENEFOUND", onGeneFound, null);
//	diseaseWidget.subscribe("DISEASESFOUND", onDiseasesFound, null);
	
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
	
	widget.findGenesAssociatedWithMedicine(query);
}

//function onDiseasesFound(type, args){
//	var diseases = args[0];
//	log ("Find diseases " + diseases[0].diseaseURL);
//	
//	diseaseRenderer._resultPane.innerHTML = diseaseRenderer._diseasesToDivHTML(diseases);
//	
//}

function onGeneFound(type, args){
	var genes = args[0];
	log ("Find gene " + genes[0].geneURL);
	
	for (var i in genes){
		var gene = genes[i];
		var diseasomeGene = gene.diseasesomegene;
		if (diseasomeGene){
			log("instantiate service for the disease widget");
			var diseaseService = new admed.genesome.Service("../../alzheimer-drug/data/diseasome");
			
			log("instantiate a renderer for the disease widget");
			var diseaseRenderPane = document.getElementById("diseaseWidget");
			var diseaseRenderer = new admed.genesome.Widget.DefaultRenderer();
			diseaseRenderer.setCanvas(diseaseRenderPane);
			
			log("instantiate a disease widget");
			diseaseWidget = new admed.genesome.Widget(diseaseService, diseaseRenderer);
			diseaseWidget.findDiseaseAssociatedWithGene(diseasomeGene);
		}
	}	
}

YAHOO.util.Event.onDOMReady(initialiseApplication);