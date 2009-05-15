if (typeof lodd == "undefined" || !lodd) {
    /**
     * @class
	 * The lodd global namespace. If lodd is already defined, the
     * existing lodd will not be overwritten so that defined
     * namespaces are preserved.
     */
	function lodd() {};
}

/**
 * Returns the namespace specified and creates it if it doesn't exist.
 * <pre>
 * lodd.namespace("property.package");
 * lodd.namespace("lodd.property.package");
 * </pre>
 * Either of the above would create lodd.property, then
 * lodd.property.package
 *
 * Be careful when naming packages. Reserved words may work in some browsers
 * and not others. For instance, the following will fail in Safari:
 * <pre>
 * lodd.namespace("really.long.nested.namespace");
 * </pre>
 * This fails because "long" is a future reserved word in ECMAScript
 *
 * @param  {String*} arguments 1-n namespaces to create 
 * @return {Object}  A reference to the last namespace object created
 */
lodd.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=lodd;

        // lodd is implied, so it is ignored if it is included
        for (j=(d[0] == "lodd") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

lodd.log = function(message, channel, context) {
    if (typeof channel == "undefined") {
        channel = "info";
    }
    if (typeof context != "undefined") {
        message = context + " :: " +message;
    }
    YAHOO.log(message,channel);
};

lodd.info = function(message, context) {
    var channel = "info";
    lodd.log(message, channel, context);
};

lodd.debug = function(message, context) {
    var channel = "debug";
    lodd.log(message, channel, context);
};

lodd.err = function(message, context) {
    var channel = "error";
    lodd.log(message, channel, context);
};

lodd.chain = function( glue, chained ) {
    return function(o) {
    	lodd.debug("in chained function, calling glue");
        var p = glue(o);
        lodd.debug("in chained function, calling next in chain");
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
lodd.UnexpectedException = function( methodName, nested ) {
    this.name = "lodd.UnexpectedException";
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
    lodd.debug(this.message)
};

