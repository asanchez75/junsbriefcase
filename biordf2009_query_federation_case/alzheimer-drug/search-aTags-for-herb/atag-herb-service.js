// create a namespace if not already defined
admed.namespace("admed.atags");


/**
 * TODO doc me
 */
admed.atags.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.atags.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.atags.Service.prototype.findAtagsForMedicine = function( dbpediaHerbURI, success, failure ) {
    var _context = "admed.atags.Service.prototype.findAtagsForMedicine";
	try {
		admed.info("herbURI: "+dbpediaHerbURI, _context);
        var successChain = admed.chain(admed.atags.Service.responsToAtags, success);	
		var query = admed.atags.Service._buildQueryForFindMedicineFromAtags(dbpediaHerbURI);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.atags.Service.responsToAtags = function( response ) {
    var _context = "admed.atags.Service.responseToMedicine";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of atags", _context);
        var atags = admed.atags.Atags.newInstancesFromSPARQLResults(resultSet);
        return atags;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.atags.Service._buildQueryForFindMedicineFromAtags = function( dbpediaHerbURI ) {

	try {
		var prefixes = 	"PREFIX sioc: <http://rdfs.org/sioc/ns#>  " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>" ;
						
		var body = 		"SELECT DISTINCT ?atag ?topic ?topiclabel ?content " +
						"FROM <http://hcls.deri.org/atag/data/tcm_atags.html>" +
						"where { " +
							"?atag sioc:topic <" + dbpediaHerbURI +
							"> ; sioc:topic ?topic; sioc:content ?content . ?topic rdfs:label ?topiclabel" +
						"}limit 500";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.atags.Service._buildQueryForFindMedicineFromAtags", error);
    }
};


/**
 * TDO doc me
 */
admed.atags.Atags = function () {
	
	var that = this;
	
	/**
	 * @type String
	 */
	this.topic = [];
	
	this.content = null;
	
	this.addTopic = function (topic){
			admed.util.appendIfNotMember(that.topic, topic);
	};

};


/**
 * TODO doc me
 */
admed.atags.Atags.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var atagsPool = new admed.atags.AtagsPool();
		var topicPool = new admed.atags.TopicPool();
//		var ingredientPool = new admed.atags.IngredientPool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var aTagURI = binding.atag.value;
			
			var atag = atagsPool.get(aTagURI);			 
			
			if (!atag.content)
				atag.content = binding.content.value;
			
			if (binding.topic){
				
				topic = topicPool.get(binding.topic.value);
				
				topic.topiclabel = binding.topiclabel.value;
				
				atag.addTopic(topic);
			}	
		}
		
		return atagsPool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.atags.Atags.newInstancesFromSPARQLResults", error);
    }
};


admed.atags.AtagsPool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.atags.AtagsPool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.atags.AtagsPool.prototype.toArray", error);
    }
};

admed.atags.AtagsPool.prototype.get = function( aTagURI ) {
	
	try {
		var atag = this._pool[aTagURI];
	
		if ( typeof atag == "undefined" || !atag ) {
			atag = new admed.atags.Atags();
					
			this._pool[aTagURI] = atag;	
		}
		
		return atag;
	} catch (error) {
        throw new admed.UnexpectedException("admed.atags.AtagsPool.prototype.get", error);
    }
};

admed.atags.TopicPool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.atags.TopicPool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.atags.TopicPool.prototype.toArray", error);
    }
};

admed.atags.TopicPool.prototype.get = function( topicURI ) {
	
	try {
		var topic = this._pool[topicURI];
		
		if (!topic ) {
			topic = new Object();
			topic.topicURI = topicURI;
			this._pool[topicURI] = topic;	
		}		
		return topic;
	} catch (error) {
        throw new admed.UnexpectedException("admed.atags.TopicPool.prototype.get", error);
    }
};