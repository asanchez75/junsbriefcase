// create a namespace if not already defined
admed.namespace("admed.genetcm");


/**
 * TODO doc me
 */
admed.genetcm.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.genetcm.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.genetcm.Service.prototype.findGenesAssociatedWithMedicine = function( medicineName, success, failure ) {
    var _context = "admed.genetcm.Service.prototype.findGenesAssociatedWithMedicine";
	try {
		admed.info("diseaseName: "+medicineName, _context);
        var successChain = admed.chain(admed.genetcm.Service.responseToGene, success);	
		var query = admed.genetcm.Service._buildQueryForFindGenesAssociatedWithMedicine(medicineName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.genetcm.Service.responseToGene = function( response ) {
    var _context = "admed.genetcm.Service.responseToGene";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of medicine", _context);
        var genes = admed.genetcm.Gene.newInstancesFromSPARQLResults(resultSet);
        return genes;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.genetcm.Service._buildQueryForFindGenesAssociatedWithMedicine = function( medicine ) {

	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?gene ?genename ?externalgene ?entrezgene WHERE { " +
							"?disease rdfs:label ?diseasename . " +
							" filter regex(?diseasename, \"^Alzheimer\")." +
							"?association tcm:contextAssociation ?disease ; tcm:contextAssociation <" + medicine + "> ; tcm:contextAssociation ?gene ." +
							"?gene rdf:type tcm:Gene ; rdfs:label ?genename ." +
							"optional {?externalgene owl:sameAs ?gene } ." +
							"optional {?gene owl:sameAs ?entrezgene} ." +
						"}limit 100";
		
		admed.info(query, "admed.genetcm.Service._buildQueryForFindGenesAssociatedWithMedicine");					
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.genetcm.Service._buildQueryForFindGenesAssociatedWithMedicine", error);
    }
};


/**
 * TDO doc me
 */
admed.genetcm.Gene = function () {
	
	this.geneURL = null;
	
	/**
	 * @type String
	 */
	this.genename = null;
	
	this.entrezgene = null;
	
	this.dbpediagene = null;
	
	this.diseasesomegene = null;
	
	this.drugbankgene = null;
	

};


/**
 * TODO doc me
 */
admed.genetcm.Gene.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var genePool = new admed.genetcm.GenePool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var geneURL = binding.gene.value;
			
			admed.debug ("gene  " + geneURL);
			//TODO
			var gene = genePool.get(geneURL);
			gene.genename = binding.genename.value;
			if (binding.entrezgene) {	
				gene.entrezgene = binding.entrezgene.value;
			}
			if (binding.externalgene) {
				var external = binding.externalgene.value; 
				if (external.indexOf("http://dbpedia.org/resource/") != -1) {
					gene.dbpediagene = external;
				}else if (external.indexOf("http://www4.wiwiss.fu-berlin.de/drugbank/resource/targets/") != -1) {
					gene.drugbankgene = external;
				}else if (external.indexOf("diseasome") != -1) {
					gene.diseasesomegene = external;
				} 					
			}
	}
		
		return genePool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.genetcm.Gene.newInstancesFromSPARQLResults", error);
    }
};


admed.genetcm.GenePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.genetcm.GenePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.genetcm.GenePool.prototype.toArray", error);
    }
};

admed.genetcm.GenePool.prototype.get = function( geneURL ) {
	
	try {
		var gene = this._pool[geneURL];
	
		if ( typeof gene == "undefined" || !gene ) {
			gene = new admed.genetcm.Gene();
			gene.geneURL = geneURL;		
			this._pool[geneURL] = gene;	
		}
		
		return gene;
	} catch (error) {
        throw new admed.UnexpectedException("admed.genetcm.GenePool.prototype.get", error);
    }
};