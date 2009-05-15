
// create a namespace if not already defined
admed.namespace("admed.mvcutils");


/** 
 * Create a new instance.
 * @class
 * A generic model class for an MVC widget or application.
 * @constructor
 */
admed.mvcutils.GenericModel2 = function() {};
	
/**
 * @private
 */
admed.mvcutils.GenericModel2.prototype._state = null;
	
/**
 * @private
 */
admed.mvcutils.GenericModel2.prototype._events = null;

/**
 * @private
 */
admed.mvcutils.GenericModel2.prototype._properties = null;

/**
 * @private
 */
admed.mvcutils.GenericModel2.prototype._values = null;


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.setDefinition = function( definition ) {
	this._init(definition);	
}


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype._init = function( definition ) {

	if (typeof definition == "object") {

		if (typeof definition.properties == "object" && definition.properties.length) {
			// store properties
			this._properties = definition.properties;
			// init events
			this._events = {};
			for (var i=0; i<this._properties.length; i++) {
				var type = this._properties[i];
				this._events[type] = new YAHOO.util.CustomEvent(type, this);
			}	
		}
		else throw new admed.mvcutils.GenericModel2.BadDefinition("definition must have 'properties' field with array value");
		
		// store values
		if (typeof definition.values == "object") {
			this._values = definition.values;
		}
		else throw new admed.mvcutils.GenericModel2.BadDefinition("definition must have 'values' field with object value");
		
		// init state
		this._state = {};
		if (typeof definition.initialize == "function") {
			definition.initialize(this._state);
		}
		else throw new admed.mvcutils.GenericModel2.BadDefinition("definition must have 'initialize' field with function value");		
		
	}
	else throw new admed.mvcutils.GenericModel2.BadDefinition("definition must be an object");		
	
}


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.subscribe = function( property, listener, obj ) {

	// guard condition
	this._validateProperty(property);

	// do subscription
	this._events[property].subscribe(listener, obj);
		
}


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.subscribeAll = function( listener, obj ) {

	for (var i=0; i<this._properties.length; i++) {
		var property = this._properties[i];
		// pass through
		this.subscribe(property, listener, obj);
	}
	
}


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.get = function( property ) {

	// guard condition
	this._validateProperty(property);

	return this._state[property];
	
};


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.getter = function() {
    var self = this;
    return function( property ) {
        return self.get(property);
    }
};


/**
 * TODO doc me
 */
admed.mvcutils.GenericModel2.prototype.set = function( property, to ) {

	// guard condition
	this._validatePropertyValue(property, to);
	
	// store old value temporarily
	var from = this._state[property];
	
	// set new value
	this._state[property] = to;
	
	// notify listeners
	this._notify(property, from, to);

}


/**
 * TODO doc me
 * @private
 */
admed.mvcutils.GenericModel2.prototype._validateProperty = function( property ) {

	var valid = false;

	for (var i=0; i<this._properties.length; i++) {
		if (this._properties[i] == property) valid = true;
	}

	if (!valid) {
		throw new admed.mvcutils.GenericModel2.BadPropertyName("bad property name: "+property);
	}

}


/**
 * TODO doc me
 * @private
 */
admed.mvcutils.GenericModel2.prototype._validatePropertyValue = function( property, value ) {

	var valid = false;

	// check property first
	this._validateProperty(property);
	
	// check values
	var values = this._values[property];
	
	if (values) {
		for (var i in values) {
			if (value == values[i]) {
				valid = true;
			}	
		}
	} else {
		// true if no values defined
		valid = true;
	}

	if (!valid) {
		throw new admed.mvcutils.GenericModel2.BadPropertyValue("bad property value, property: "+property+", value: "+value);
	}
	
}


/**
 * TODO doc me
 * @private
 */
admed.mvcutils.GenericModel2.prototype._notify = function( property, from, to ) {

	// property must already have been checked
	this._events[property].fire(from, to, this.getter());
};

admed.mvcutils.GenericModel2.BadDefinition = function( message ) {
	this.name = "admed.mvcutils.GenericModel2.BadDefinition";
	this.message = message;
};

admed.mvcutils.GenericModel2.BadPropertyName = function( message ) {
	this.name = "admed.mvcutils.GenericModel2.BadPropertyName";
	this.message = message;
};

admed.mvcutils.GenericModel2.BadPropertyValue = function( message ) {
	this.name = "admed.mvcutils.GenericModel2.BadPropertyValue";
	this.message = message;
};

