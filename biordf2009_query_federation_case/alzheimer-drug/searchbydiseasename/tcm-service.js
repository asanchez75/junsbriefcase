// create a namespace if not already defined
lodd.namespace("lodd.tcm");


/**
 * TODO doc me
 */
lodd.tcm.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
lodd.tcm.Service.prototype = new lodd.sparql.Service();


/**
 * TODO doc me
 */
lodd.tcm.Service.prototype.findGenesByDiseaseName = function( diseaseName, success, failure ) {
    var _context = "lodd.tcm.Service.prototype.findGenesByDiseaseName";
	try {
		lodd.info("diseaseName: "+diseaseName, _context);
        var successChain = lodd.chain(lodd.tcm.Service.responseToGenes, success);	
		var query = lodd.tcm.Service._buildQueryForFindGenesByDiseaseName(diseaseName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new lodd.UnexpectedException(_context, error);
    }
};

lodd.tcm.Service.responseToGenes = function( response ) {
    var _context = "lodd.tcm.Service.responseToGenes";
    try {
        lodd.debug("response status: "+response.status, _context);
        lodd.debug("try parsing response text as json", _context);
        lodd.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        lodd.debug("convert result set to an array of genes", _context);
        var genes = lodd.tcm.Gene.newInstancesFromSPARQLResults(resultSet);
        return genes;
    } catch (e) {
        lodd.debug("caught "+e.name+", "+e.message, _context);
        throw new lodd.UnexpectedException(_context, e);
    }
};

lodd.tcm.Service._buildQueryForFindGenesByDiseaseName = function( diseaseName ) {

	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/schema/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?gene ?entrezgene  WHERE { " +
							"?disease rdfs:label \"" + diseaseName + "\";" +
								"tcm:gene ?gene . " +
							"?gene owl:sameAs ?entrezgene . "
						"}";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.Service._buildQueryForFindImagesBytcmProbeName", error);
    }
};

lodd.tcm.Service._buildQueryForFindImagesByFlybaseGeneID = function( flybaseGeneID ) {
	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/schema/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						"PREFIX so: <http://purl.org/obo/owl/SO#> ";
						
		var body = 		"SELECT DISTINCT ?fullImageURL ?thumbnailURL ?tcmURL ?caption ?probe ?probeLabel WHERE { " +
							"?probe tcm:hybridisesTranscriptOf <http://openflydata.org/id/flybase/feature/" + flybaseGeneID + "> ;" +
								"rdfs:label ?probeLabel ." +
							"?fullImageURL " +
								"tcm:probe ?probe ; " +
								"tcm:thumbnail ?thumbnailURL; " +
								"rdfs:seeAlso ?tcmURL; " +
								"rdfs:label ?caption ." +
						"}";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.Service._buildQueryForFindImagesByFlybaseGeneID", error);
    }
};



/**
 * Map a string to a list of strings via a supplied mapping table,
 * returnimng an empty list if the supplied key is not present. 
 * @param {String} key 		a key value to be mapped
 * @param {Object} table 	an object with members that are arrays of strings
 * @return an array of string values, which may be empty if the given key is not found
 * @type [String]
 */
lodd.tcm.Service.mapNameUsingTable = function ( key, table ) {
	try {
		var result = table[key];
		if (typeof result == "undefined" || !result ) {
			result = [];
		}
		return result;
	}catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.Service.mapNameUsingTable", error);
    }
};


/**
 * TDO doc me
 */
lodd.tcm.Image = function () {
	
	/**
	 * @type String
	 */
	this.fullImageURL = null;
	
	/**
	 * @type String
	 */
	this.thumbnailURL = null;
	
	/**
	 * @type String
	 */
	 
	this.tcmURL = null;
	
	/**
	 * @type String
	 */
	this.caption = null;
	
	/**
	 * @type String
	 */
	this.probe = null;
	

};


/**
 * TODO doc me
 */
lodd.tcm.Image.newInstancesFromSPARQLResults = function(resultSet){
	try {
		var bindings = resultSet.results.bindings;
		var imagePool = new lodd.tcm.ImagePool();
		var probePool = new lodd.tcm.ProbePool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var imageURI = binding.fullImageURL.value;
			//TODO
			var image = imagePool.get(imageURI);
//			image.fullImageURL = binding.fullImageURL.value;
			image.thumbnailURL = binding.thumbnailURL.value;
			image.tcmURL = binding.tcmURL.value;
			image.caption = binding.caption.value;
			
			if (binding.probe){
				var probeURI = binding.probe.value;
				var probe = probePool.get(probeURI);
				
				if (!probe.probeLabels){
					probe.probeLabels = new Array();
				}
	
				if (binding.probeLabel) {
					var probeLabel = binding.probeLabel.value;
					lodd.util.appendIfNotMember(probe.probeLabels, probeLabel);
				}
				image.probe = probe;
			}		
		}
		
		return imagePool.toArray();
	}catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.Image.newInstancesFromSPARQLResults", error);
    }
};


lodd.tcm.ImagePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

lodd.tcm.ImagePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.ImagePool.prototype.toArray", error);
    }
};

lodd.tcm.ImagePool.prototype.get = function( imagepath ) {
	
	try {
		var image = this._pool[imagepath];
	
		if ( typeof image == "undefined" || !image ) {
			image = new lodd.tcm.Image();
			image.fullImageURL = imagepath;		
			this._pool[imagepath] = image;	
		}
		
		return image;
	} catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.ImagePool.prototype.get", error);
    }
};

lodd.tcm.ProbePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

lodd.tcm.ProbePool.prototype.get = function( probeURI ) {
	
	try {
		var probe = this._pool[probeURI];
		
		if (!probe ) {
			probe = new Object();
			probe.probeURI = probeURI;
			this._pool[probeURI] = probe;	
		}
		
		return probe;
	} catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.ProbePool.prototype.get", error);
    }
};

lodd.tcm.ProbePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new lodd.UnexpectedException("lodd.tcm.ProbePool.prototype.toArray", error);
    }
};


lodd.tcm.Service.transformResponseForFindImagesByFlybaseGeneIDBatch = function( response ) {
    var _context = "lodd.tcm.Service.transformResponseForFindImagesByFlybaseGeneIDBatch";
    try {
        
        /* Turn results of query into result object like...
         * {
         *   "FBgn0036925" : {
         * 	{
         *     "fullImageURL": { "type": "uri" , "value": "http://www.fly-ted.org/767/2/wt01.bmp" } ,
         *	   "thumbnailURL": { "type": "uri" , "value": "http://www.fly-ted.org/767/thumbnails/2/medium.jpg" } ,
         * 	   "tcmURL": { "type": "uri" , "value": "http://www.fly-ted.org/767/" } ,
         *     "caption": { "type": "literal" , "value": "schuy in wt" } ,
         * 	   "probe": { "type": "uri" , "value": "http://openflydata.org/id/tcm/probe/schuy" } ,
         *     "probeLabel": { "type": "literal" , "value": "schuy" }
		 *	},
		 *  {
         *     "fullImageURL": { "type": "uri" , "value": "http://www.fly-ted.org/1478/2/cg17736-wt.jpg" } ,
         *     "thumbnailURL": { "type": "uri" , "value": "http://www.fly-ted.org/1478/thumbnails/2/medium.jpg" } ,
         *     "tcmURL": { "type": "uri" , "value": "http://www.fly-ted.org/1478/" } ,
         *     "caption": { "type": "literal" , "value": "CG17736/schuy in wt" } ,
         *     "probe": { "type": "uri" , "value": "http://openflydata.org/id/tcm/probe/schuy" } ,
         *      "probeLabel": { "type": "literal" , "value": "schuy" }
      	 *	} ,
		 *  ...
		 * },
         *   "FBgn0004903" : {
         {
         *     "fullImageURL": { "type": "uri" , "value": "http://www.fly-ted.org/2365/2/aly01.bmp" } ,
         *	   "thumbnailURL": { "type": "uri" , "value": "http://www.fly-ted.org/2365/thumbnails/2/medium.jpg" } ,
         * 	   "tcmURL": { "type": "uri" , "value": "http://www.fly-ted.org/2365/" } ,
         *     "caption": { "type": "literal" , "value": "Rb97D in aly" } ,
         * 	   "probe": { "type": "uri" , "value": "http://openflydata.org/id/tcm/probe/Rb97D" } ,
         *     "probeLabel": { "type": "literal" , "value": "Rb97D" }
		 *	},
		 *  {
         *     "fullImageURL": { "type": "uri" , "value": "http://www.fly-ted.org/2366/2/wt01.bmp" } ,
         *     "thumbnailURL": { "type": "uri" , "value": "http://www.fly-ted.org/2366/thumbnails/2/medium.jpg" } ,
         *     "tcmURL": { "type": "uri" , "value": "http://www.fly-ted.org/2366/" } ,
         *     "caption": { "type": "literal" , "value": "Rb97D in wt" } ,
         *     "probe": { "type": "uri" , "value": "http://openflydata.org/id/tcm/probe/Rb97D" } ,
         *     "probeLabel": { "type": "literal" , "value": "Rb97D" }
      	 *	},
      	 *  ....
      	 * }
         * }
         */

        lodd.debug("response status: "+response.status, _context);
        lodd.debug("try parsing response text as json", _context);
        lodd.debug("parsing response: "+response.responseText, _context);

        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        
        lodd.debug("convert result set to a map of fbgns to images indexed by fullImageURL", _context);
        
        var map = {};
        var imagePool = new lodd.tcm.ImagePool();
        var bindings = resultSet.results.bindings;
        
        for (var i=0; i<bindings.length; i++) {
            var binding = bindings[i];
            var fbgn = binding["fbgn"].value;
         
            var imagepath = binding["fullImageURL"].value;
            lodd.debug("add image : " + imagepath + " for gene " + fbgn, _context);
			var image = imagePool.get(imagepath);
			
			lodd.debug("get image object: " + image.fullImageURL + " for gene " + fbgn, _context);
			
			image.thumbnailURL = binding["thumbnailURL"].value;
			image.tcmURL = binding["tcmURL"].value;
			image.caption = binding["caption"].value;
						
            if (typeof map[fbgn] == "undefined" || !map[fbgn]) {
                lodd.debug("initialising gene label: "+fbgn, _context);
                map[fbgn] = {"images":[]};
            }
                        
            var images = map[fbgn].images;
                        
            lodd.util.appendIfNotMember(images, image);
                        
        }
            
        return map;
    
    } 
    catch (unexpected) {
        lodd.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }    
};
