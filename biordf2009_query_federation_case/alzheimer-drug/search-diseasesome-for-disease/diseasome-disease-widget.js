// create a namespace if not already defined
admed.namespace("admed.genesome");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.genesome.Service} service the service to use to fetch data
 * @param {admed.genesome.DefaultRenderer} renderer the renderer to use
 */
admed.genesome.Widget = function( service, renderer ) {

	try {
		var that = this;
		
		/** @private */
		this._controller = null;
		
		/** @private */
		this._renderer = renderer;
		
		this._model = null;
		
		this._renderer = null;
    
    	this._service = null;
		
		this._init = function() {
			// create a model
			var model = new admed.mvcutils.GenericModel2();
			model.setDefinition(admed.genesome.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.genesome.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Widget", error);
    }	
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.genesome.Widget.prototype.findDiseaseAssociatedWithGene = function( gene ) {
	// pass through to controller
	try {
		this._controller.findDiseaseAssociatedWithGene(gene);
	}catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Widget.prototype.findDiseaseAssociatedWithGene", error);
    }
};


/*
 * --------------------------------------------------
 * CONTROLLER
 * --------------------------------------------------
 */


/**
 * Create a controller for a flyted image widget.
 * @class
 * A controller class for the flyted image widget internal MVC.
 * @constructor
 * @param {admed.mvcutils.GenericModel2} model the model to store widget state data
 * @param {admed.genesome.Service} service the service to use to fetch data
 * @param {admed.genesome.Widget} widget the widget to control
 */
admed.genesome.Widget.Controller = function( model, service, widget ) {
	
	var that = this;
	
	/**
	 * @private
	 */
	this._model = model;
	
	/**
	 * @private
	 */
	this._service = service;
	
	/**
	 * @private
	 */
	this._parent = widget;
	
	
	/**
	 * @private
	 * Success case callback.
	 * @param {Array<admed.genesome.Image>} images
	 */	
	this._findDiseasesSuccess = function( diseases ) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", diseases);
			
			// set the state
			that._model.set("STATE", "READY");
		}catch (error) {
        	throw new admed.UnexpectedException("_findDiseasesSuccess", error);
    	}

	};
	
	
	/**
	 * @private
	 * Failure case callback.
	 * @param {Object} response the HTTP response (YUI)
	 */	
	this._findDiseasesFailure = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from TCM, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findDiseasesFailure", error);
    	}		
	};
	
};


admed.genesome.Widget.Controller.prototype.findDiseaseAssociatedWithGene = function( gene ) {
	try {
		// pass through to private implementation
		this._findDiseaseAssociatedWithGene(gene, this._findDiseasesSuccess, this._findDiseasesFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.Controller.prototype._findDiseaseAssociatedWithGene", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} medicineName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.genesome.Widget.Controller.prototype._findDiseaseAssociatedWithGene = function( gene, success, failure ) {
	try {
		admed.info("admed.genesome.Widget.Controller._findDiseaseAssociatedWithGene :: request: "+gene);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", gene);
		
		// kick off the request
		this._service.findDiseaseAssociatedWithGene(gene, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.Controller.prototype._findDiseaseAssociatedWithGene", error);
    }
};

/*
 * --------------------------------------------------
 * MODEL DEFINITION
 * --------------------------------------------------
 */


/**
 * Definition of flyted Widget model.
 */
admed.genesome.Widget.modelDefinition = {

	properties : [ "STATE", "RESULTS", "QUERY", "ERRORMESSAGE" ],
	
	values : {
		"STATE" : [ "PENDING", "READY", "SERVERERROR", "UNEXPECTEDERROR" ]
	},
	
	initialize : function( data ) {
		data["STATE"] = "READY";
		data["RESULTS"] = null;
		data["QUERY"] = null;
		data["ERRORMESSAGE"] = null;
	}

};


/*
 * --------------------------------------------------
 * DEFAULT RENDERER
 * --------------------------------------------------
 */


/**
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._initCanvas = function() {
	try {
	    YAHOO.util.Dom.addClass(this._canvas, "geneWidget");
	    
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
	    
	}catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.genesome.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
    try {
	    var handlers = {
	        "STATE":"_onStateChanged",
	        "QUERY":"_onQueryChanged",
	        "RESULTS":"_onResultsChanged",
	        "ERRORMESSAGE":"_onErrorMessageChanged"
	    };
	    var handler = handlers[type];
	    admed.debug("handler: "+handler);
	    // call the handler
	    self[handler](args[0], args[1], args[2]);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.genesome.Widget.DefaultRenderer.prototype._onStateChanged";
    try {
	    if ( to == "PENDING" ) {
		    admed.mvcutils.show(this._pendingPane);
		    admed.mvcutils.hide(this._messagePane);
		    admed.mvcutils.hide(this._resultsSummaryPane);
		    admed.mvcutils.hide(this._resultsPane);
            
		} 
		else if (to == "READY") {
		    admed.mvcutils.hide(this._pendingPane);
		    admed.mvcutils.hide(this._messagePane);
		    admed.mvcutils.show(this._resultsSummaryPane);
		    var results = get("RESULTS");
		    admed.debug("results: "+results, _context);
		    admed.debug("results length: "+results.length, _context)
		    if (results.length>0) {
                admed.mvcutils.show(this._resultsPane);     
		    }
		}
		else if ( to == "SERVERERROR" || to == "UNEXPECTEDERROR" ) {
		    admed.mvcutils.hide(this._pendingPane);
		    admed.mvcutils.show(this._messagePane);
		    admed.mvcutils.hide(this._resultsSummaryPane);
		    admed.mvcutils.hide(this._resultsPane);         
		} 
		else {
		    // this should never happen
	    	throw {name:"admed.genesome.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.genesome.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
	    
	    if (to.length > 0) {

	        admed.debug("render the results "+to.length, _context);
	        this._resultsPane.innerHTML = this._diseasesToDivHTML(to); 
	
	    }
	    else {
//	        admed.info("hide results and explanation panes", _context);
//	        admed.mvcutils.hide(this._resultsPane);
//            admed.mvcutils.hide(this._explanationPane);
	    }
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }

};
  
  
/**
 * @private
 */
admed.genesome.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.genesome.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.genesome.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "Find <span>";
	    content += count;
	    content += "</span> disease";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://www4.wiwiss.fu-berlin.de/diseasome/'>RDF Diseasome</a> associated with ";
	    content += "gene <span>'"+query+"'</span>";
	    	    
	    this._resultsSummaryPane.innerHTML = content;
	    
	    
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};

/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._diseasesToDivHTML = function( diseases ) {

    try {
	    // build the divs
	    
	    admed.debug("build div content for diseases "+diseases.length);
	    var content = "";
	    content += "<table>";
	    content += "<tr><th>Predicted associated diseases</th><th>isSubTypeOf</th><th>is associated with Alzheimer</tr>";
	    
	    for ( var i in diseases ) {
	        
	        content += this._diseaseToDivHTML(diseases[i]);
	        admed.debug("Generate the disease div" + content); 
	    }
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.diseasesome.Widget.DefaultRenderer.prototype._diseasesToDivHTML", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.genesome.Widget.DefaultRenderer.prototype._diseaseToDivHTML = function( disease ) {
  	try {
	    admed.debug("build content for disease "+disease.diseasename);
	    
	    var content =   "<div class=\"disease\">";
	    content +=          "<tr><td><a href=\"" + disease.diseaseURL + "\">";
	    content +=              disease.diseasename + "</a></td>";
	    content += 			"<td>";
//	    if (disease.entrezdisease ) {
//	    	content +=          "<a href=\"" + disease.entrezdisease + "\">" + disease.diseasename + "</a>";
//	    }
//	    content += 			"</td><td>";
//	    if (disease.dbpediadisease ) {
//	    	content +=			"<a href=\"" + disease.dbpediadisease + "\">DBpedia Gene</a>";
//	    }
//	    content += 			"</td><td>";
//	    if (disease.drugbankdisease ) {
//	    	content +=			"<a href=\"" + disease.drugbankdisease + "\">More info from Drugbank</a>";
//	    }
//	    content += 			"</td><td>";
//	    if (disease.diseasesomedisease) {
//	    	content +=			"<a href=\"" + disease.diseasesomedisease + "\">More info from Diseasesome</a>";
//	    }
	    content += 			"</td>";
		content +=	    	"</tr>"; 
	    content +=      "</div>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.diseasesome.Widget.DefaultRenderer.prototype._diseasesToDivHTML", error);
    }
};
