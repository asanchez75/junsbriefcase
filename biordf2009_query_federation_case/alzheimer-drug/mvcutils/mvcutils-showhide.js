// create a namespace if not already defined
admed.namespace("admed.mvcutils");


/** Make an element visible.
 * @param {Element} element the element to make visible
 */
admed.mvcutils.show = function( element ) {
	YAHOO.util.Dom.removeClass(element, "invisible");
};


/** Make an element invisible.
 * @param {Element} element the element to make invisible
 */
admed.mvcutils.hide = function( element ) {
	YAHOO.util.Dom.addClass(element, "invisible");
};
