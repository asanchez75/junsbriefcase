
admed.namespace("admed.genesome");
 
 

/*
 * ----------------------------------------------------------------
 *                             WIDGET
 * ----------------------------------------------------------------
 */







admed.genesome.BatchWidget = function( service, renderer ) {
    var _context = "admed.genesome.BatchWidget";
    try {
        
        admed.debug("call private constructor", _context);
        this.__init__(service, renderer);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
    
}



 
 



/** @private */
admed.genesome.BatchWidget.prototype._controller = null;

/**
 * @private
 * @type admed.mvcutils.GenericModel2
 */ 
admed.genesome.BatchWidget.prototype._model = null;

/**
 * @private
 */
admed.genesome.BatchWidget.prototype._renderer = null;

/**
 * @private
 */
admed.genesome.BatchWidget.prototype._service = null;










/**
 * @private
 */
admed.genesome.BatchWidget.prototype.__init__ = function( service, renderer ) {
    var _context = "admed.genesome.BatchWidget.prototype.__init__";
    try {
        
        this._service = service;
        this._renderer = renderer;
        
        admed.debug("create a model", _context);
        this._model = new admed.mvcutils.GenericModel2();
        this._model.setDefinition(admed.genesome.BatchWidget.modelDefinition);
        
        admed.debug("create a controller", _context);
        this._controller = new admed.genesome.BatchWidget.Controller(this._model, service, this);
        
        admed.debug("connect the renderer to the model", _context);
        this._renderer.connect(this._model);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};







/**
 * @public
 * @param {Array<String>} querynames
 * @param {Array<admed.flybase.Gene>} genes
 */
admed.genesome.BatchWidget.prototype.findDiseaseAssociatedWithGeneBatch = function( geneURLs ) {
    var _context = "admed.genesome.BatchWidget.prototype.findDiseaseAssociatedWithGeneBatch";
    try {
        
        admed.debug("pass ["+geneURLs+"] through to controller", _context);
        this._controller.findDiseaseAssociatedWithGeneBatch(geneURLs);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};







/*
 * ----------------------------------------------------------------
 *                             CONTROLLER
 * ----------------------------------------------------------------
 */






/**
 * @class
 */
admed.genesome.BatchWidget.Controller = function( model, service, controllee ) {
    var _context = "admed.genesome.BatchWidget.Controller";
    try {
        
        this._model = null;
        this._service = null;
        this._controllee = null;
        
        admed.debug("call private constructor", _context);
        this.__init__(model, service, controllee);        
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};








/**
 * @private
 */
admed.genesome.BatchWidget.Controller.prototype.__init__ = function( model, service, controllee ) {
    var _context = "admed.genesome.BatchWidget.Controller.prototype.__init__";
    try {
        
        this._model = model;
        this._service = service;
        this._controllee = controllee;
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};








/**
 * @public
 */
admed.genesome.BatchWidget.Controller.prototype.findDiseaseAssociatedWithGeneBatch = function( geneURLs ) {
    var _context = "admed.genesome.BatchWidget.Controller.prototype.findDiseaseAssociatedWithGeneBatch";
    try {
        
        admed.info("findDiseaseAssociatedWithGeneBatch: "+geneURLs, _context);
        admed.debug("pass through to private implementation", _context);
        this._findDiseaseAssociatedWithGeneBatch(geneURLs, this._findDiseaseByGeneBatchSuccess(), this._findDiseaseByGeneBatchFailure());
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};








/**
 * @private
 */
admed.genesome.BatchWidget.Controller.prototype._findDiseaseAssociatedWithGeneBatch = function( geneURLs, success, failure ) {
    var _context = "admed.genesome.BatchWidget.Controller.prototype._findDiseaseAssociatedWithGeneBatch";
    try {
        
        admed.debug("querynames: "+geneURLs, _context);
               
        admed.debug("set state pending", _context);
        this._model.set("STATE", "PENDING");
        
        admed.debug("set model property query", _context);
        this._model.set("QUERY", [geneURLs]);

        admed.debug("set result null", _context);
        this._model.set("RESULTS", null);
        
        admed.debug("kick off request: "+geneURLs, _context);
        this._service.findDiseaseAssociatedWithGeneBatch(geneURLs, success, failure);        
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};









/**
 * @private
 */
admed.genesome.BatchWidget.Controller.prototype._findDiseaseByGeneBatchSuccess = function() {
    var _context = "admed.genesome.BatchWidget.Controller.prototype._findDiseaseByGeneBatchSuccess";
    var self = this;
    /**
     */
    return function( results ) {
        try {
            
            admed.info("request success", _context);
            
            admed.debug("set model results", _context);
            self._model.set("RESULTS", results);
            
            // result is a map (geneURL, diseaseArray)
            admed.debug("set model state", _context);
            self._model.set("STATE", "READY");
                        
        } catch (unexpected) {
            admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
            throw unexpected;    
        }
    };
};







/**
 * @private
 */
admed.genesome.BatchWidget.Controller.prototype._findDiseaseByGeneBatchFailure = function() {
    var _context = "admed.genesome.BatchWidget.Controller.prototype._findDiseaseByGeneBatchFailure";
    var self = this;
    /**
     * @param {ResponseObject} response
     */
    return function( response ) {
        try {
            
            admed.err("request failed: "+response.status+" "+response.statusText, _context);
            
            self._model.set("STATE", "SERVERERROR");
            
        } catch (unexpected) {
            admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
            throw unexpected;    
        }
    };
};







/*
 * ----------------------------------------------------------------
 *                             MODEL DEFINITION
 * ----------------------------------------------------------------
 */





/** 
 * @type Object
 */
admed.genesome.BatchWidget.modelDefinition = {

    properties : [ "STATE", "RESULTS", "QUERY" ],
    
    values : {
        "STATE" : [ "READY", "PENDING", "SERVERERROR", "UNEXPECTEDERROR" ]
    },
    
    initialize : function( data ) {
        data["STATE"] = "READY";
        data["RESULTS"] = null;
        data["QUERY"] = null;
    }

};







/*
 * ----------------------------------------------------------------
 *                             DEFAULT RENDERER
 * ----------------------------------------------------------------
 */







admed.genesome.BatchWidget.DefaultRenderer = function() {};


/** 
 * @private 
 * @type Element
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._canvas = null;

/**
 * @private 
 * @type Element
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private 
 * @type Element
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private 
 * @type Element
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._resultsPane = null;






/**
 * Set the DOM element to which this renderer applies and initialise it.
 * @param {Element} canvas
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype.setCanvas";
    try {
        
        admed.debug("set canvas", _context);
        this._canvas = canvas
        this._initCanvas();
        
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};






/**
 * @private
 * @param {Element} canvas
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._initCanvas = function() {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._initCanvas";
    try {
        
        admed.debug("begin init canvas", _context);
        
        var canvas = this._canvas;
        		
		YAHOO.util.Dom.addClass(this._canvas, "batchDiseaseWidget");
	    
	    // set up the pending pane
        this._pendingPane = document.createElement("p");
        this._pendingPane.innerHTML = "pending...";
        this._canvas.appendChild(this._pendingPane);
        YAHOO.util.Dom.addClass(this._pendingPane, "pendingPane");
        admed.mvcutils.hide(this._pendingPane);
	    
	    // set up the message pane
	    this._messagePane = document.createElement("div");
	    this._messagePane.innerHTML = "this should never be displayed";
	    this._canvas.appendChild(this._messagePane);
	    YAHOO.util.Dom.addClass(this._messagePane, "messagePane");
	    admed.mvcutils.hide(this._messagePane);
	    
	    // setup results summary pane
	    this._resultsSummaryPane = document.createElement("p");
	    this._canvas.appendChild(this._resultsSummaryPane);
	    YAHOO.util.Dom.addClass(this._resultsSummaryPane, "resultsSummaryPane");
	    admed.mvcutils.hide(this._resultsSummaryPane);
	    
	    // setup results pane
	    this._resultsPane = document.createElement("div");
	    this._canvas.appendChild(this._resultsPane);
	    YAHOO.util.Dom.addClass(this._resultsPane, "resultsPane");
	    admed.mvcutils.hide(this._resultsPane);
	           

        admed.debug("init canvas done", _context);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};





/**
 * @public
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype.connect = function( model ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype.connect";
    try {
        
        admed.debug("connect to model", _context);
        model.subscribeAll(this._onModelChanged, this);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};





/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._onModelChanged = function( type, args, self ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._onModelChanged";
    try {
        
        var handlers = {
            "STATE":"_onStateChanged",
            "QUERY":"_onQueryChanged",
            "RESULTS":"_onResultsChanged"
        };
        var handler = handlers[type];
        admed.debug("call model changed handler: "+handler, _context);
        self[handler](args[0], args[1], args[2]);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};






/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._onQueryChanged = function( from, to, get ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._onQueryChanged";
    try {
        
        // do nothing, we will access the value later
        admed.debug("query changed from "+from+" to "+to, _context);
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};






/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._onStateChanged";
    try {
        
        admed.debug("state changed from "+from+" to "+to, _context);

        if ( to == "PENDING" ) {
        	admed.mvcutils.show(this._pendingPane);
		    admed.mvcutils.hide(this._resultsSummaryPane);
		    admed.mvcutils.hide(this._resultsPane);
        }
        else if ( to == "READY" ) {
        	admed.mvcutils.hide(this._pendingPane);
		    admed.mvcutils.show(this._resultsSummaryPane);
		    admed.mvcutils.show(this._resultsPane);                   
        } 
        else if ( to == "SERVERERROR" || to == "UNEXPECTEDERROR" ) {
        	admed.mvcutils.hide(this._pendingPane);
		    admed.mvcutils.hide(this._resultsSummaryPane);
		    admed.mvcutils.hide(this._resultsPane);
    
        } 
        else {
            // this should never happen
            throw {message:"invalid state: "+to};
        }
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};






/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._onResultsChanged = function( from, to, get ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._onResultsChanged";
    try {
        
        admed.debug("results changed to: "+to, _context);
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
        
        admed.debug("render the results summary", _context);
	    
        
        if (to != null) {
             
            admed.debug("render results summary", _context);
            this._renderResultsSummary(to);
    
            admed.debug("render results", _context);
            this._renderResults(to);        
            
        }
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};









/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._renderResultsSummary = function( results ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._renderResultsSummary";
    try {
        
        admed.debug("render results summary", _context);

        var count = 0;
        
        for (var keyGene in results) {
            admed.debug("counting diseases for "+keyGene, _context);
            count += results[keyGene].length;               
        }
        
        var content = "found "+count+" diseases from <a href='http://www.fly-ted.org'>Diseasome</a> ...";

        this._resultsSummaryPane.innerHTML = content;
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};








/**
 * @private
 */
admed.genesome.BatchWidget.DefaultRenderer.prototype._renderResults = function( results ) {
    var _context = "admed.genesome.BatchWidget.DefaultRenderer.prototype._renderResults";
    try {
        admed.debug("render results", _context);

        // query has both anyNames + geneObjects
        
       
        
        var content = "<table>";

        content += "<thead><tr><th>gene</th><th>associated diseases</th></tr></thead><tbody>";
        
        for (var keyGene in results) {
            admed.debug("counting diseases for "+keyGene, _context);
            content += "<tr><td>" + keyGene + "</td><td>";
            
            var diseases = results[keyGene];
            
            for (var i=0; i < diseases.length; i++){
            	var disease = diseases[i];
            	var diseasename = disease.diseaseName;
            	var diseaseURL = disease.diseaseURL;
            	
            	admed.debug("found disease "+disease+" in result for gene "+keyGene, _context);
            	admed.debug("found disease "+diseaseURL+" in result for gene "+keyGene, _context);
            	content +=   "<div class=\"result\">";
	    		content +=          "<p><a href=\"" + keyGene + "\">" + diseasename + "</a></p>";
			    content +=      "</div>";
            } 
            content += "</td></tr>";
        }
        
        content += "</tbody></table>";
        
        admed.debug("results pane content: "+content, _context);
        this._resultsPane.innerHTML = content;
        
        
    } catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }
};




























