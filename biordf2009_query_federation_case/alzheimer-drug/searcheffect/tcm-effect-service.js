// create a namespace if not already defined
admed.namespace("admed.effecttcm");


/**
 * TODO doc me
 */
admed.effecttcm.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.effecttcm.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.effecttcm.Service.prototype.findEffectByMedicineName = function( medicineName, success, failure ) {
    var _context = "admed.effecttcm.Service.prototype.findEffectByMedicineName";
	try {
		admed.info("diseaseName: "+medicineName, _context);
        var successChain = admed.chain(admed.effecttcm.Service.responseToMedicine, success);	
		var query = admed.effecttcm.Service._buildQueryForFindEffectByMedicineName(medicineName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.effecttcm.Service.responseToMedicine = function( response ) {
    var _context = "admed.effecttcm.Service.responseToMedicine";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of medicine", _context);
        var effects = admed.effecttcm.Effect.newInstancesFromSPARQLResults(resultSet);
        return effects;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.effecttcm.Service._buildQueryForFindEffectByMedicineName = function( medicine ) {

	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?effect ?effectname WHERE { " +
							"<" + medicine + "> tcm:effect ?effect . ?effect rdfs:label ?effectname" +
						"}limit 10";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.Service._buildQueryForFindEffectByMedicineName", error);
    }
};


/**
 * TDO doc me
 */
admed.effecttcm.Effect = function () {
	
	this.effectURL = null;
	
	/**
	 * @type String
	 */
	this.name = null;
	

};


/**
 * TODO doc me
 */
admed.effecttcm.Effect.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var effectPool = new admed.effecttcm.EffectPool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var effectURL = binding.effect.value;
			
			admed.debug ("effect  " + effectURL);
			//TODO
			var effect = effectPool.get(effectURL);
			effect.name = binding.effectname.value;						
	}
		
		return effectPool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.effect.newInstancesFromSPARQLResults", error);
    }
};


admed.effecttcm.EffectPool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.effecttcm.EffectPool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.effectPool.prototype.toArray", error);
    }
};

admed.effecttcm.EffectPool.prototype.get = function( effectURL ) {
	
	try {
		var effect = this._pool[effectURL];
	
		if ( typeof effect == "undefined" || !effect ) {
			effect = new admed.effecttcm.Effect();
			effect.effectURL = effectURL;		
			this._pool[effectURL] = effect;	
		}
		
		return effect;
	} catch (error) {
        throw new admed.UnexpectedException("admed.effecttcm.effectPool.prototype.get", error);
    }
};