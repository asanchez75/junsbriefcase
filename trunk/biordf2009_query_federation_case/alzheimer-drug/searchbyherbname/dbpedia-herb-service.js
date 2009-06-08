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
admed.tcm.Service.prototype.findMedicineFromDbpedia = function( medicineName, success, failure ) {
    var _context = "admed.tcm.Service.prototype.findMedicineFromDbpedia";
	try {
		admed.info("medicineName: "+medicineName, _context);
        var successChain = admed.chain(admed.tcm.Service.responseToMedicine, success);	
		var query = admed.tcm.Service._buildQueryForFindMedicineFromDbpedia(medicineName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.tcm.Service.responseToMedicine = function( response ) {
    var _context = "admed.tcm.Service.responseToMedicine";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of medicine", _context);
        var medicines = admed.tcm.Medicine.newInstancesFromSPARQLResults(resultSet);
        return medicines;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.tcm.Service._buildQueryForFindMedicineFromDbpedia = function( medicineName ) {

	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/> " +
						"PREFIX owl: <http://www.w3.org/2002/07/owl#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?herb ?medicine WHERE { " +
							"?medicine rdfs:label ?medicinename . " +
							" filter regex(?medicinename, \"^" + medicineName + "\")." +
							"?herb owl:sameAs ?medicine ." +
						"}limit 7000";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.tcm.Service._buildQueryForFindMedicineFromDbpedia", error);
    }
};


/**
 * TDO doc me
 */
admed.tcm.Medicine = function () {
	
	this.fullmedicineURL = null;
	
	/**
	 * @type String
	 */
	this.herbFromDbpedia = null;

};


/**
 * TODO doc me
 */
admed.tcm.Medicine.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var medicinePool = new admed.tcm.MedicinePool();
//		var ingredientPool = new admed.tcm.IngredientPool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var fullmedicineURL = binding.medicine.value;
			
			admed.debug ("medicine  " + fullmedicineURL);
			//TODO
			var medicine = medicinePool.get(fullmedicineURL);
			medicine.herbFromDbpedia = binding.herb.value;
		}
		
		return medicinePool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.tcm.medicine.newInstancesFromSPARQLResults", error);
    }
};


admed.tcm.MedicinePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.tcm.MedicinePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.medicinePool.prototype.toArray", error);
    }
};

admed.tcm.MedicinePool.prototype.get = function( medicinepath ) {
	
	try {
		var medicine = this._pool[medicinepath];
	
		if ( typeof medicine == "undefined" || !medicine ) {
			medicine = new admed.tcm.Medicine();
			medicine.fullmedicineURL = medicinepath;		
			this._pool[medicinepath] = medicine;	
		}
		
		return medicine;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.medicinePool.prototype.get", error);
    }
};