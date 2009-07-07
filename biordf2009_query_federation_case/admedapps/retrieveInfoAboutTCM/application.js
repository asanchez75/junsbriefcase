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


function initGeneFinder() {
	log("instantiate service for the gene-finder widget");
	var service = new admed.genetcm.Service("../../alzheimer-drug/data/tcm");
	log("instantiate a renderer for the tcm widget");
	var renderPane = document.getElementById("geneFinderWidget");
	var renderer = new admed.genetcm.GeneWidget.DefaultRenderer();
	renderer.setCanvas(renderPane);
	
	log("instantiate a tcm gene-finder widget");
	geneFinderwidget = new admed.genetcm.GeneWidget(service, renderer);	
};

function initDbpediaHerbWidget(){
	var dbpediaHerbService = new admed.dbherb.Service("../../alzheimer-drug/data/dbpedia");
	log("instantiate a renderer for the dbpediaHerb widget");
	var dbpediaHerbRenderPane = document.getElementById("dbpediaHerbWidget");
	var dbpediaHerbRenderer = new admed.dbherb.Widget.DefaultRenderer();
	dbpediaHerbRenderer.setCanvas(dbpediaHerbRenderPane);
	
	log("instantiate a dbpediaHerb widget");
	dbpediaHerbWidget = new admed.dbherb.Widget(dbpediaHerbService, dbpediaHerbRenderer);
};

function initDiseaseWidget(){
	log("instantiate service for the disease widget");
	var diseaseService = new admed.genesome.Service("../../alzheimer-drug/data/diseasome");
	
	log("instantiate a renderer for the disease widget");
	var diseaseRenderPane = document.getElementById("batchDiseaseWidget");
	var diseaseRenderer = new admed.genesome.BatchWidget.DefaultRenderer();
	diseaseRenderer.setCanvas(diseaseRenderPane);
	
	diseaseBatchWidget = new admed.genesome.BatchWidget(diseaseService, diseaseRenderer);
	
};


function initState () {
	var url = new String(window.location.href);
	var qi = url.indexOf("#query=");
    
    
    if (qi > 0) {
    	var qd = url.indexOf("&disease");
        var query = url.substring(qi+7,qd);
        query = query.replace(/%20/g, ' ')
        queryDisease = url.substring(qd+9,url.length);
        admed.debug("found query: "+query);
          
        widget.findMedicineFromDbpedia(query);
    }
    
    
};
	
function initialiseApplication() {
	
	var logReader = new YAHOO.widget.LogReader("logger");
	
	initHerbFinder();
	
	initEffectWidget();
	
	initTrialWidget();
//	
	initDbpediaHerbWidget();
	
	initGeneFinder();
	
	initDiseaseWidget();
	
	initState();
//	
	geneFinderwidget.subscribe("GENEFOUND", onGeneFound, null);	
	widget.subscribe("HERBSFOUND", onHerbsFound, null);
	effectWidget.subscribe("TVALUECHANGED", onTvalueChanged, null);
		
	log("hook form submission to widget call");
	YAHOO.util.Event.addListener("effectqueryForm", "submit", onEffectFormSubmit);
		
	log("application loaded, showing main pane");
	admed.mvcutils.hide(document.getElementById("loadingPane"));
	admed.mvcutils.show(document.getElementById("applicationPane"));
	
	
};

function onEffectFormSubmit(event){
	log("effect form submitted");
	var select = document.getElementById("effectSelection").value;
	
	log("effect query: "+select + " for herb : " + herb);
	
	// call the effect widget service
	effectWidget.setSelectTvalue(select);
};

function onTvalueChanged (type, args){
	log("effect value changed");
	var value = args[0];
	log ("new effect value: " + value);
	effectWidget.findEffectByMedicineNameWithConfidence(value, herb);
	
};

function onGeneFound(type, args){
	var genes = args[0];
	log ("Find gene " + genes[0].geneURL);
	
	var diseasomeGeneIDs = new Array();
	
	for (var i in genes){
		
		var diseasomegene = genes[i].diseasesomegene;
		if (diseasomegene){
			log ("Append a gene " + genes[i].diseasesomegene);
			admed.util.appendIfNotMember(diseasomeGeneIDs, genes[i].diseasesomegene);
		}
	}
	
	diseaseBatchWidget.findDiseaseAssociatedWithGeneBatch(diseasomeGeneIDs);
};

function onHerbsFound(type, args){
	var herbs = args[0];
	log ("Find herb " + herbs[0].fullmedicineURL);
	herb = 	herbs[0].fullmedicineURL;
	var herbname = herbs[0].herbname;
	var dbherb = herbs[0].herbFromDbpedia;
	effectWidget.findEffectByMedicineName(herb);
	trialWidget.findTrialsForMedicine(herbname);
//	admed.debug("found query disease: "+queryDisease);
	geneFinderwidget.findGenesAssociatedWithMedicineForDisease(herb, queryDisease);
	dbpediaHerbWidget.findMedicineFromDbpedia(dbherb);
};

YAHOO.util.Event.onDOMReady(initialiseApplication);