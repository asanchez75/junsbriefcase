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
admed.tcm.Service.prototype.findMedicineByDiseaseName = function( diseaseName, success, failure ) {
    var _context = "admed.tcm.Service.prototype.findMedicineByDiseaseName";
	try {
		admed.info("diseaseName: "+diseaseName, _context);
        var successChain = admed.chain(admed.tcm.Service.responseToMedicine, success);	
		var query = admed.tcm.Service._buildQueryForFindMedicineByDiseaseName(diseaseName);
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

admed.tcm.Service._buildQueryForFindMedicineByDiseaseName = function( diseaseName ) {

	try {
		var prefixes = 	"PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/> " +
						"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?disease ?medicine ?medicinename WHERE { " +
							"?disease rdfs:label ?diseasename . " +
							" filter regex(?diseasename, \"^" + diseaseName + "\")." +
							"?statistics tcm:source ?disease ; tcm:medicine_disease_tvalue ?tvalue ." +
							"filter (?tvalue > 1.645) . " +
							"?statistics tcm:source ?medicine . ?medicine rdf:type tcm:Medicine ." +
							"?medicine rdfs:label ?medicinename ." +
						"}order by desc(?tvalue) limit 7000";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.tcm.Service._buildQueryForFindImagesBytcmProbeName", error);
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
	this.name = null;
		
	/**
	 * @type String
	 */
	this.targetDisease = null;

	

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
			medicine.name = binding.medicinename.value;
			medicine.targetDisease = binding.disease.value;
			
//			if (binding.ingredient){
//				var ingredientURI = binding.ingredient.value;
//				var ingredient = ingredientPool.get(ingredientURI);
//				
//				if (!ingredient.ingredientLabels){
//					ingredient.ingredientLabels = new Array();
//				}
//	
//				if (binding.ingredientLabel) {
//					var ingredientLabel = binding.ingredientLabel.value;
//					admed.util.appendIfNotMember(ingredient.ingredientLabels, ingredientLabel);
//				}
//				medicine.ingredient = ingredient;
//			}		
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

admed.tcm.ingredientPool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.tcm.ingredientPool.prototype.get = function( ingredientURI ) {
	
	try {
		var ingredient = this._pool[ingredientURI];
		
		if (!ingredient ) {
			ingredient = new Object();
			ingredient.ingredientURI = ingredientURI;
			this._pool[ingredientURI] = ingredient;	
		}
		
		return ingredient;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ingredientPool.prototype.get", error);
    }
};

admed.tcm.ingredientPool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.tcm.ingredientPool.prototype.toArray", error);
    }
};