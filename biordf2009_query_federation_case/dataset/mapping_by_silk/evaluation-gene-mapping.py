import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
#import pycurl
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
    

query_Diseasome_gene_exact = """
prefix silk:     <http://www4.wiwiss.fu-berlin.de/bizer/silk/spec/>
SELECT COUNT(DISTINCT ?interlink) as exact
WHERE {?interlink silk:confidence ?value. filter (?value = 1).}
"""

resultset = sparql("www4.wiwiss.fu-berlin.de", "/drugbank/sparql", query_Diseasome_gene_exact)

if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            exact_matching = binding["exact"]["value"]
            print "Exact matching: " + exact_matching
            
query_Diseasome_gene_inexact = """
prefix silk:     <http://www4.wiwiss.fu-berlin.de/bizer/silk/spec/>
SELECT DISTINCT ?dis_gene ?tcm_gene ?value
WHERE {?interlink silk:confidence ?value. filter (?value < 1). ?interlink oddlinker:link_source ?dis_gene ; oddlinker:link_target ?tcm_gene .}
"""

resultset = sparql("www4.wiwiss.fu-berlin.de", "/drugbank/sparql", query_Diseasome_gene_inexact)

outfilename = 'gene_tcm_diseasome_inexact_1.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            dis_gene = binding["dis_gene"]["value"]
            tcm_gene = binding["tcm_gene"]["value"]
            value = binding["value"]["value"]
            trile = dis_gene + "\t" + tcm_gene + "\t" + value + "\n"
            outfile.write(triple)
            outfile.flush()
            
outfile.close();
            