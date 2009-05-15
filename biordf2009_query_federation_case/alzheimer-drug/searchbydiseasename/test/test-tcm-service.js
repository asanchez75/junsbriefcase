// Shortcuts
var trace = function(message) { YAHOO.log(message, "test"); };
var assert = YAHOO.util.Assert;


/** 
 * Set up function for the admed.tcm Service.
 */
admed.tcm.Service.setUpTest = function() {
    try {
        trace("setUp test");
    } catch (e) {
        admed.err("setUp error, "+e.name+", "+e.message);
    }
};


/** 
 * Tear down function for the admed.tcm Service.
 */
admed.tcm.Service.tearDownTest = function() {
    try {
        trace("tearDown test");
    } catch (e) {
        admed.err("tearDown error, "+e.name+", "+e.message);
    }
};


/** 
 * Test that the contents of the admed.tcm module have been defined.
 */
admed.tcm.Service.testModuleContents = function() {
    
    admed.info("Test \"==== admed.tcm Service.Tests :: testModuleContents ====\" started.");
    
    assert.isNotUndefined(admed.tcm, "admed.tcm is undefined"); 
    
    assert.isNotUndefined(admed.tcm.Service, "admed.tcm.Service is undefined"); 
    var service = new admed.tcm.Service("foo");
    assert.isNotUndefined(service.query, "service.query is undefined");
        
};


/** 
 * Test converting sparql results to assaygroup.
 */
admed.tcm.Service.testParseSPARQLResultSetSingleProbe = function() {
    admed.info("Test \"==== admed.tcm.Service Tests :: testParseSPARQLResultSetSingleProbe ====\" started.");
	
	var groups = admed.tcm.AssayGroup.newInstancesFromResultSet(resultSet_1616608_a_at);
	assert.isNotNull(groups, "groups is null");
	assert.areEqual(1, groups.length, "expected 1 group");
	
	var group = groups[0];
	
	assert.areEqualAssayGroups(assaygroup_1616608_a_at, group);
	
};


admed.tcm.Service.testQuery = function( endpoint, runner ) {
    admed.info("Test \"==== admed.tcm.Service Tests :: testQuery ====\" started.");

	var service = new admed.tcm.Service();
	service.setEndpoint(endpoint);
	
	function success(o) {
		trace("success case, resume runner");
		runner.resume(function() {
            // check status code            
            assert.areEqual(200, o.status);
            
            // try parsing response text as json
            var resultSet = YAHOO.lang.JSON.parse(o.responseText);
            
            // check json content
            assert.isTrue(resultSet["boolean"], "result set not as expected");
		});
	}
	
	function failure(o) {
        trace("failure case, resume runner");
        runner.resume(function() {
            assert.fail("request failed, status "+o.status+" "+o.statusText);
        });
	}
	
	var query = "ASK { ?s ?p ?o }";
	
	trace("make call");
	service.query(query, success, failure);
	
	trace("suspend runner, if test hangs here there is a problem")
	runner.wait();
	
	assert.fail("this should never be reached");
	
};


//admed.tcm.Service.testGetAssaysByAffyProbeId = function( id, expected, endpoint, runner ) {
//    admed.info("Test \"==== admed.tcm.Service Tests :: testGetAssaysByAffyProbeId ====\" started.");
//
//    var service = new admed.tcm.Service();
//    service.setEndpoint(endpoint);
//    
//    function success(groups) {
//        trace("success case, resume runner");
//        runner.resume(function() {
//        	assert.areEqual(1, groups.length, "expected 1 assay group");
//        	assert.areEqualAssayGroups(expected, groups[0]);
//    	});
//    }
//
//    function failure(o) {
//        trace("failure case, resume runner");
//        runner.resume(function() {
//            assert.fail("request failed, status "+o.status+" "+o.statusText);
//        });
//    }
//
//    trace("make call");
//    try {
//	    service.getAssaysByAffyProbeId(id, success, failure);
//    } catch (e) {
//    	admed.err("caught exception: "+e.name+" "+e.message);
//    	for (var p in e) { trace(p+" : "+e[p]); }
//    	assert.fail("unexpected error, may mean exceed url length? N.B. IE max length 2083.");
//    	// ie error code -2147467259
//    }
//    
//    trace("suspend runner, if test hangs here there is a problem")
//    runner.wait();
//    
//    assert.fail("this should never be reached");
//    
//}



// ************************************************************
// TEST CASE
// ************************************************************


var pause = 500;

/** 
 * Construct a YUI test case for the admed.tcm Service.
 * @return a YUI test case
 * @type YAHOO.tool.TestCase
 */
admed.tcm.Service.TestCase = function( endpointURL ) {
    
    var testCase = new YAHOO.tool.TestCase({
        name: "=== admed.tcm Service.Tests ===",
        setUp : admed.tcm.Service.setUpTest,
        tearDown : admed.tcm.Service.tearDownTest,
        testModuleContents : admed.tcm.Service.testModuleContents
    });
    
    return testCase;
    
};

 
// ************************************************************
// TEST SUITE & RUNNER
// ************************************************************


/** 
 * Construct a YUI test suite for the admed.tcm module.
 * @param {String} endpointURL URL of service
 * @return a YUI test suite
 * @type YAHOO.tool.TestSuite
 */
admed.tcm.Service.TestSuite = function( endpointURL ) {
    var suite = new YAHOO.tool.TestSuite("== admed.tcm Test Suite ==");
    suite.add(admed.tcm.Service.TestCase(endpointURL));
    return suite;
}

/** 
 * Run the admed.tcm test suite.
 * @param {String} endpointURL URL of service
 */
admed.tcm.Service.runTests = function( endpointURL ) {
    trace("admed.tcm :: running tests");
    YAHOO.tool.TestRunner.clear();
    YAHOO.tool.TestRunner.add(admed.tcm.Service.TestSuite(endpointURL));
    YAHOO.tool.TestRunner.run();
}
