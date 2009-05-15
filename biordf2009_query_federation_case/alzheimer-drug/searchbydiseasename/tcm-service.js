// create a namespace if not already defined
admed.namespace("admed.tcm");


/**
 * TODO doc me
 */
admed.tcm.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.tcm.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.tcm.Service.prototype.findGenesByDiseaseName = function( diseaseName, success, failure ) {
    var _context = "admed.tcm.Service.prototype.findGenesByDiseaseName";
	try {
		admed.info("diseaseName: "+diseaseName, _context);
        var successChain = admed.chain(admed.tcm.Service.responseToGenes, success);	
		var query = admed.tcm.Service._buildQueryForFindGenesByDiseaseName(diseaseName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.tcm.Service.responseToGenes = function( response ) {
    var _context = "admed.tcm.Service.responseToGenes";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of genes", _context);
        var genes = admed.tcm.Gene.newInstancesFromSPARQLResults(resultSet);
        return genes;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.tcm.Service._buildQueryForFindGenesByDiseaseName = function( diseaseName ) {

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
        throw new admed.UnexpectedException("admed.tcm.Service._buildQueryForFindImagesBytcmProbeName", error);
    }
};

admed.tcm.Service._buildQueryForFindImagesByFlybaseGeneID = function( flybaseGeneID ) {
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
        throw new admed.UnexpectedException("admed.tcm.Service._buildQueryForFindImagesByFlybaseGeneID", error);
    }
};

/**
 * TDO doc me
 */
admed.tcm.Image = function () {
	
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
admed.tcm.Image.newInstancesFromSPARQLResults = function(resultSet){
	try {
		var bindings = resultSet.results.bindings;
		var imagePool = new admed.tcm.ImagePool();
		var probePool = new admed.tcm.ProbePool();
		
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
					admed.util.appendIfNotMember(probe.probeLabels, probeLabel);
				}
				image.probe = probe;
			}		
		}
		
		return imagePool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.tcm.Image.newInstancesFromSPARQLResults", error);
    }
};


admed.tcm.ImagePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.tcm.ImagePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ImagePool.prototype.toArray", error);
    }
};

admed.tcm.ImagePool.prototype.get = function( imagepath ) {
	
	try {
		var image = this._pool[imagepath];
	
		if ( typeof image == "undefined" || !image ) {
			image = new admed.tcm.Image();
			image.fullImageURL = imagepath;		
			this._pool[imagepath] = image;	
		}
		
		return image;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ImagePool.prototype.get", error);
    }
};

admed.tcm.ProbePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.tcm.ProbePool.prototype.get = function( probeURI ) {
	
	try {
		var probe = this._pool[probeURI];
		
		if (!probe ) {
			probe = new Object();
			probe.probeURI = probeURI;
			this._pool[probeURI] = probe;	
		}
		
		return probe;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ProbePool.prototype.get", error);
    }
};

admed.tcm.ProbePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ProbePool.prototype.toArray", error);
    }
};


admed.tcm.Service.transformResponseForFindImagesByFlybaseGeneIDBatch = function( response ) {
    var _context = "admed.tcm.Service.transformResponseForFindImagesByFlybaseGeneIDBatch";
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

        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("parsing response: "+response.responseText, _context);

        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        
        admed.debug("convert result set to a map of fbgns to images indexed by fullImageURL", _context);
        
        var map = {};
        var imagePool = new admed.tcm.ImagePool();
        var bindings = resultSet.results.bindings;
        
        for (var i=0; i<bindings.length; i++) {
            var binding = bindings[i];
            var fbgn = binding["fbgn"].value;
         
            var imagepath = binding["fullImageURL"].value;
            admed.debug("add image : " + imagepath + " for gene " + fbgn, _context);
			var image = imagePool.get(imagepath);
			
			admed.debug("get image object: " + image.fullImageURL + " for gene " + fbgn, _context);
			
			image.thumbnailURL = binding["thumbnailURL"].value;
			image.tcmURL = binding["tcmURL"].value;
			image.caption = binding["caption"].value;
						
            if (typeof map[fbgn] == "undefined" || !map[fbgn]) {
                admed.debug("initialising gene label: "+fbgn, _context);
                map[fbgn] = {"images":[]};
            }
                        
            var images = map[fbgn].images;
                        
            admed.util.appendIfNotMember(images, image);
                        
        }
            
        return map;
    
    } 
    catch (unexpected) {
        admed.debug("rethrowing "+unexpected.name+", "+unexpected.message, _context);
        throw unexpected;    
    }    
};
