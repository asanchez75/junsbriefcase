// create a namespace if not already defined
admed.namespace("admed.effecttcm");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.effecttcm.Service} service the service to use to fetch data
 * @param {admed.effecttcm.DefaultRenderer} renderer the renderer to use
 */
admed.effecttcm.Widget = function( service, renderer ) {

	try {
		var that = this;
		
		/** @private */
		this._controller = null;
		
		/** @private */
		this._renderer = renderer;
		
		this._model = null;
		
		this._renderer = null;
    
    	this._service = null;
    	
    	this._tvalueChangedEvent = null;
		
		this._init = function() {
			
			this._tvalueChangedEvent = new YAHOO.util.CustomEvent("TVALUECHANGED", this);
			// create a model
			var model = new admed.mvcutils.GenericModel2();
			model.setDefinition(admed.effecttcm.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.effecttcm.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.Widget", error);
    }	
};

admed.effecttcm.Widget.prototype.subscribe = function(type, listener, obj) {
    var _context = "admed.effecttcm.Widget.prototype.subscribe";
    try {
        if (type == "TVALUECHANGED") {
            this.t_tvalueChangedEvent.subscribe(listener, obj);
        }
    } catch (e) {
    	throw new admed.UnexpectedException("admed.effecttcm.Widget.prototype.subscribe", error);
    }    
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.effecttcm.Widget.prototype.findEffectByMedicineName = function( medicineName ) {
	// pass through to controller
	try {
		this._controller.findEffectByMedicineName(medicineName);
	}catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.Widget.prototype.findEffectByMedicineName", error);
    }
};

admed.effecttcm.Widget.prototype.findEffectByMedicineNameWithConfidence = function( tvalue, medicineURL) {
	try {
		var _context = "admed.effecttcm.Widget.prototype.findEffectByMedicineNameWithConfidence";
		admed.info("call the widget function with query " + tvalue + " for " + medicineURL, _context );
		this._controller.findEffectByMedicineNameWithConfidence(tvalue, medicineURL);
	}catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.Widget.prototype.findEffectByMedicineNameWithConfidence", error);
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
 * @param {admed.effecttcm.Service} service the service to use to fetch data
 * @param {admed.effecttcm.Widget} widget the widget to control
 */
admed.effecttcm.Widget.Controller = function( model, service, widget ) {
	
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
	 * @param {Array<admed.effecttcm.Image>} images
	 */	
	this._findEffectsSuccess = function( effects ) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", effects);
			
			// set the state
			that._model.set("STATE", "READY");
		}catch (error) {
        	throw new admed.UnexpectedException("_findEffectsSuccess", error);
    	}

	};
	
	this._findEffectsWithConfidenceSuccess = function(effects) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", effects);
			
			// set the state
			that._model.set("STATE", "READY");
		}catch (error) {
        	throw new admed.UnexpectedException("_findEffectsWithConfidenceSuccess", error);
    	}
	}
	
	
	/**
	 * @private
	 * Failure case callback.
	 * @param {Object} response the HTTP response (YUI)
	 */	
	this._findEffectsFailure = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from TCM, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findEffectsFailure", error);
    	}		
	};
	
	this._findEffectsWithConfidenceFailure  = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from TCM, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findEffectsWithConfidenceFailure", error);
    	}		
	};
	
};


admed.effecttcm.Widget.Controller.prototype.findEffectByMedicineName = function( medicineName ) {
	try {
		// pass through to private implementation
		this._findEffectByMedicineName(medicineName, this._findEffectsSuccess, this._findEffectsFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.Controller.prototype.findEffectByMedicineName", error);
    }
};

admed.effecttcm.Widget.Controller.prototype.findEffectByMedicineNameWithConfidence = function ( tvalue, herbURL ) {
	try {
		// pass through to private implementation
		this._findEffectByMedicineNameWithConfidence(tvalue, herbURL, this._findEffectsWithConfidenceSuccess, this._findEffectsWithConfidenceFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.Controller.prototype.findEffectByMedicineNameWithConfidence", error);
    }
};

admed.effecttcm.Widget.Controller.prototype._findEffectByMedicineNameWithConfidence = function(tvalue, herbURL, success, failure){
	try {
		admed.info("admed.effecttcm.Widget.Controller._findEffectByMedicineNameWithConfidence :: request: "+herbURL);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", [tvalue, herbURL]);
		
		// kick off the request
		this._service.findEffectByMedicineNameWithConfidence(tvalue, herbURL, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.Controller.prototype._findEffectByMedicineNameWithConfidence", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} medicineName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.effecttcm.Widget.Controller.prototype._findEffectByMedicineName = function( medicineName, success, failure ) {
	try {
		admed.info("admed.effecttcm.Widget.Controller._findEffectByMedicineName :: request: "+medicineName);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", medicineName);
		
		// kick off the request
		this._service.findEffectByMedicineName(medicineName, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.Controller.prototype._findEffectByMedicineName", error);
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
admed.effecttcm.Widget.modelDefinition = {

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
admed.effecttcm.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._initCanvas = function() {
	try {
	    YAHOO.util.Dom.addClass(this._canvas, "effectWidget");
	    
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
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
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
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.effecttcm.Widget.DefaultRenderer.prototype._onStateChanged";
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
	    	throw {name:"admed.effecttcm.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.effecttcm.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
	    
	    if (to.length > 0) {

	        admed.debug("render the results "+to.length, _context);
	        this._resultsPane.innerHTML = this._effectsToDivHTML(to); 
	
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
admed.effecttcm.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.effecttcm.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "Top <span>";
	    content += count;
	    content += "</span> matching effect";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://code.google.com/p/junsbriefcase/wiki/RDFTCMData'>TCMGeneDIT</a>";
	    content += "<form id=\"effectQueryForm\" action=\"javascript:void(0)\">" +
	                "Select the level of confidence in the association <select id=\"queryTableContainer\" class=\"confidence\"" +
	                "<option>99%</option>" + 
					"<option>97.5%</option>" +
					"<option>95%</option>" +
					"<option>all</option>" +
	                "/>" +	                        
                    "<input type=\"submit\" id=\"querySubmit\" value=\"Go\"/>"+                 
	                "</form>";
	    	    
	    this._resultsSummaryPane.innerHTML = content;
	    
	    
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};

/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._effectsToDivHTML = function( effects ) {

    try {
	    // build the divs
	    
	    admed.debug("build div content for effects "+effects.length);
	    var content = "<table><tr><th>Putative effect</th><th>t-value</th></tr>";
	    for ( var i in effects ) {
	        
	        content += this._effectToDivHTML(effects[i]);
	        admed.debug("Generate the eff div" + content); 
	    }
	    
	    content += "</table>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._effectsToDivHTML", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.effecttcm.Widget.DefaultRenderer.prototype._effectToDivHTML = function( effect ) {
  	try {
	    admed.debug("build content for effect "+effect.name);
	    
	    var content =   "<div class=\"effect\">";
	    content +=          "<tr><td><a href=\"" + effect.effectURL + "\">";
	    content +=              effect.name;
	    content +=          "</a></td><td>" + effect.tvalue + "</td></tr>"; 
	    content +=      "</div>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.effecttcm.Widget.DefaultRenderer.prototype._effectsToDivHTML", error);
    }
};

