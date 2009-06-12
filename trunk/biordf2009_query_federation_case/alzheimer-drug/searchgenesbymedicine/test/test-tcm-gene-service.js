var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.tcmgene.Service.ServiceTests = function(){};

var pause = 300;

admed.tcmgene.Service.ServiceTests.testFindGenesByHerbID_Ginkgo = function( testCase, endpointURL, herbID ) {

	log("Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID_Ginkgo ====\" started.");
	var _context = "Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID_Ginkgo ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.tcmgene.Service(endpointURL);

	var testOnSuccess = function( genes ) {
		
		testCase.resume(function() {

			admed.debug("size of the results " + _diseaseArray.size(), _context);
			assert.areEqual(11, genes.length, "expect number of genes no mapping");
		
			var keys = _diseaseArray.keySet();
			assert.areEqual(1, keys.length, "the key is not right");
			admed.info("keys " + keys[0], _context);
			assert.areEqual("http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/IL6", keys[0], "the key is not right");
			
			var values = _diseaseArray.valSet();
			assert.areEqual(2, values[0].length, "the value is not right");
			
			admed.debug("first value " + values[0][0].diseaseURL, _context);
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

admed.tcmgene.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindGenesByHerbID_Ginkgo : function() {
			log("Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID_Ginkgo ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba";
            tc.wait(function() {admed.tcmgene.Service.ServiceTests.testFindGenesByHerbID_Ginkgo(tc, endpointURL, herbID);}, pause);
		}
		
	});
	
	return testCase;
};

admed.tcmgene.Service.TestSuite = function(endpointURL) {
	var suite = new YAHOO.tool.TestSuite("== admed.tcmgene.Service Test Suite ==");
	suite.add(admed.tcmgene.Service.ServiceTestCase(endpointURL));
	return suite;
};

/** 
 * Run the admed.tcmgene.Service test suite.
 * @param {String} endpointURL URL of service
 */
admed.tcmgene.Service.runTests = function(endpointURL) {
	YAHOO.log("admed.tcmgene.Service :: running tests", "test");
    YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(admed.tcmgene.Service.TestSuite(endpointURL));
	YAHOO.tool.TestRunner.run();
}