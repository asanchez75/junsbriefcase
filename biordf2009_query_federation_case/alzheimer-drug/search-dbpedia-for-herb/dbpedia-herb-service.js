// create a namespace if not already defined
admed.namespace("admed.dbherb");


/**
 * TODO doc me
 */
admed.dbherb.Service = function (endpointURL) {
	/**
	 * @private
	 */
	this._endpoint = endpointURL;
};


// extend
admed.dbherb.Service.prototype = new admed.sparql.Service();


/**
 * TODO doc me
 */
admed.dbherb.Service.prototype.findMedicineFromDbpedia = function( medicineName, success, failure ) {
    var _context = "admed.dbherb.Service.prototype.findMedicineFromDbpedia";
	try {
		admed.info("medicineName: "+medicineName, _context);
        var successChain = admed.chain(admed.dbherb.Service.responseToMedicine, success);	
		var query = admed.dbherb.Service._buildQueryForFindMedicineFromDbpedia(medicineName);
		this.query(query, successChain, failure);
	}catch (error) {
        throw new admed.UnexpectedException(_context, error);
    }
};

admed.dbherb.Service.responseToMedicine = function( response ) {
    var _context = "admed.dbherb.Service.responseToMedicine";
    try {
        admed.debug("response status: "+response.status, _context);
        admed.debug("try parsing response text as json", _context);
        admed.debug("response text: "+response.responseText, _context);
        var resultSet = YAHOO.lang.JSON.parse(response.responseText);
        admed.debug("convert result set to an array of medicine", _context);
        var medicines = admed.dbherb.Medicine.newInstancesFromSPARQLResults(resultSet);
        return medicines;
    } catch (e) {
        admed.debug("caught "+e.name+", "+e.message, _context);
        throw new admed.UnexpectedException(_context, e);
    }
};

admed.dbherb.Service._buildQueryForFindMedicineFromDbpedia = function( medicine ) {

	try {
		var prefixes = 	"PREFIX dbpedia: <http://dbpedia.org/ontology/> " +
						"PREFIX foaf: <http://xmlns.com/foaf/0.1/> " +
						"PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
						
		var body = 		"SELECT DISTINCT ?uri ?authority ?classis ?division ?family ?genus ?kingdom ?order ?species ?img ?label where { " +
							"<" + medicine + "> foaf:page ?uri ." +
							"optional{ <" + medicine + "> dbpedia:binomial_authority ?authority .}" +
							"optional{ <" + medicine + "> dbpedia:classis ?classis.}" +
							"optional{ <" + medicine + "> dbpedia:division ?division.} " +
							"optional{ <" + medicine + "> dbpedia:family ?family.} " +
							"optional{ <" + medicine + "> dbpedia:genus ?genus.} " +
							"optional{ <" + medicine + "> dbpedia:kingdom ?kingdom.} " +
							"optional{ <" + medicine + "> dbpedia:order ?order. }" +
							"optional{ <" + medicine + "> dbpedia:species ?species .}"+
							"optional{ <" + medicine + "> foaf:img ?img .} " +
							"optional{ <" + medicine + "> rdfs:label ?label. filter (lang(?label) = \"zh\").}" +
						"}limit 100";
							
		var query = prefixes + body;
	
		return query;
	}catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.Service._buildQueryForFindMedicineFromDbpedia", error);
    }
};


/**
 * TDO doc me
 */
admed.dbherb.Medicine = function () {
	
	/**
	 * @type String
	 */
	this.authority = null;
	
	this.classis = null;
	
	this.division = null;
	
	this.family = null;
	
	this.genus = null;
	
	this.kingdom = null;
	
	this.order = null;
	
	this.species = null;
	
	this.img = null;
	
	this.label = null;

};


/**
 * TODO doc me
 */
admed.dbherb.Medicine.newInstancesFromSPARQLResults = function(resultSet){
	try {
		admed.debug ("buiding query results ");
		var bindings = resultSet.results.bindings;
		var medicinePool = new admed.dbherb.MedicinePool();
//		var ingredientPool = new admed.dbherb.IngredientPool();
		
		for (var i=0; i<bindings.length; i++) {
			var binding = bindings[i];
			
			var imgURL = binding.uri.value;
			
			var medicine = medicinePool.get(imgURL);
			
			if (binding.authority) {
				medicine.authority = binding.authority.value;
			}
			if (binding.classis) {
				medicine.classis = binding.classis.value;
			}
			if (binding.division) {
				medicine.division = binding.division.value;
			}
			if (binding.family) {
				medicine.family = binding.family.value;
			}
			if (binding.genus) {
				medicine.genus = binding.genus.value;
			}
			if (binding.kingdom) {
				medicine.kingdom = binding.kingdom.value;
			}
			if (binding.order) {
				medicine.order = binding.order.value;
			}
			if (binding.species) {
				medicine.species = binding.species.value;
			}
			if (binding.img) {
				medicine.img = binding.img.value;
			}
			if (binding.label){
				medicine.label = binding.label.value;
			}
		}
		
		return medicinePool.toArray();
	}catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.medicine.newInstancesFromSPARQLResults", error);
    }
};


admed.dbherb.MedicinePool = function() {
	/**
	 * @private
	 */
	this._pool = new Object();
};

admed.dbherb.MedicinePool.prototype.toArray = function() {
	try {
		var array = new Array();
		for (var key in this._pool) {
			array[array.length] = this._pool[key];
		}
		return array;
	} catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.medicinePool.prototype.toArray", error);
    }
};

admed.dbherb.MedicinePool.prototype.get = function( medicinepath ) {
	
	try {
		var medicine = this._pool[medicinepath];
	
		if ( typeof medicine == "undefined" || !medicine ) {
			medicine = new admed.dbherb.Medicine();
			//medicine.fullmedicineURL = medicinepath;		
			this._pool[medicinepath] = medicine;	
		}
		
		return medicine;
	} catch (error) {
        throw new admed.UnexpectedException("admed.dbherb.medicinePool.prototype.get", error);
    }
};