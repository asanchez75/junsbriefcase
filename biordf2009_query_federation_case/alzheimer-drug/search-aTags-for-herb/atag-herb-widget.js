// create a namespace if not already defined
admed.namespace("admed.atags");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.atags.Service} service the service to use to fetch data
 * @param {admed.atags.DefaultRenderer} renderer the renderer to use
 */
admed.atags.Widget = function( service, renderer ) {

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
			model.setDefinition(admed.atags.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.atags.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.atags.Widget", error);
    }	
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.atags.Widget.prototype.findAtagsForMedicine = function( dbpediaHerbURI ) {
	// pass through to controller
	try {
		this._controller.findAtagsForMedicine(dbpediaHerbURI);
	}catch (error) {
        throw new admed.UnexpectedException("admed.atags.Widget.prototype.findAtagsForMedicine", error);
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
 * @param {admed.atags.Service} service the service to use to fetch data
 * @param {admed.atags.Widget} widget the widget to control
 */
admed.atags.Widget.Controller = function( model, service, widget ) {
	
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
	 * @param {Array<admed.atags.Image>} images
	 */	
	this._findAtagsSuccess = function( atags ) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", atags);
			
			// set the state
			that._model.set("STATE", "READY");
		}catch (error) {
        	throw new admed.UnexpectedException("_findAtagsSuccess", error);
    	}

	};
	
	
	/**
	 * @private
	 * Failure case callback.
	 * @param {Object} response the HTTP response (YUI)
	 */	
	this._findAtagsFailure = function( response ) {
		try {
			admed.err("request failed, status "+response.status+" "+response.statusText);
			
			// set an error message
			var msg = "There was an error retrieving data from Hcls Deri, see the logs for more info.";		
	
			that._model.set("ERRORMESSAGE", msg);
	
			// set the state
			that._model.set("STATE", "SERVERERROR");
		}catch (error) {
        	throw new admed.UnexpectedException("_findAtagsFailure", error);
    	}		
	};
	
};


admed.atags.Widget.Controller.prototype.findAtagsForMedicine = function( dbpediaHerbURI ) {
	try {
		// pass through to private implementation
		this._findAtagsForMedicine(dbpediaHerbURI, this._findAtagsSuccess, this._findAtagsFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.Controller.prototype.findAtagsForMedicine", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} diseaseName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.atags.Widget.Controller.prototype._findAtagsForMedicine = function( dbpediaHerbURI, success, failure ) {
	try {
		admed.info("admed.atags.Widget.Controller._findAtagsForMedicine :: request: "+dbpediaHerbURI);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", dbpediaHerbURI);
		
		// kick off the request
		this._service.findAtagsForMedicine(dbpediaHerbURI, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.Controller.prototype._findAtagsForMedicine", error);
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
admed.atags.Widget.modelDefinition = {

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
admed.atags.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._initCanvas = function() {
	try {
	    YAHOO.util.Dom.addClass(this._canvas, "atagsWidget");
	    
	    // set up the pending pane
        this._pendingPane = document.createElement("p");
        this._pendingPane.innerHTML = "searching for atags...";
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
	    YAHOO.util.Dom.addClass(this._resultsPane, "herbResultsPane");
	    admed.mvcutils.hide(this._resultsPane);
	    
	}catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.atags.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.atags.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.atags.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.atags.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.atags.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.atags.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
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
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.atags.Widget.DefaultRenderer.prototype._onStateChanged";
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
	    	throw {name:"admed.atags.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.atags.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
	    
	    if (to.length > 0) {

	        admed.debug("render the results "+to.length, _context);
	        this._resultsPane.innerHTML = this._atagsToDivHTML(this._query, to); 
	
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
admed.atags.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.atags.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "found <span>";
	    content += count;
	    content += "</span> tags";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://hcls.deri.org/sparql'>aTags</a> for ";
	    content += "herb <span>'"+query.substr(28,len(query))+"'</span>";
	    	    
	    this._resultsSummaryPane.innerHTML = content;
	    
	    
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};

/**
 * @private
 * TODO doc me
 */
admed.atags.Widget.DefaultRenderer.prototype._atagsToDivHTML = function( query, atags ) {

    try {
	    // build the divs
	    
	    var content = "<table class=\"atagResults\">";
	    
	    content = "<tr><th>Number</th><th>Topics</th><th>Content</th></tr>";
	    for ( var i in atags ) {
	    	
	    	content += "<tr><td>" + i + "</td>";
	        
	        atag = atags[i];
	        
	        content += "<td>"
	        
	        if (atag.topic){
	        	
	        	var topics = atag.topic; 
	        	for ( var t in topics){
	        		content += topics[t];		
	        	}	        	 
	        }
	        
	        content += "</td>"
	        
	        if (atag.content){
	        	content += "<td>" + atag.content + "</td>";
	        }
	        
	        content += "</tr>"
	      
	    }
	    
	    content += "</table>"
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.atags.Widget.DefaultRenderer.prototype._atagsToDivHTML", error);
    }
};