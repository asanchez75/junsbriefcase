/**
 * @fileoverview
 * This script defines some MVC utilities.
 * @requires YAHOO.log
 * @requires YAHOO.util.Dom
 * @author <a href="http://purl.org/net/aliman">Alistair Miles</a>
 * @version $Revision:538 $ on $Date: 2008-08-14 10:36:17 +0100 (Thu, 14 Aug 2008) $ by $Author: aliman $
 * TODO license terms
 */
 
 
// Shortcuts
var log = YAHOO.log;


// create a namespace if not already defined
admed.namespace("admed.mvcutils");


/** 
 * @class
 * A generic model class for an MVC widget or application.
 * @constructor
 * @param {Object} definition the definition of the model
 */
admed.mvcutils.GenericModel = function( definition ) {
	
	
	var _this = this;
	
	
	/** Private data object storing the model.
	 */
	var _data = new Object();
	
	
	/** Private array of property names.
	 */
	var _propertyNames = definition.propertyNames;
	
	
	/** Private definition of controller property values.
	 */
	var _controlledValues = definition.controlledValues;
		
		
	/** Private map of listener functions.
	 * (Map each property name to an array of listener functions.)
	 */ 
	var _listeners = new Object();
	
	
	/** Initialise the model object.
	 * @private
	 */ 
	this._init = function() {
		
		// initialise listeners
		for (var i=0; i<_propertyNames.length; i++) {
			_listeners[_propertyNames[i]] = new Array();
		}

		// initialise the model data
		definition.initialize(_data);	
		
	}
	
	
	// complete initialisation
	this._init();
	
	
	/** Get a property of the model.
	 * @param {String} propertyName the name of the property to get
	 */
	this.get = function( propertyName ) {
		_this._validatePropertyName(propertyName);
		return _data[propertyName];
	}
	
	
	/** Set a propert of the model (all listeners will be notified of the change).
	 * @param {String} propertyName the name of the property to set
	 * @param {Any} value the new value of the property
	 */
	this.set = function( propertyName, value ) {
		_this._validatePropertyValuePair(propertyName, value);
		var oldValue = _data[propertyName]; // store the old value
		_data[propertyName] = value; // set the new value
		_this._notifyListeners(propertyName, oldValue, value); // notify the change
	}
	
	
	/** Validate a property name.
	 * @param {String} propertyName the name of the property to validate
	 * @private
	 */
	this._validatePropertyName = function( propertyName ) {
		var valid = false;
		for (var i=0; i<_propertyNames.length; i++) {
			if (_propertyNames[i] == propertyName) valid = true;
		}
		if (!valid) {
			throw {name:"InvalidPropertyNameError", message:"Invalid property name: "+propertyName};
		}
	}
	
	
	/** Validate a property value pair.
	 * @param {String} propertyName the name of the property to validate
	 * @param {Any} value the property value to validate
	 * @private
	 */
	this._validatePropertyValuePair = function( propertyName, value ) {
		var valid = false;
		_this._validatePropertyName(propertyName);
		var values = _controlledValues[propertyName];
		if (values) {
			for (var i=0; i<values.length; i++) {
				if (value == values[i]) {
					valid = true;
				}	
			}
		} else {
			valid = true;
		}
		if (!valid) {
			throw {name:"InvalidPropertyValuePairError", message:"Invalid property-value pair, property name: "+propertyName+", property value: "+value};
		}
	}


	/** Add a property change listener to this model.
	 * @param {Function} listener a function to call if the model changes
	 */
	this.addListener = function( propertyName, listener ) {
		admed.debug("addListener, "+propertyName);
		_this._validatePropertyName(propertyName);
		var propListeners = _listeners[propertyName];
		propListeners[propListeners.length] = listener;
	}
		
		
	/** Notify all listeners of a property change.
	 * @param {String} propertyName the name of the property to validate
	 * @param {Any} oldValue the old property value
	 * @param {Any} newValue the new property value
	 * @private
	 */
	this._notifyListeners = function( propertyName, oldValue, newValue ) {
		admed.debug("notifyListeners, "+propertyName);
		var propListeners = _listeners[propertyName];
		for (var i=0; i<propListeners.length; i++) {
			var listener = propListeners[i];
			listener(oldValue, newValue);
		}
	}
	
}
