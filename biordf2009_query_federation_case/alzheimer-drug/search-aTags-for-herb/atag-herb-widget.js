// create a namespace if not already defined
admed.namespace("admed.dbherb");


/*
 * --------------------------------------------------
 * WIDGET
 * --------------------------------------------------
 */


/**
 * Create a tcm widget
 * @class
  * @constructor
 * @param {admed.dbherb.Service} service the service to use to fetch data
 * @param {admed.dbherb.DefaultRenderer} renderer the renderer to use
 */
admed.dbherb.Widget = function( service, renderer ) {

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
			model.setDefinition(admed.dbherb.Widget.modelDefinition);
			
			// instantiate the controller
			this._controller = new admed.dbherb.Widget.Controller(model, service, this);
			
			// connect the renderer to the model
			renderer.connect(model);
		};
				
    	// do initialisation
    	this._init(service, renderer);
    } catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.Widget", error);
    }	
};


/**
 * Find medicines by disease names
 * @param {String} diseaseName 
 */
admed.dbherb.Widget.prototype.findMedicineFromDbpedia = function( medicineName ) {
	// pass through to controller
	try {
		this._controller.findMedicineFromDbpedia(medicineName);
	}catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.Widget.prototype.findMedicineFromDbpedia", error);
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
 * @param {admed.dbherb.Service} service the service to use to fetch data
 * @param {admed.dbherb.Widget} widget the widget to control
 */
admed.dbherb.Widget.Controller = function( model, service, widget ) {
	
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
	 * @param {Array<admed.dbherb.Image>} images
	 */	
	this._findMedicinesSuccess = function( Medicines ) {
		try {
			admed.info("request success");
		
			// set the results
			that._model.set("RESULTS", Medicines);
			
			// set the state
			that._model.set("STATE", "READY");
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


admed.dbherb.Widget.Controller.prototype.findMedicineFromDbpedia = function( medicineName ) {
	try {
		// pass through to private implementation
		this._findMedicineFromDbpedia(medicineName, this._findMedicinesSuccess, this._findMedicinesFailure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.Controller.prototype.findMedicineFromDbpedia", error);
    }
};


/**
 * @private
 * Implement find Medicines by a disease name, allowing callback injection for testing
 * @param {String} diseaseName 
 * @param {Function} success success case callback
 * @param {Function} failure failure case callback
 */
admed.dbherb.Widget.Controller.prototype._findMedicineFromDbpedia = function( medicineName, success, failure ) {
	try {
		admed.info("admed.dbherb.Widget.Controller._findMedicineFromDbpedia :: request: "+medicineName);
		
		// set the model pending
		this._model.set("STATE", "PENDING");
		
		// set the query property
		this._model.set("QUERY", medicineName);
		
		// kick off the request
		this._service.findMedicineFromDbpedia(medicineName, success, failure);
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.Controller.prototype._findMedicineFromDbpedia", error);
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
admed.dbherb.Widget.modelDefinition = {

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
admed.dbherb.Widget.DefaultRenderer = function() {};


/**
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype.setCanvas = function( canvas ) {
    try {
	    this._canvas = canvas;
	    this._initCanvas();
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype.setCanvas", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._initCanvas = function() {
	try {
	    YAHOO.util.Dom.addClass(this._canvas, "dbpediaHerbWidget");
	    
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
	    YAHOO.util.Dom.addClass(this._resultsPane, "herbResultsPane");
	    admed.mvcutils.hide(this._resultsPane);
	    
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._initCanvas", error);
    }
};

/**
 * @private
 */
admed.dbherb.Widget.DefaultRenderer.prototype._canvas = null;

/**
 * @private
 */
admed.dbherb.Widget.DefaultRenderer.prototype._pendingPane = null;

/**
 * @private
 */
admed.dbherb.Widget.DefaultRenderer.prototype._resultsPane = null;

/**
 * @private
 */
admed.dbherb.Widget.DefaultRenderer.prototype._resultsSummaryPane = null;

/**
 * @private
 */
admed.dbherb.Widget.DefaultRenderer.prototype._messagePane = null;


/**
 * @private
 * Main callback function for model changes.
 * @param {String} type the name of the model property changed
 * @param {Array} args the callback args
 * @param {admed.genefinder.DefaultRenderer} self a self reference, to work around callback issues
 */
admed.dbherb.Widget.DefaultRenderer.prototype._onModelChanged = function(type, args, self) {
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
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._onModelChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._onStateChanged = function( from, to, get ) {
    var _context = "admed.dbherb.Widget.DefaultRenderer.prototype._onStateChanged";
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
	    	throw {name:"admed.dbherb.Widget.UnexpectedStateError", message:"Invalid state: "+newState};
		}
	} catch (error) {
        	throw new admed.UnexpectedException(_context, error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._onQueryChanged = function( from, to ) {
	try {
    	// store query
    	this._query = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._onQueryChanged", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._onResultsChanged = function( from, to ) {
    var _context = "admed.dbherb.Widget.DefaultRenderer.prototype._onResultsChanged";	
	try {
        admed.debug("empty results summary pane");
        this._resultsPane.innerHTML = "";
        this._resultsSummaryPane.innerHTML = "";
		
	    admed.debug("render the results summary", _context);
	    this._renderResultsSummary(this._query, to.length);
	    
	    if (to.length > 0) {

	        admed.debug("render the results "+to.length, _context);
	        this._resultsPane.innerHTML = this._medicinesToDivHTML(this._query, to); 
	
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
admed.dbherb.Widget.DefaultRenderer.prototype._onErrorMessageChanged = function( from, to) {
    try {
    	this._messagePane.innerHTML = to;
    }catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._onErrorMessageChanged", error);
    }
};


/**
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype.connect = function( model ) {
	try {
    	model.subscribeAll(this._onModelChanged, this);
    }catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype.connect", error);
    }

};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._renderResultsSummary = function( query, count ) {
    var _context = "admed.dbherb.Widget.DefaultRenderer.prototype._renderResultsSummary";
	try {
	    	    
		admed.debug("building results summary content", _context);
        var content = "found <span>";
	    content += count;
	    content += "</span> matching medicine";
	    content += (count == 0 || count > 1) ? "s " : " ";
	    content += "from <a href='http://dbpedia.org'>DBpedia</a> for ";
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
admed.dbherb.Widget.DefaultRenderer.prototype._medicinesToDivHTML = function( query, medicines ) {

    try {
	    // build the divs
	    
	    admed.debug("build div content for Medicines "+medicines.length);
	    var content = "<table class=\"herbResults\">";
	    for ( var i in medicines ) {
	        
	        content += this._medicineToDivHTML(medicines[i]);
	        admed.debug("Generate the med div" + content); 
	    }
	    
	    content += "<a href=\"" + query + "\">More from DBPedia.</a>"
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._MedicinesToDivHTML", error);
    }
};


/**
 * @private
 * TODO doc me
 */
admed.dbherb.Widget.DefaultRenderer.prototype._medicineToDivHTML = function( medicine ) {
  	try {
	    admed.debug("build content for medicine "+medicine.name);
	    
	    var content = "";
	    
	    if (medicine.authority){
		    content +=   "<tr><th>dbpedia:authority</th>";
		    content +=          "<td><a href=\"" + medicine.authority + "\">";
		    content +=              medicine.authority;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    if (medicine.classis){
		    content +=   "<tr><th>dbpedia:classis</th>";
		    content +=          "<td><a href=\"" + medicine.classis + "\">";
		    content +=              medicine.classis;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    if (medicine.division){
		    content +=   "<tr><th>dbpedia:division</th>";
		    content +=          "<td><a href=\"" + medicine.division + "\">";
		    content +=              medicine.division;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    if (medicine.family){
		    content +=   "<tr><th>dbpedia:family</th>";
		    content +=          "<td><a href=\"" + medicine.family + "\">";
		    content +=              medicine.family;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    if (medicine.genus){
		    content +=   "<tr><th>dbpedia:genus</th>";
		    content +=          "<td><a href=\"" + medicine.genus + "\">";
		    content +=              medicine.genus;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    if (medicine.kingdom){
		    content +=   "<tr><th>dbpedia:kingdom</th>";
		    content +=          "<td><a href=\"" + medicine.kingdom + "\">";
		    content +=              medicine.kingdom;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    if (medicine.order){
		    content +=   "<tr><th>dbpedia:order</th>";
		    content +=          "<td><a href=\"" + medicine.order + "\">";
		    content +=              medicine.order;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    if (medicine.species){
		    content +=   "<tr><th>dbpedia:species</th>";
		    content +=          "<td><a href=\"" + medicine.species + "\">";
		    content +=              medicine.species;
		    content +=          "</a></td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    if (medicine.img){
		    content +=   "<tr><th>dbpedia:img</th>";
		    content +=          "<td><a href=\"" + medicine.img + "\"><img class=\"herb\"  src=\"" + medicine.img + "\"/></a>";
		    content +=          "</td>"; 
		    content +=      "</tr>";
	    }
	    
	    
	    return content;
	}catch (error) {
        	throw new admed.UnexpectedException("admed.dbherb.Widget.DefaultRenderer.prototype._medicineToDivHTML", error);
    }
};

