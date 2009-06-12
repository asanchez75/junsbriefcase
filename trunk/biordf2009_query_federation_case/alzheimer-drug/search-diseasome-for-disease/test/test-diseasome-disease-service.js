var log = YAHOO.log;
var assert = YAHOO.util.Assert;

admed.genesome.Service.ServiceTests = function(){};

var pause = 300;

admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID = function( testCase, endpointURL, geneID, expected ) {

	log("Test \"==== admed.genesome.Service ServiceTests :: testFindImagesByFlybaseGeneID_noMapping ====\" started.");
	var _context = "Test \"==== admed.genesome.Service ServiceTests :: testFindImagesByFlybaseGeneID_noMapping ====\" started.";

	//var flybaseID = "foo"; 
	var service = new admed.genesome.Service(endpointURL);

	var testOnSuccess = function( diseases ) {
		
		testCase.resume(function() {

			admed.debug("size of the results " + diseases.length, _context);
			assert.areEqual(expected, diseases.length, "expect number of diseases no mapping");
		});
			
	};

	var testOnFailure = function( response ) {
		assert.fail("request failed: "+response.status+" "+response.statusText+" "+response.responseText);			
	};

	log("initiate request", "test");
	service.findDiseaseAssociatedWithGene(geneID, testOnSuccess, testOnFailure);

	// 
	// log("suspend test case (if test runner hangs here, something is wrong)", "test");
	testCase.wait();	
};

admed.genesome.Service.ServiceTestCase = function (endpointURL){
	var testCase = new YAHOO.tool.TestCase({
		
		testFindDiseasesByGeneID_for_ACHE : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_ACHE ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/ACHE";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 2);}, pause);
		},
		
		testFindDiseasesByGeneID_for_AGPS : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_AGPS ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/AGPS";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 2);}, pause);
		},
		
		testFindDiseasesByGeneID_for_MAPT : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_MAPT ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/MAPT";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 10);}, pause);
		},
		
		testFindDiseasesByGeneID_for_APOE : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_APOE ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/APOE";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 8);}, pause);
		},
		
		testFindDiseasesByGeneID_for_APP : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_APP ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/APP";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 6);}, pause);
		},
		
		testFindDiseasesByGeneID_for_ADAMTS2 : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_ADAMTS2 ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/ADAMTS2";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 2);}, pause);
		},
		
		testFindDiseasesByGeneID_for_TTR : function() {
			log("Test \"==== admed.genesome.Service ServiceTests :: testFindDiseasesByGeneID_for_TTR ====\" started.");
            var tc = this;
            var geneID = "http://www4.wiwiss.fu-berlin.de/diseasome/resource/genes/TTR";
            tc.wait(function() {admed.genesome.Service.ServiceTests.testFindDiseasesByGeneID(tc, endpointURL, geneID, 8);}, pause);
		},
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