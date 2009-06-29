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

var queryString = null;

var _diseaseArray = new admed.maputil.MapUtils();

//admed.genesome.Service.prototype._diseaseArray = new admed.maputil.MapUtils();
//
//admed.genesome.Service.prototype._query = null;
//
//admed.genesome.Service.prototype.setQuery = function (query){
//	this._query = query;
//};
//
//admed.genesome.Service.prototype.getQuery = function (){
//	return this._query;
//};

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



admed.genesome.Service.prototype.findDiseaseAssociatedWithGeneBatch = function( genes, success, failure ) {
    var _context = "admed.genesome.Service.prototype.findDiseaseAssociatedWithGeneBatch";
	try {
		admed.info("genes: "+genes.length, _context);
		
//		for (var i in genes){
//			var gene = genes[i];
//			admed.info("the query gene: "+gene, _context);

		var map = {};
        for (var i=0; i<genes.length; i++) {
            map[genes[i]] = new Array();
        }
			
		var successChain = admed.chain(admed.genesome.Service.responseToDiseaseBatch(map), success);
		var query = admed.genesome.Service._buildQueryForDiseaseAssociatedWithGeneBatch(genes);
		
		this.postQuery(query, successChain, failure);
//		}
        
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.genesome.Service.responseToDiseaseBatch = function( map ) {
    var _context = "admed.genesome.Service.responseToDiseaseBatch";
    return function (response){
    	try {
    	
	        admed.debug("response status: "+response.status, _context);
	        admed.debug("try parsing response text as json", _context);
	        admed.debug("response text: "+response.responseText, _context);
	        
	        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
	        admed.debug("convert result set to an array of disease", _context);
	        admed.debug("create a hash map object ", _context);
	        
	        var bindings = resultSet.results.bindings;
	        
	        var pool = new admed.genesome.DiseasePool();
	        
	        for (var i=0; i<bindings.length; i++) {
	        	var binding = bindings[i];
	        	
	        	var geneURL = binding.gene.value;
	        	
	        	var diseaseURL = binding.disease.value;
	        	
	        	var disease = pool.get(diseaseURL);
	        	
	        	disease.diseaseName = binding.diseasename.value;
	        	
	        	
				if (binding.superdisease){
					var superdiseaseURL = binding.superdisease.value;
					
					var supername = binding.supername.value;
									
					var superdisease = new admed.genesome.Disease();
					
					superdisease.diseaseURL = superdiseaseURL;
					
					superdisease.diseaseName = supername;
		
					admed.util.appendIfNotMember(disease.superdiseases, superdisease);
					
					
				}	
				
				if (binding.subdisease){
					var subdiseaseURL = binding.subdisease.value;
					
					var subname = binding.subname.value;
									
					var subdisease = new admed.genesome.Disease();
					
					subdisease.diseaseURL = subdiseaseURL;
					
					subdisease.diseaseName = subname;
		
					admed.util.appendIfNotMember(disease.subdiseases, subdisease);
				}
				
				admed.util.appendIfNotMember(map[geneURL], disease);
	        }
	        admed.debug("return map", _context);
	        return map;
	        
	    } catch (e) {
	        admed.debug("caught "+e.name+", "+e.message, _context);
	        throw new admed.UnexpectedException(_context, e);
	    }
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
						
		var body = 		"SELECT DISTINCT ?disease ?diseasename ?superdisease ?supername ?subdisease ?subname WHERE { " +
							"?disease dis:associatedGene <" + gene + "> ;" +
									" dis:name ?diseasename . " +
						 	"optional {?disease dis:diseaseSubtypeOf ?superdisease . ?superdisease dis:name ?supername .}" +
						 	"optional {?subdisease dis:diseaseSubtypeOf ?disease . ?subdisease dis:name ?subname .}" +
						"}limit 100";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Service._buildQueryForDiseaseAssociatedWithGene", error);
    }
};

admed.genesome.Service._buildQueryForDiseaseAssociatedWithGeneBatch = function( genes ) {

	try {
		
		var prefixes = 	"PREFIX dis: <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
//		var body = 		"SELECT DISTINCT ?gene ?disease ?diseasename ?superdisease ?supername ?subdisease ?subname WHERE { \n";
		var body = 		"SELECT DISTINCT ?gene ?disease ?diseasename WHERE { \n";
		
		if (genes.length == 1)
		{
			var body_union = "{\n" +
								"?gene rdf:type dis:genes . filter regex(str(?gene), \"" + genes[0] + "\").\n" +
								"?disease dis:associatedGene ?gene .\n" +
							 "}\n";
		}else{
		
			var body_union = "{\n " +
								"{\n" +
									"?gene rdf:type dis:genes . filter regex(str(?gene), \"" + genes[0] + "\").\n" +
									"?disease dis:associatedGene ?gene .\n" +
								"}\n";
			
			for (var i=1; i<genes.length; i++) {
				body_union += "union \n"+
							  	"{\n" +
									"?gene rdf:type dis:genes . filter regex(str(?gene), \"" + genes[i] + "\").\n" +
									"?disease dis:associatedGene ?gene .\n" +
								"}\n";
			}
		
			body_union += "}\n";
		}
		
		var body_main = "{\n" +
							"?disease dis:name ?diseasename . " +
//						 	"optional {?disease dis:diseaseSubtypeOf ?superdisease . ?superdisease dis:name ?supername .}" +
//						 	"optional {?subdisease dis:diseaseSubtypeOf ?disease . ?subdisease dis:name ?subname .}" +
						"}}\n";
							
		var query = prefixes + body + body_union + body_main;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.genesome.Service._buildQueryForDiseaseAssociatedWithGeneBatch", error);
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
	
//	this.superdiseases = new Array();
//	
//	this.subdiseases = new Array();
	
	

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
			disease.diseaseName = binding.diseasename.value;
			
//			if (binding.superdisease){
//				var superdiseaseURL = binding.superdisease.value;
//				
//				var supername = binding.supername.value;
//								
//				var superdisease = new admed.genesome.Disease();
//				
//				superdisease.diseaseURL = superdiseaseURL;
//				
//				superdisease.diseaseName = supername;
//				
//				
//				admed.util.appendIfNotMember(disease.superdiseases, superdisease);
//			}	
//			
//			if (binding.subdisease){
//				var subdiseaseURL = binding.subdisease.value;
//				
//				var subname = binding.subname.value;
//								
//				var subdisease = new admed.genesome.Disease();
//				
//				subdisease.diseaseURL = subdiseaseURL;
//				
//				subdisease.diseaseName = subname;
//	
//				admed.util.appendIfNotMember(disease.subdiseases, subdisease);
//			}
			
				
			
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