import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import re
import sys

def sparql(host, path, query):
    params = urllib.urlencode({"query": query})
    headers = { 
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "application/sparql-results+json"}
    conn = httplib.HTTPConnection(host)
    conn.request('POST', path, params, headers)
    res = conn.getresponse()
    if (res.status != 200):
        print res.status
        print res.reason
        print res.read()
        conn.close()
        return None
    else:
        resultSet = json.load(res)
        conn.close()
        return resultSet


def isDiseasomeResource (resource):
    result = re.search("diseasome", resource)
           
    return result


def isDrugbankResource (resource):
    #resource = "http://www4.wiwiss.fu-berlin.de/drugbank/resource/drugs/DB01332"
    result = re.search("drugbank", resource)
    
    return result
    
    
queryDailymed = """
PREFIX dailymed: <http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT DISTINCT ?drug ?o ?p
where {?drug rdf:type dailymed:drugs ; ?p ?o}
"""

resultset = sparql("www4.wiwiss.fu-berlin.de", "/dailymed/sparql", queryDailymed)

outfilename = 'void_dailymed.n3'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

if (len(resultset["results"]["bindings"])>0):
        diseasomePredicate = []
        drugbankPredicate = []
        for binding in resultset["results"]["bindings"]:
            drug = binding["drug"]["value"]
            predicate = binding["p"]["value"]
            o = binding["o"]["value"]
            
            print "probe drug " + drug + "\t" + o
            
            ## string match o
            if isDiseasomeResource(o):
                print "A diseasome predicate " + o
                diseasomePredicate.append(predicate)
            elif isDrugbankResource(o):
                print "A drugbank predicate " + o
                drugbankPredicate.append(predicate)
            
outfile.close();
            