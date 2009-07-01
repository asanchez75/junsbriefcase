import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv
import re

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
    
def sparqlWithPorts(host, port, path, query):
    params = urllib.urlencode({"query": query})
    headers = { 
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "application/sparql-results+json"}
    conn = httplib.HTTPConnection(host, port)
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
    

query = """
    PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
    PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    SELECT COUNT(DISTINCT ?gene) as ?mapped ?disgene
    from <http://www.open-biomed.org.uk/gene-mapping/1/>
    WHERE {?gene owl:sameAs ?disgene}
    """
resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", query)


queryPart1 = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        prefix owl:     <http://www.w3.org/2002/07/owl#> 
        SELECT DISTINCT ?tcmgene
        from <http://www.open-biomed.org.uk/gene-mapping/1/>
        WHERE {?tcmgene owl:sameAs <"""
        
queryPart2 = """>}
        """
count = 0
if (len(resultset["results"]["bindings"])>0):
    for binding in resultset["results"]["bindings"]:
        mapped = binding["mapped"]["value"]
        disgene = binding["disgene"]["value"]
        if (int(mapped)>1):
            count = count + 1
            #print "multiple mapping: " + disgene
            
            tcmgenes = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryPart1 + disgene + queryPart2)
            if (len(tcmgenes["results"]["bindings"])>0):
                for binding in tcmgenes["results"]["bindings"]:
                    tcmgene = binding["tcmgene"]["value"]
                    triple = tcmgene + "\t" + disgene
                    print triple
            
print count


