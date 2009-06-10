// create a namespace if not already defined
admed.namespace("admed.linkedct");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.linkedct.Service} service the service to use to fetch data
 * @param {admed.linkedct.DefaultRenderer} renderer the renderer to use
 */
admed.linkedct.Widget = function( service, renderer ) {

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
			model.setDefinition(admed.linkedct.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.linkedct.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.Widget", error);
    }	
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.linkedct.Widget.prototype.findTrialsForMedicine = function( medicineName ) {
	// pass through to controller
	try {
		this._controller.findTrialsForMedicine(medicineName);
	}catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.Widget.prototype.findTrialsForMedicine", error);
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
 * @param {admed.linkedct.Service} service the service to use to fetch data
 * @param {admed.linkedct.Widget} widget the widget to control
 */
admed.linkedct.Widget.Controller = function( model, service, widget ) {
	
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
	 * @param {Array<admed.linkedct.Image>} images
	 */	
	this._findTrialsSuccess = function( trials ) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", trials);
			
			// set the state
			that._model.set("STATE", "READY");
		}catch (error) {
        	throw new admed.UnexpectedException("_findTrialsSuccess", error);
    	}

	};
	
	
	/**
	 * @private
	 * Failure case callback.
	 * @param {Object} response the HTTP response (YUI)
	 */	
	this._findTrialsFailure = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from TCM, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findTrialsFailure", error);
    	}		
	};
	
};


admed.linkedct.Widget.Controller.prototype.findTrialsForMedicine = function( medicineName ) {
	try {
		// pass through to private implementation
		this._findTrialsForMedicine(medicineName, this._findTrialsSuccess, this._findTrialsFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.Controller.prototype.findTrialsForMedicine", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} diseaseName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.linkedct.Widget.Controller.prototype._findTrialsForMedicine = function( medicineName, success, failure ) {
	try {
		admed.info("admed.linkedct.Widget.Controller._findTrialsForMedicine :: request: "+medicineName);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", medicineName);
		
		// kick off the request
		this._service.findTrialsForMedicine(medicineName, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.Controller.prototype._findTrialsForMedicine", error);
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
admed.linkedct.Widget.modelDefinition = {

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
admed.linkedct.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._initCanvas = function() {
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
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.linkedct.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.linkedct.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.linkedct.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.linkedct.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.linkedct.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.linkedct.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
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
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.linkedct.Widget.DefaultRenderer.prototype._onStateChanged";
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
	    	throw {name:"admed.linkedct.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.linkedct.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
	    
	    if (to.length > 0) {

	        admed.debug("render the results "+to.length, _context);
	        this._resultsPane.innerHTML = this._trialsToDivHTML(to); 
	
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
admed.linkedct.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.linkedct.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "found <span>";
	    content += count;
	    content += "</span> matching trial";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://data.linkedct.org/'>LinkedCT</a> for ";
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
admed.linkedct.Widget.DefaultRenderer.prototype._trialsToDivHTML = function( trials ) {

    try {
	    // build the divs
	    
	    admed.debug("build div content for Medicines "+trials.length);
	    var content = "";
	    content += "<table>";
	    content += "<tr><th>Trial</th><th>Summary</th><th>Verification</th><th>Location</th></tr>";
	    for ( var i in trials ) {
	        
	        content += this._trialToDivHTML(trials[i]);
	        admed.debug("Generate the med div" + content); 
	    }
	    
	    content += "</table>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._trialsToDivHTML", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.linkedct.Widget.DefaultRenderer.prototype._trialToDivHTML = function( trial ) {
  	try {
	    admed.debug("build content for trial "+trial.title);
	    
	    var content =   "<div class=\"trial\">";
	    content +=          "<tr><td><a href=\"" + trial.trialURL + "\">";
	    content +=              trial.title;
	    content +=          "</a></td>";
	    content +=          "<td>" + trial.summary + "</td>"; 
	    content +=          "<td>" + trial.verificationdate + "</td>";
	    content +=          "<td>" + trial.city + ", " + trial.country + "</td>";
	    content +=      "</div>";
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.linkedct.Widget.DefaultRenderer.prototype._trialToDivHTML", error);
    }
};

