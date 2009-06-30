// create a namespace if not already defined
admed.namespace("admed.herbtcm");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.herbtcm.Service} service the service to use to fetch data
 * @param {admed.herbtcm.DefaultRenderer} renderer the renderer to use
 */
admed.herbtcm.Widget = function( service, renderer ) {

	try {
		var that = this;
		
		/** @private */
		this._controller = null;
		
		/** @private */
		this._renderer = renderer;
		
		this._model = null;
		
		this._renderer = null;
    
    	this._service = null;
    	
    	this._herbFoundEvent = null;
		
		this._init = function() {
			
			this._herbFoundEvent = new YAHOO.util.CustomEvent("HERBSFOUND", this);
			
			// create a model
			var model = new admed.mvcutils.GenericModel2();
			model.setDefinition(admed.herbtcm.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.herbtcm.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.herbtcm.Widget", error);
    }	
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.herbtcm.Widget.prototype.findMedicineFromDbpedia = function( medicineName ) {
	// pass through to controller
	try {
		this._controller.findMedicineFromDbpedia(medicineName);
	}catch (error) {
        throw new admed.UnexpectedException("admed.herbtcm.Widget.prototype.findMedicineFromDbpedia", error);
    }
};

admed.herbtcm.Widget.prototype.subscribe = function(type, listener, obj) {
    var _context = "admed.herbtcm.Widget.prototype.subscribe";
    try {
        if (type == "HERBSFOUND") {
            this._herbFoundEvent.subscribe(listener, obj);
        }
    } catch (e) {
    	throw new admed.UnexpectedException("admed.herbtcm.Widget.prototype.subscribe", error);
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
 * @param {admed.herbtcm.Service} service the service to use to fetch data
 * @param {admed.herbtcm.Widget} widget the widget to control
 */
admed.herbtcm.Widget.Controller = function( model, service, widget ) {
	
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
	 * @param {Array<admed.herbtcm.Image>} images
	 */	
	this._findMedicinesSuccess = function( medicines ) {
		try {
			var _context = "admed.herbtcm.Controller this._findMedicinesSuccess";
			
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", medicines);
			
			// set the state
			that._model.set("STATE", "READY");
			
			 // fire event
            admed.info("firing HERBSFOUND event", _context);
            
            var _event = that._parent._herbFoundEvent;
            admed.debug("event: "+_event, _context);
            _event.fire(medicines);
            
		}catch (error) {
        	throw new admed.UnexpectedException("_findMedicinesSuccess", error);
    	}

	};
	
	
	/**
	 * @private
	 * Failure case callback.
	 * @param {Object} response the HTTP response (YUI)
	 */	
	this._findMedicinesFailure = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from TCM, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findMedicinesFailure", error);
    	}		
	};
	
};


admed.herbtcm.Widget.Controller.prototype.findMedicineFromDbpedia = function( medicineName ) {
	try {
		// pass through to private implementation
		this._findMedicineFromDbpedia(medicineName, this._findMedicinesSuccess, this._findMedicinesFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.Controller.prototype.findMedicineFromDbpedia", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} diseaseName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.herbtcm.Widget.Controller.prototype._findMedicineFromDbpedia = function( medicineName, success, failure ) {
	try {
		admed.info("admed.herbtcm.Widget.Controller._findMedicineFromDbpedia :: request: "+medicineName);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", medicineName);
		
		// kick off the request
		this._service.findMedicineFromDbpedia(medicineName, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.Controller.prototype._findMedicineFromDbpedia", error);
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
admed.herbtcm.Widget.modelDefinition = {

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
admed.herbtcm.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._initCanvas = function() {
	try {
	    YAHOO.util.Dom.addClass(this._canvas, "tcmWidget");
	    
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
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
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
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.herbtcm.Widget.DefaultRenderer.prototype._onStateChanged";
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
	    	throw {name:"admed.herbtcm.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.herbtcm.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
//	    
//	    if (to.length > 0) {
//
//	        admed.debug("render the results "+to.length, _context);
//	        this._resultsPane.innerHTML = this._medicinesToDivHTML(to); 
//	
//	    }
//	    else {
////	        admed.info("hide results and explanation panes", _context);
////	        admed.mvcutils.hide(this._resultsPane);
////            admed.mvcutils.hide(this._explanationPane);
//	    }
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }

};
  
  
/**
 * @private
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.herbtcm.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "found <span>";
	    content += count;
	    content += "</span> matching medicines";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://code.google.com/p/junsbriefcase/wiki/RDFTCMData'>RDF TCMGeneDIT</a> for ";
	    content += "medicine <span>'"+query+"'</span>";
	    	    
	    this._resultsSummaryPane.innerHTML = content;
	    
	    
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};

/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._medicinesToDivHTML = function( medicines ) {

    try {
	    // build the divs
	    
	    admed.debug("build div content for Medicines "+medicines.length);
	    var content = "";
	    for ( var i in medicines ) {
	        
	        content += this._medicineToDivHTML(medicines[i]);
	        admed.debug("Generate the med div" + content); 
	    }
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._MedicinesToDivHTML", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.herbtcm.Widget.DefaultRenderer.prototype._medicineToDivHTML = function( medicine ) {
  	try {
	    admed.debug("build content for medicine "+medicine.name);
	    
	    var content =   "<div class=\"medicine\">";
	    content +=          "<p><a href=\"" + medicine.herbFromDbpedia + "\">";
	    content +=              "More from DBPedia";
	    content +=          "</a></p>"; 
	    content +=      "</div>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.herbtcm.Widget.DefaultRenderer.prototype._medicineToDivHTML", error);
    }
};
