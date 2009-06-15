var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.effecttcm.Service.ServiceTests = function(){};

var pause = 300;

admed.effecttcm.Service.ServiceTests.testFindEffectsByHerbID = function( testCase, endpointURL, herbID, expected) {

	log("Test \"==== admed.effecttcm.Service ServiceTests :: testFindGenesByHerbID ====\" started.");
	var _context = "Test \"==== admed.effecttcm.Service ServiceTests :: testFindGenesByHerbID ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.effecttcm.Service(endpointURL);

	var testOnSuccess = function( effects ) {
		
		testCase.resume(function() {

//			admed.debug("size of the results " + effects.length, _context);
			assert.areEqual(expected, effects.length, "expect number of effects no mapping");
						
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findEffectByMedicineName(herbID, testOnSuccess, testOnFailure);

	// N.B. this is not asynchronous as expect service to respond immediately if no mappings are available
	testCase.wait();	
};

admed.effecttcm.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindEffectsByHerbID_Ginkgo : function() {
			log("Test \"==== admed.effecttcm.Service ServiceTests :: testFindEffectsByHerbID_Ginkgo ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba";
            tc.wait(function() {admed.effecttcm.Service.ServiceTests.testFindEffectsByHerbID(tc, endpointURL, herbID, 45);}, pause);
		},
		
		testFindEffectsByHerbID_Polygala : function() {
			log("Test \"==== admed.effecttcm.Service ServiceTests :: testFindEffectsByHerbID_Polygala ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia";
            tc.wait(function() {admed.effecttcm.Service.ServiceTests.testFindEffectsByHerbID(tc, endpointURL, herbID, 1);}, pause);
		}
		
	});
	
	return testCase;
};

admed.effecttcm.Service.TestSuite = function(endpointURL) {
	var suite = new YAHOO.tool.TestSuite("== admed.effecttcm.Service Test Suite ==");
	suite.add(admed.effecttcm.Service.ServiceTestCase(endpointURL));
	return suite;
};

/** 
 * Run the admed.effecttcm.Service test suite.
 * @param {String} endpointURL URL of service
 */
admed.effecttcm.Service.runTests = function(endpointURL) {
	YAHOO.log("admed.effecttcm.Service :: running tests", "test");
    YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(admed.effecttcm.Service.TestSuite(endpointURL));
	YAHOO.tool.TestRunner.run();
}