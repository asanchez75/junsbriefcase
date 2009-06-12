var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.tcmgene.Service.ServiceTests = function(){};

var pause = 300;

admed.tcmgene.Service.ServiceTests.testFindGenesByHerbID = function( testCase, endpointURL, herbID, expected ) {

	log("Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID ====\" started.");
	var _context = "Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.tcmgene.Service(endpointURL);

	var testOnSuccess = function( genes ) {
		
		testCase.resume(function() {

//			admed.debug("size of the results " + genes.length, _context);
			assert.areEqual(expected, genes.length, "expect number of genes no mapping");
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findDiseaseAssociatedWithGeneBatch(geneIDs, testOnSuccess, testOnFailure);

	// N.B. this is not asynchronous as expect service to respond immediately if no mappings are available
	testCase.wait();	
};

admed.tcmgene.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindGenesByHerbID_Ginkgo : function() {
			log("Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID_Ginkgo ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba";
            tc.wait(function() {admed.tcmgene.Service.ServiceTests.testFindGenesByHerbID(tc, endpointURL, herbID, 11);}, pause);
		},
		
		testFindGenesByHerbID_ : function() {
			log("Test \"==== admed.tcmgene.Service ServiceTests :: testFindGenesByHerbID_Polygala ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia";
            tc.wait(function() {admed.tcmgene.Service.ServiceTests.testFindGenesByHerbID(tc, endpointURL, herbID, 0);}, pause);
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