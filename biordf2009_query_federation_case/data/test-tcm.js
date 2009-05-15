/**
 * This script contains tests for the TCM Sparql Endpoint.
  * @author Jun Zhao
 */
// convenience variables
var Assert = YAHOO.util.Assert;
var log = YAHOO.log;
var JSON = YAHOO.lang.JSON;

var sparqlns = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n";
sparqlns += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
sparqlns += "PREFIX xs: <http://www.w3.org/2001/XMLSchema#> \n";
sparqlns += "PREFIX : <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/> \n";

var _tests = [
	
   	{   name: "test has data", 
    	query:  "ASK { ?s ?p ?o . }",
        expect: true,
    	message:"endpoint has no data"
    },
    {   name: "test has medicine", 
        query:  "ASK { ?s a :Medicine . }",
        expect: true,
        message:"endpoint has no instances of :Medicine"
    },
    {   name: "test has gene", 
        query:  "ASK { ?s a :Gene . }",
        expect: true,
        message:"endpoint has no instances of :Gene"
    },
    {   name: "test has ingredient", 
        query:  "ASK { ?s a :Ingredient . }",
        expect: true,
        message:"endpoint has no instances of :Ingredient"
    },
    {   name: "test has effect", 
        query:  "ASK { ?s a :Effect . }",
        expect: true,
        message:"endpoint has no instances of :Effect"
    },
    {   name: "test has disease", 
        query:  "ASK { ?s a :Disease . }",
        expect: true,
        message:"endpoint has no instances of :Disease"
    },
    {   name: "test has medicine with all props", 
        query:  "ASK { \n" +
        		"?s a :Medicine ;\n" +
        		" :ingredient ?ingredient ;\n" +
        		" :association ?gene ;\n" +
        		" :effect ?effect ;\n" +
        		" :treatment ?treatment ;\n" +
        		" :medicine_disease_tvalue  ?medicine_disease_tvalue ;\n" +
        		" :medicine_gene_disease_association_tvalue ?medicine_gene_disease_association_tvalue ;\n" +
        		" :medicine_ingredient_association_tvalue ?medicine_ingredient_association_tvalue ;\n" +
        		" :medicine_gene_association_tvalue ?medicine_gene_association_tvalue ;\n" +
        		" :medicine_effect_association_tvalue ?medicine_effect_association_tvalue " +
        		". \n" +
        		"}",
        expect: true,
        message:"endpoint has no instances of :Medicine with all expected props"
    }          
];

var _testCase = {
	name: "TCM SPARQL Endpoint Test Case"
};


// test endpoint exists
_testCase.testEndpointExists = function() {

	// define the callback object
	var callback = {
		success: testEndpointExistsResponseSuccess(this),
		failure: testEndpointExistsResponseFailure(this)
	};
	
	log("Make the request");
	var request = YAHOO.util.Connect.asyncRequest("GET", "tcm", callback, null);
	
	log("Suspend the test runner");
	this.wait();
	
	log("N.B. this code should never be reached.");
}

function buildTestCase() {
	// add ask query tests to testcase object
	for (var i=0; i<_tests.length; i++) {
	    var _test = _tests[i];
        log("adding test "+_test.name+" to testcase, query is: "+_test.query);
	    _testCase[_test.name] = buildTestFunction(_test.name, _test.query, _test.expect, _test.message);
	}
}

// pause between tests to avoid tripping mod_evasive
var pause = 500;

function buildTestFunction(testname, query, expect, message) {
	return function() {
        log("test: "+testname);
        var _query = sparqlns + query;
        var e_query = document.getElementById("query");
        if (e_query.textContent) {
        	e_query.textContent = _query;
        } else {
        	e_query.innerText = _query;
        }
        var tc = this;
        tc.wait(function() {
        	testAskQuery("tcm", tc, query, expect, message);
       	}, pause);
	}
}

function setup() {
	var logReader = new YAHOO.tool.TestLogger("logger");
	YAHOO.log("Logger setup done");	
	buildTestCase();
	YAHOO.log("populate select...");
	var select = document.getElementById("selecttest");
	select.innerHTML = "";
	for (var i=0; i<_tests.length; i++) {
		var _test = _tests[i];
		var option = document.createElement("option");
		option.innerHTML = _test.name;
		select.appendChild(option);
	}
}

function runTests() {
    document.getElementById("query").innerHTML = "";
	YAHOO.log("Running tests");
	YAHOO.tool.TestRunner.clear();
	YAHOO.tool.TestRunner.add(new YAHOO.tool.TestCase(_testCase));
	YAHOO.tool.TestRunner.run();
}

function runTest(index) {
	YAHOO.log("runTest: "+index);
    var test = _tests[index];
    YAHOO.log("found test: "+test.message);
    var testCase = {name: "TCM SPARQL Endpoint Test Case: "+test.name};
    if (typeof test != "undefined" || test) {
        testCase[test.name] = buildTestFunction(test.name, test.query, test.expect, test.message);
        YAHOO.log("Running tests");
        YAHOO.tool.TestRunner.clear();
        YAHOO.tool.TestRunner.add(new YAHOO.tool.TestCase(testCase));
        YAHOO.tool.TestRunner.run();
    } else {
        YAHOO.log("test not found", "error");
    }
}

function runSelected() {
    var value = document.getElementById("selecttest").value;
    log("select value: "+value);
	var index = document.getElementById("selecttest").selectedIndex;
	log("select index: "+index)
    runTest(index);
}

YAHOO.util.Event.onDOMReady(setup);
