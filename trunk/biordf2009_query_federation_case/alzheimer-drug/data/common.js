/**
 * Create a "success" callback function for an asynchronous request, which tests that
 * the endpoint is alive. N.B. if the joseki endpoint is alive, we expect
 * a 400 response, therefore this function forces a test failure.
 * @param testcase the testcase to resume running
 */
function testEndpointExistsResponseSuccess( testcase ) {
	return function(o) {
		log("Response success");
		testcase.resume(function() {
			log("Resumed test runner");
			Assert.areEqual(200, o.status, "Status code should be 200");
		});
	}
}

/**
 * Create a "failure" callback function for an asynchronous request, which tests that
 * the endpoint is alive. N.B. if the joseki endpoint is alive, we expect
 * a 400 response.
 * @param testcase the testcase to resume running
 */
function testEndpointExistsResponseFailure( testcase ) {
	return function(o) {
		log("Response failure, expect 200");
		testcase.resume(function() {
			log("Resumed test runner, testing request status code");
			Assert.areEqual(200, o.status, "Status code should be 200");
		});
	}
}

function testExternalEndpointExistsResponseSuccess( testcase ) {
	return function(o) {
		log("Response success");
		testcase.resume(function() {
			log("Resumed test runner");
			Assert.fail("Status code should be 200");
		});
	}
}

function testExternalEndpointExistsResponseFailure( testcase ) {
	return function(o) {
		log("Response failure, expect 200");
		testcase.resume(function() {
			log("Resumed test runner, testing request status code");
			Assert.areEqual(200, o.status, "Status code should be 200");
		});
	}
}

/**
 * Create a "failure" callback function for an asynchronous request, which forces a 
 * test failure if the HTTP request has failed.
 * @param testcase the testcase to resume running
 */
function genericResponseFailure( testcase ) {
	return function(o) {
		log("Request failure");
		testcase.resume(function() {
			// force failure
			YAHOO.log("Resumed test runner");
			Assert.fail("Request failed, response code "+o.status+", "+o.statusText+", "+o.responseText);
		});	
	}
}

/**
 * Create a "success" callback for an asynchronous request, to test the
 * response to a SPARQL ASK query.
 * @param testcase the testcase to resume running
 * @param expected the expected response to the ASK query (true or false)
 * @param failureMessage a message to display if the test fails
 */
function genericAskQueryResponseSuccess( testcase, expected, failureMessage ) {
	return function(o) {
		log("Request success");
		testcase.resume(function() {
			log("Resumed test runner");
			
			var data;
			
			try {
				log("Parse the response text");
				data = JSON.parse(o.responseText);
			} catch (e) {
				Assert.fail("Exception parsing JSON response: " + o.responseText + e);
			}

			log("Test if ASK returns as expected");
			Assert.areEqual(expected, data["boolean"], failureMessage);

		});
	}
}


/**
 * Create a "success" callback for an asynchronous request, to test if
 * a SPARQL SELECT query has more than one binding.
 * @param testcase the testcase to resume running
 * @param failureMessage a message to display if the test fails
 */
function testSelectQueryResponseSuccess (testcase, failureMessage){
	return function(o) {
		log("Request success");
		testcase.resume(function() {
			log("Resumed test runner");
			
			var data;
			
			try {
				log("Parse the response text");
				data = JSON.parse(o.responseText);
			} catch (e) {
				Assert.fail("Exception parsing JSON response: " + o.responseText + e);
			}

			log("Test if SELECT returns at least one binding");
			Assert.isTrue(data.results.bindings.length>0, failureMessage);
		});
		
	}
}


function testSelectQueryExpectNumBindingsResponseSuccess (testcase, numberExpected, failureMessage){
	return function(o) {
		log("Request success");
		testcase.resume(function() {
			log("Resumed test runner");
			
			var data;
			
			try {
				log("Parse the response text");
				data = JSON.parse(o.responseText);
			} catch (e) {
				Assert.fail("Exception parsing JSON response: " + o.responseText + e);
			}

			log("Test if SELECT returns " + numberExpected + " number of binding ");
			Assert.areEqual(numberExpected, data.results.bindings.length, failureMessage);
		});
		
	}
}
/**
 * Execute an asynchronous test for a SPARQL ASK query.
 * @param endpoint SPARQL endpoint URL
 * @param testcase the testcase context
 * @param query the SPARQL ASK query
 * @param expected the expected boolean value of the query
 * @param failureMessage the message
 */
function testAskQuery( endpoint, testcase, query, expected, failureMessage) {

		//define the callback object
		var callback = {
			success: genericAskQueryResponseSuccess(testcase, expected, failureMessage),
			failure: genericResponseFailure(testcase)
		};
		
		// define SPARQL query & URL
		query = sparqlns + query;	
		
        var url = endpoint + "?output=json&query=" + escape(query);
        
        log("Unescaped query: "+query);
        
        var method = "GET";
		
		log("Make the request to "+url);
		var request = YAHOO.util.Connect.asyncRequest(method, url, callback, null);
		
		log("Suspend the test runner");
		testcase.wait();
	
}

function testSelectQuery( endpoint, testcase, query, expected, failureMessage) {

		//define the callback object
		var callback = {
			success: testSelectQueryResponseSuccess(testcase, expected, failureMessage),
			failure: genericResponseFailure(testcase)
		};
		
		// define SPARQL query & URL
		query = sparqlns + query;
		var url = endpoint + "?output=json&query=" + escape(query);
		log("Unescaped query: "+query);
		
		log("Make the request to "+url);
		var request = YAHOO.util.Connect.asyncRequest("GET", url, callback, null);
		
		log("Suspend the test runner");
		testcase.wait();
	
}

function testSelectQueryExpectNoBindings( endpoint, testcase, query, failureMessage ) {

		//define the callback object
		var callback = {
			success: testSelectQueryExpectNoBindingsResponseSuccess(testcase, failureMessage),
			failure: genericResponseFailure(testcase)
		};
		
		// define SPARQL query & URL
		query = sparqlns + query;
		var url = endpoint + "?output=json&query=" + escape(query);
		log("Unescaped query: "+query);
		
		log("Make the request to "+url);
		var request = YAHOO.util.Connect.asyncRequest("GET", url, callback, null);
		
		log("Suspend the test runner");
		testcase.wait();
	
	
}

function testSelectQueryExpectNoBindingsResponseSuccess (testcase, failureMessage){
	return function(o) {
		log("Request success");
		testcase.resume(function() {
			log("Resumed test runner");
			
			var data;
			
			try {
				log("Parse the response text");
				data = JSON.parse(o.responseText);
			} catch (e) {
				Assert.fail("Exception parsing JSON response: " + o.responseText + e);
			}
			
			var bindings = data.results.bindings;

			log("Test if SELECT returns any unexpected bindings");
			if (bindings.length > 0) {
				log("Found "+bindings.length+" unexpected bindings.", "error");
				for (var i=0;i<bindings.length;i++) {
					log("Found unexpected binding: "+JSON.stringify(bindings[i]),"error");
				}
				Assert.fail(failureMessage);
			}
		});
		
	}
}

function testRightSelectQueryResponseSuccess (testcase, expected, failureMessage){
	return function(o) {
		log("Request success");
		testcase.resume(function() {
			log("Resumed test runner");
			
			var data;
			
			try {
				log("Parse the response text");
				data = JSON.parse(o.responseText);
			} catch (e) {
				Assert.fail("Exception parsing JSON response: " + o.responseText + e);
			}
			
			var bindings = data.results.bindings;

			log("Test if SELECT returns any unexpected bindings");
			if (bindings.length > 0) {
				var binding = bindings[0];
				log("Found "+bindings.length+" unexpected bindings.", "error");
				for (var variable in binding) {
					Assert.areEqual(expected, binding[variable]["value"],failureMessage );
				}
			}
		});
		
	}
}

