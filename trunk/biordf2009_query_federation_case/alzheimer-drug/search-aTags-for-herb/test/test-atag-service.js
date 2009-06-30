// Shortcuts
var trace = function(message) { YAHOO.log(message, "test"); };
var assert = YAHOO.util.Assert;
var log = YAHOO.log;

admed.atags.Service.ServiceTests = function(){};

admed.atags.Service.ServiceTests.testFindAtagsForGinkgo = function( testCase, endpointURL, herbID ) {
	log("Test \"==== admed.atags.Service ServiceTests :: testFindAtagsForGinkgo ====\" started.");
	var _context = "Test \"==== admed.atags.Service ServiceTests :: testFindAtagsForGinkgo ====\" started.";

	 
	var service = new admed.atags.Service(endpointURL);

	var testOnSuccess = function( atags ) {
		
		testCase.resume(function() {

			assert.isNotUndefined(atags, "map should be defined");	
			assert.areEqual(21, atags.length, "expected number of atags not mapping");
			
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findAtagsForMedicine(herbID, testOnSuccess, testOnFailure);

	// 
	// log("suspend test case (if test runner hangs here, something is wrong)", "test");
	testCase.wait();	
};



// TEST CASE
// ************************************************************


var pause = 500;

admed.atags.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindAtagsForGinkgo : function() {
			log("Test \"==== admed.atags.Service ServiceTests :: testFindAtagsForGinkgo ====\" started.");
            var tc = this;
            var herbID = "http://dbpedia.org/resource/Ginkgo_biloba";
            tc.wait(function() {admed.atags.Service.ServiceTests.testFindAtagsForGinkgo(tc, endpointURL, herbID);}, pause);
		},
	});
	
	return testCase;
};

 
// ************************************************************
// TEST SUITE & RUNNER
// ************************************************************


/** 
 * Construct a YUI test suite for the admed.atags module.
 * @param {String} endpointURL URL of service
 * @return a YUI test suite
 * @type YAHOO.tool.TestSuite
 */
admed.atags.Service.TestSuite = function( endpointURL ) {
    var suite = new YAHOO.tool.TestSuite("== admed.atags Test Suite ==");
    suite.add(admed.atags.Service.ServiceTestCase(endpointURL));
    return suite;
};

/** 
 * Run the admed.atags test suite.
 * @param {String} endpointURL URL of service
 */
admed.atags.Service.runTests = function( endpointURL ) {
    trace("admed.atags :: running tests");
    YAHOO.tool.TestRunner.clear();
    YAHOO.tool.TestRunner.add(admed.atags.Service.TestSuite(endpointURL));
    YAHOO.tool.TestRunner.run();
};
