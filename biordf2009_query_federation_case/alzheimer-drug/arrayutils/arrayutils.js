// create a namespace if not already defined
admed.namespace("admed.util");


/**
 * @class
 * This class is currently just a trigger to make jsdoc document this module properly.
 * @constructor
 */
admed.util.ArrayUtils = function() {}


/**
 * Test if an array contains a given object.
 * @param {Array} array 
 * @param {Object} member
 * @return true if member occurs anywhere in array
 * @type boolean
 */
admed.util.isArrayMember = function( array, member ) {
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
admed.util.appendIfNotMember = function( array, member ) {
	if (!admed.util.isArrayMember(array, member)) {
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
admed.util.arrayMembersAreEqual = function( A, B ) { // TODO consider better name e.g arraysHaveSameMembers
	for (var i in A) {
		if (!admed.util.isArrayMember(B, A[i])) {
			return false;
		}
	} 
	for (var i in B) {
		if (!admed.util.isArrayMember(A, B[i])) {
			return false;
		}
	}
	return true;
};