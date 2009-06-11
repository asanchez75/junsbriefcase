var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.genesome.Service.ServiceTests = function(){};

var pause = 300;

admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID_twoMapping = function( testCase, endpointURL, geneIDs ) {

	log("Test \"==== admed.genesome.Service ServiceTests :: testFindImagesByFlybaseGeneID_noMapping ====\" started.");
	var _context = "Test \"==== admed.genesome.Service ServiceTests :: testFindImagesByFlybaseGeneID_noMapping ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.genesome.Service(endpointURL);

	var testOnSuccess = function( _diseaseArray ) {
		
		testCase.resume(function() {

			admed.debug("size of the results " + _diseaseArray.size(), _context);
			assert.areEqual(1, _diseaseArray.size(), "expect empty array of diseases if no mapping");
		
			var keys = _diseaseArray.keySet();
			assert.areEqual(1, keys.length, "the key is not right");
			admed.info("keys " + keys[0], _context);
			assert.areEqual("http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/IL6", keys[0], "the key is not right");
			
			var values = _diseaseArray.valSet();
			assert.areEqual(2, values.length, "the value is not right");
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findDiseaseAssociatedWithGeneBatch(geneIDs, testOnSuccess, testOnFailure);

	// N.B. this is not asynchronous as expect service to respond immediately if no mappings are available
	// 
	// log("suspend test case (if test runner hangs here, something is wrong)", "test");
	testCase.wait();	
};

admed.genesome.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindDiseasesByGeneID_noMapping_for_IL6 : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindImagesByFlybaseGeneID_noMapping ====\" started.");
            var tc = this;
            var genes = new Array();
            admed.util.appendIfNotMember(genes,"http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/IL6");
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID_twoMapping(tc, endpointURL, genes);}, pause);
		},
		
//		testFindDiseasesByGeneID_noMapping_batch : function() {
//			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_noMapping_batch ====\" started.");
//            var tc = this;
//            var genes = new Array();
//            admed.util.appendIfNotMember(genes,"http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/IL6");
//            admed.util.appendIfNotMember(genes,"http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/MAPK1");
//            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID_noMapping(tc, endpointURL, genes);}, pause);
//		},
	});
	
	return testCase;
};

admed.genesome.Service.TestSuite = function(endpointURL) {
	var suite = new YAHOO.tool.TestSuite("== admed.genesome.Service Test Suite ==");
	suite.add(admed.genesome.Service.ServiceTestCase(endpointURL));
	return suite;
};

/** 
 * Run the admed.genesome.Service test suite.
 * @param {String} endpointURL URL of service
 */
admed.genesome.Service.runTests = function(endpointURL) {
	YAHOO.log("admed.genesome.Service :: running tests", "test");
    YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(admed.genesome.Service.TestSuite(endpointURL));
	YAHOO.tool.TestRunner.run();
}