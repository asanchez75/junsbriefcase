// create a namespace if not already defined
admed.namespace("admed.linkedct");


/**
 * TODO doc me
 */
admed.linkedct.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.linkedct.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.linkedct.Service.prototype.findTrialsForMedicine = function( medicineName, success, failure ) {
    var _context = "admed.linkedct.Service.prototype.findTrialsForMedicine";
	try {
		admed.info("medicineName: "+medicineName, _context);
        var successChain = admed.chain(admed.linkedct.Service.responseToTrial, success);	
		var query = admed.linkedct.Service._buildQueryForFindTrialsForMedicine(medicineName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.linkedct.Service.responseToTrial = function( response ) {
    var _context = "admed.linkedct.Service.responseToTrial";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of trials", _context);
        var trials = admed.linkedct.Trial.newInstancesFromSPARQLResults(resultSet);
        return trials;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.linkedct.Service._buildQueryForFindTrialsForMedicine = function( medicineName ) {

	try {
		var prefixes = 	"PREFIX linkedct: <http://data.linkedct.org/resource/linkedct/> " +
						"PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?trial ?title ?summary ?verificationdate ?city ?country WHERE { " +
							"?trial linkedct:brief_title ?title . " +
							" filter regex(?title, \"^" + medicineName + "\", \"i\")." +
							"?trial linkedct:summary ?summary ; linkedct:verification_date ?verificationdate ; linkedct:location ?location." +
							"?location linkedct:facility_address_city ?city ; linkedct:facility_address_country ?country ." +
						"}limit 500";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.Service._buildQueryForFindTrialsForMedicine", error);
    }
};


/**
 * TDO doc me
 */
admed.linkedct.Trial = function () {
	
	this.trialURL = null;
	
	/**
	 * @type String
	 */
	this.title = null;
	
	this.summary = null;
	
	this.verificationdate = null;
	
	this.city = null;
	
	this.country = null;

};


/**
 * TODO doc me
 */
admed.linkedct.Trial.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var trialPool = new admed.linkedct.TrialPool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var trialURL = binding.trial.value;
			
			admed.debug ("trial  " + trialURL);
			//TODO
			var trial = trialPool.get(trialURL);
			trial.title = binding.title.value;
			trial.summary = binding.summary.value;
			trial.verificationdate = binding.verificationdate.value;
			trial.city = binding.city.value;
			trial.country = binding.country.value;
		}
		
		return trialPool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.Trial.newInstancesFromSPARQLResults", error);
    }
};


admed.linkedct.TrialPool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.linkedct.TrialPool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.TrialPool.prototype.toArray", error);
    }
};

admed.linkedct.TrialPool.prototype.get = function( trialURL ) {
	
	try {
		var trial = this._pool[trialURL];
	
		if ( typeof trial == "undefined" || !trial ) {
			trial = new admed.linkedct.Trial();
			trial.trialURL = trialURL;		
			this._pool[trialURL] = trial;	
		}
		
		return trial;
	} catch (error) {
        throw new admed.UnexpectedException("admed.linkedct.TrialPool.prototype.get", error);
    }
};