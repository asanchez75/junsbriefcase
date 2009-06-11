/**
 * @fileoverview
 * This script defines map utilities.
 * @author <a href="http://freecode-freecode.blogspot.com/2007/06/hashmap-object-in-javascript-like.html">External Open Source</a>
 * TODO license terms
 */
 
// create a namespace if not already defined
admed.namespace("admed.maputil");

admed.maputil.MapUtils = function() {
    // members
    this.keyArray = new Array(); // Keys
    this.valArray = new Array(); // Values
        
    // methods
//    this.put = put;
//    this.get = get;
//    this.size = size;  
//    this.clear = clear;
//    this.keySet = keySet;
//    this.valSet = valSet;
//    this.showMe = showMe;   // returns a string with all keys and values in map.
//    this.findIt = findIt;
//    this.remove = remove;

	this.put = function ( key, val )
	{
	    var elementIndex = this.findIt( key );
	    
	    if( elementIndex == (-1) )
	    {
	        this.keyArray.push( key );
	        this.valArray.push( val );
	    }
	    else
	    {
	        this.valArray[ elementIndex ] = val;
	    }
	};

	this.get = function ( key )
	{
	    var result = null;
	    var elementIndex = this.findIt( key );
	
	    if( elementIndex != (-1) )
	    {   
	        result = this.valArray[ elementIndex ];
	    }  
	    
	    return result;
	};

	this.remove = function ( key )
	{
	    var result = null;
	    var elementIndex = this.findIt( key );
	
	    if( elementIndex != (-1) )
	    {
	        this.keyArray = this.keyArray.removeAt(elementIndex);
	        this.valArray = this.valArray.removeAt(elementIndex);
	    }  
	    
	    return ;
	};

	this.size = function ()
	{
	    return (this.keyArray.length);  
	};

	this.clear = function ()
	{
	    for( var i = 0; i < this.keyArray.length; i++ )
	    {
	        this.keyArray.pop(); this.valArray.pop();   
	    }
	};

	this.keySet = function ()
	{
	    return (this.keyArray);
	};

	this.valSet = function ()
	{
	    return (this.valArray);   
	}

	this.showMe = function ()
	{
	    var result = "";
	    
	    for( var i = 0; i < this.keyArray.length; i++ )
	    {
	        result += "Key: " + this.keyArray[ i ] + "\tValues: " + this.valArray[ i ] + "\n";
	    }
	    return result;
	}

	this.findIt = function ( key )
	{
	    var result = (-1);
	
	    for( var i = 0; i < this.keyArray.length; i++ )
	    {
	        if( this.keyArray[ i ] == key )
	        {
	            result = i;
	            break;
	        }
	    }
	    return result;
	}

//	this.removeAt( index )
//	{
//	  var part1 = this.slice( 0, index);
//	  var part2 = this.slice( index+1 );
//	
//	  return( part1.concat( part2 ) );
//	}
//	Array.prototype.removeAt = removeAt;
}