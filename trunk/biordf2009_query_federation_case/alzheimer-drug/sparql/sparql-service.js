/**
 * @fileoverview
 * This script defines a generic service class for running SPARQL queries.
 * @author <a href="http://purl.org/net/aliman">Alistair Miles</a>
 * @version $Revision:538 $ on $Date: 2008-08-27 09:08:41 +0100 (Wed, 27 Aug 2008) $ by $Author: aliman $
 * @requires lodd.util
 * @requires lodd.sparql.Service
 * @requires YAHOO.util.Connect
 * For license terms see http://lodd.googlecode.com
 */


lodd.namespace("lodd.sparql");


/**
 * @class
 */
lodd.sparql.Service = function() {};


/**
 * @param {String} url
 */
lodd.sparql.Service.prototype.setEndpoint = function( url ) {
    this._endpoint = url;
};


/**
 * @private
 * @type String
 */
lodd.sparql.Service.prototype._endpoint = null;


/**
 * @param {String} query
 * @param {Function} success
 * @param {Function} failure
 */
lodd.sparql.Service.prototype.query = function( query, success, failure ) {
	var _context = "lodd.sparql.Service.prototype.query";
	try {
	    lodd.info("query: "+query, _context);
    
	    lodd.debug("define the callback object", _context);
	    var callback = {
	        success: success,
	        failure: failure
	    };
	            
        // output=json not necessary for sparqlite, but keep for compatibility with virtuoso
	    var url = this._endpoint + "?query="+escape(query)+"&output=json";
	    
	    lodd.debug("spike string length, expect 4: "+"abcd".length, _context);
	    lodd.debug("url length: "+url.length, _context);
	    lodd.debug("make the request to "+url, _context);
	    
		YAHOO.util.Connect.initHeader("Accept", "application/sparql-results+json", true);    
	    YAHOO.util.Connect.asyncRequest("GET", url, callback);
	} catch (error) {
		lodd.debug("wrap and rethrow error to get a stack trace", _context);
        throw new lodd.UnexpectedException(_context, error);
	}    
};

lodd.sparql.Service.prototype.postQuery = function( query, success, failure ) {
	var _context = "lodd.sparql.Service.prototype.postQuery";
	try {
        lodd.info("query: "+query, _context);
        
        lodd.debug("define the callback object", _context);
        var callback = {
            success: success,
            failure: failure
        };
                
        var url = this._endpoint;
        
        lodd.debug("make the request to "+url, _context);
        
        // output=json not necessary for sparqlite, but keep for compatibility with virtuoso
        var content = "query="+escape(query)+"&output=json";
        lodd.debug("POST content: "+content, _context);        
        YAHOO.util.Connect.initHeader("Accept", "application/sparql-results+json", true);    
        YAHOO.util.Connect.asyncRequest("POST", url, callback, content);
        
	} catch (error) {
		lodd.debug("wrap and rethrow error to get a stack trace", _context);
        throw new lodd.UnexpectedException(_context, error);
	}
}


