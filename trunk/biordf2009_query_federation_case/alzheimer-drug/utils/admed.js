if (typeof admed == "undefined" || !admed) {
    /**
     * @class
	 * The admed global namespace. If admed is already defined, the
     * existing admed will not be overwritten so that defined
     * namespaces are preserved.
     */
	function admed() {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist.
 * <pre>
 * admed.namespace("property.package");
 * admed.namespace("admed.property.package");
 * </pre>
 * Either of the above would create admed.property, then
 * admed.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * admed.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @param  {String*} arguments 1-n namespaces to create 
 * @return {Object}  A reference to the last namespace object created
 */
admed.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=admed;

        // admed is implied, so it is ignored if it is included
        for (j=(d[0] == "admed") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

admed.log = function(message, channel, context) {
    if (typeof channel == "undefined") {
        channel = "info";
    }
    if (typeof context != "undefined") {
        message = context + " :: " +message;
    }
    YAHOO.log(message,channel);
};

admed.info = function(message, context) {
    var channel = "info";
    admed.log(message, channel, context);
};

admed.debug = function(message, context) {
    var channel = "debug";
    admed.log(message, channel, context);
};

admed.err = function(message, context) {
    var channel = "error";
    admed.log(message, channel, context);
};

admed.chain = function( glue, chained ) {
    return function(o) {
    	admed.debug("in chained function, calling glue");
        var p = glue(o);
        admed.debug("in chained function, calling next in chain");
        chained(p);
    }
};

/**
 * @class
 * Encapsulates an unexpected exception.
 * @constructor
 * @param {String} methodName the name of the method or function in which the cause exception was caught
 * @param {Object} nested
 */
admed.UnexpectedException = function( methodName, nested ) {
    this.name = "admed.UnexpectedException";
    this.nested = nested;
    this.message = methodName+" :: unexpected error";
    for (var p in nested) {
        if (p != "message") {
            this.message += "\n      "+p+": "+nested[p];
        }
    }
    if (nested.message) {
        this.message += "\n..."+nested.message;
    }
    admed.debug(this.message)
};

