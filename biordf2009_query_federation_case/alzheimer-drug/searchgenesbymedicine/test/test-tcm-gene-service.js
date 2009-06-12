var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.genetcm.Service.ServiceTests = function(){};

var pause = 300;

admed.genetcm.Service.ServiceTests.testFindGenesByHerbID = function( testCase, endpointURL, herbID, expected, expectedDis ) {

	log("Test \"==== admed.genetcm.Service ServiceTests :: testFindGenesByHerbID ====\" started.");
	var _context = "Test \"==== admed.genetcm.Service ServiceTests :: testFindGenesByHerbID ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.genetcm.Service(endpointURL);

	var testOnSuccess = function( genes ) {
		
		testCase.resume(function() {

//			admed.debug("size of the results " + genes.length, _context);
			assert.areEqual(expected, genes.length, "expect number of genes no mapping");
			
			var mappingToDiseasome = 0;
			
			for (var i in genes){
				var gene = genes[i];
				if (gene.diseasesomegene){
					mappingToDiseasome ++;		
				}
			}
			
			assert.areEqual(expectedDis, mappingToDiseasome, "expect number of mappingToDiseasome no mapping");
			
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findGenesAssociatedWithMedicine(herbID, testOnSuccess, testOnFailure);

	// N.B. this is not asynchronous as expect service to respond immediately if no mappings are available
	testCase.wait();	
};

admed.genetcm.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindGenesByHerbID_Ginkgo : function() {
			log("Test \"==== admed.genetcm.Service ServiceTests :: testFindGenesByHerbID_Ginkgo ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba";
            tc.wait(function() {admed.genetcm.Service.ServiceTests.testFindGenesByHerbID(tc, endpointURL, herbID, 11, 4);}, pause);
		},
		
		testFindGenesByHerbID_ : function() {
			log("Test \"==== admed.genetcm.Service ServiceTests :: testFindGenesByHerbID_Polygala ====\" started.");
            var tc = this;
            var herbID = "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia";
            tc.wait(function() {admed.genetcm.Service.ServiceTests.testFindGenesByHerbID(tc, endpointURL, herbID, 2,1);}, pause);
		}
		
	});
	
	return testCase;
};

admed.genetcm.Service.TestSuite = function(endpointURL) {
	var suite = new YAHOO.tool.TestSuite("== admed.genetcm.Service Test Suite ==");
	suite.add(admed.genetcm.Service.ServiceTestCase(endpointURL));
	return suite;
};

/** 
 * Run the admed.genetcm.Service test suite.
 * @param {String} endpointURL URL of service
 */
admed.genetcm.Service.runTests = function(endpointURL) {
	YAHOO.log("admed.genetcm.Service :: running tests", "test");
    YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(admed.genetcm.Service.TestSuite(endpointURL));
	YAHOO.tool.TestRunner.run();
}