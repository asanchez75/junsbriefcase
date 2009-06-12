var log = YAHOO.log;
var assert = YAHOO.util.Assert;


admed.genebatch.GeneBatchWidget.ControllerTests = function() {};
 //

admed.genebatch.GeneBatchWidget.ControllerTests.setUpTest = function( endpointURL, endpointURL2, testCase ) {
	log("Test \"==== admed.genebatch.GeneBatchWidget.ControllerTests.setUpTest ====\" started.");
		// create a model
	testCase.model = new admed.mvcutils.GenericModel2();
	testCase.model.setDefinition(admed.genebatch.GeneBatchWidget.modelDefinition);

	// create a service
	testCase.service = new admed.genetcm.Service(endpointURL);
	testCase.service2 = new admed.genesome.Service(endpointURL2);
	
	// create a dummy widget
	testCase.dummyWidget = {};
	
	// create a new controller instance
	testCase.controller = new admed.genebatch.GeneBatchWidget.Controller(testCase.model, testCase.service, testCase.service2, testCase.dummyWidget);
	
};

admed.genebatch.GeneBatchWidget.ControllerTests.tearDownTest = function( testCase ) {
	log("tearDown test");
};


admed.genebatch.GeneBatchWidget.ControllerTests.testInit = function( testCase ) {
	log("Test \"==== admed.genebatch.GeneBatchWidget.ControllerTests.testInit ====\" started.");
		// create a model
	var model = testCase.model;

	// check the model properties
	assert.areEqual("READY", model.get("STATE"));
	assert.isNull(model.get("RESULTS"));
	assert.isNull(model.get("ERRORMESSAGE"));
	assert.isNull(model.get("QUERY"));
	
};


admed.genebatch.GeneBatchWidget.ControllerTestCase = function(endpointURL, endpointURL2){
	//TODO
	admed.info("== admed.genebatch.GeneBatchWidget ControllerTestCase ==");
	
	var testCase = new YAHOO.tool.TestCase({
		
		name: "=== admed.genebatch.GeneBatchWidget ControllerTestCase Tests ===",
		
		setUp : function() {
			log("Test \"==== admed.genebatch.GeneBatchWidget.ControllerTests.setUpTest ====\" started.");
			admed.genebatch.GeneBatchWidget.ControllerTests.setUpTest(endpointURL, endpointURL2, this);
		},
		
		tearDown : function() {
			log("Test \"==== admed.genebatch.GeneBatchWidget.ControllerTests.tearDown ====\" started.");
			admed.genebatch.GeneBatchWidget.ControllerTests.tearDownTest(this);
		},
		
		testInit : function(){
			log("Test \"==== admed.genebatch.GeneBatchWidget.ControllerTests.testInit ====\" started.");
			admed.genebatch.GeneBatchWidget.ControllerTests.testInit(this);
		}
		
	});
	
	return testCase;
};

admed.genebatch.GeneBatchWidget.TestSuite = function(endpointURL, endpointURL2) {
	
	var suite = new YAHOO.tool.TestSuite("== admed.genebatch.GeneBatchWidget Test Suite ==");
	
	suite.add(admed.genebatch.GeneBatchWidget.ControllerTestCase(endpointURL, endpointURL2));
	
	return suite;
	
};


admed.genebatch.GeneBatchWidget.runTests = function(endpointURL, endpointURL2) {
	
	admed.info("admed.genebatch.GeneBatchWidget :: running tests");
	YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(admed.genebatch.GeneBatchWidget.TestSuite(endpointURL, endpointURL2));
	YAHOO.tool.TestRunner.run();
	
};