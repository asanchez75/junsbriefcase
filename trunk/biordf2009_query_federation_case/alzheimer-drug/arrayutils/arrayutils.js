// create a namespace if not already defined
lodd.namespace("lodd.util");


/**
 * @class
 * This class is currently just a trigger to make jsdoc document this module properly.
 * @constructor
 */
lodd.util.ArrayUtils = function() {}


/**
 * Test if an array contains a given object.
 * @param {Array} array 
 * @param {Object} member
 * @return true if member occurs anywhere in array
 * @type boolean
 */
lodd.util.isArrayMember = function( array, member ) {
	for (var i in array) {
		if (array[i] == member) {
			return true;
		}
	}
	return false;
};


/**
 * Append object to an array only if not already a member.
 * @param {Array} array 
 * @param {Object} member
 */
lodd.util.appendIfNotMember = function( array, member ) {
	if (!lodd.util.isArrayMember(array, member)) {
		array[array.length] = member;
	}
};


/**
 * Compare members of two arrays.
 * @param {Array} A
 * @param {Array} B
 * @return true iff all members of A are members of B and vice versa, otherwise false
 * @return boolean
 */
lodd.util.arrayMembersAreEqual = function( A, B ) { // TODO consider better name e.g arraysHaveSameMembers
	for (var i in A) {
		if (!lodd.util.isArrayMember(B, A[i])) {
			return false;
		}
	} 
	for (var i in B) {
		if (!lodd.util.isArrayMember(A, B[i])) {
			return false;
		}
	}
	return true;
};