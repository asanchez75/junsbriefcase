// create a namespace if not already defined
admed.namespace("admed.genesome");


/**
 * TODO doc me
 */
admed.genesome.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.genesome.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.genesome.Service.prototype.findDiseaseAssociatedWithGene = function( gene, success, failure ) {
    var _context = "admed.genesome.Service.prototype.findDiseaseAssociatedWithMedicine";
	try {
		admed.info("gene: "+gene, _context);
        var successChain = admed.chain(admed.genesome.Service.responseToDisease, success);	
		var query = admed.genesome.Service._buildQueryForDiseaseAssociatedWithGene(gene);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.genesome.Service.responseToDisease = function( response ) {
    var _context = "admed.genesome.Service.responseToDisease";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of disease", _context);
        var diseases = admed.genesome.Disease.newInstancesFromSPARQLResults(resultSet);
        return diseases;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.genesome.Service._buildQueryForDiseaseAssociatedWithGene = function( gene ) {

	try {
		var prefixes = 	"PREFIX dis: <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?disease ?diseasename WHERE { " +
							"?disease dis:associatedGene <" + gene + "> ;" +
									" dis:name ?diseasename . " +
						"}limit 100";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Service._buildQueryForDiseaseAssociatedWithGene", error);
    }
};


/**
 * TDO doc me
 */
admed.genesome.Disease = function () {
	
	this.diseaseURL = null;
	
	/**
	 * @type String
	 */
	this.diseaseName = null;

};


/**
 * TODO doc me
 */
admed.genesome.Disease.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var diseasePool = new admed.genesome.DiseasePool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var diseaseURL = binding.disease.value;
			
			admed.debug ("disease  " + diseaseURL);
			//TODO
			var disease = diseasePool.get(diseaseURL);
			disease.diseasename = binding.diseasename.value;	
	}
		
		return diseasePool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Disease.newInstancesFromSPARQLResults", error);
    }
};


admed.genesome.DiseasePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.genesome.DiseasePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.genesome.DiseasePool.prototype.toArray", error);
    }
};

admed.genesome.DiseasePool.prototype.get = function( diseaseURL ) {
	
	try {
		var disease = this._pool[diseaseURL];
	
		if ( typeof disease == "undefined" || !disease ) {
			disease = new admed.genesome.Disease();
			disease.diseaseURL = diseaseURL;		
			this._pool[diseaseURL] = disease;	
		}
		
		return disease;
	} catch (error) {
        throw new admed.UnexpectedException("admed.genesome.DiseasePool.prototype.get", error);
    }
};