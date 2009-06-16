import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import pycurl
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

#query = """
#PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
#select *
#from <http://purl.org/science/graph/ncbi/gene-info>
#where {
#    ?gene sc:ggp_has_symbol "F3" .
#    ?gene sc:ggp_from_species_described_by  <http://purl.org/commons/record/ncbi_taxonomy/9606> .
#}"""

queryTCMForIngredients = """
PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
select distinct ?ingredient
where {     
    <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba> tcm:ingredient ?ingredient .
}
"""

queryDiseasesomeForDrugs = """
PREFIX diseasesome:      <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/>
select distinct ?drug
where {     
    <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74> diseasesome:possibleDrug ?drug .
}
"""

queryDrugbankForDrugs = """
PREFIX drugbank:      <http://www4.wiwiss.fu-berlin.de/drugbank/resource/drugbank/>
construct {?drug ?p ?o}
where {     
    ?drug drugbank:possibleDiseaseTarget <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74> .
}LIMIT 100
"""

#resultset = sparql("www4.wiwiss.fu-berlin.de", "/diseasome/sparql", queryDiseasesomeForGenes)
#    
#if (len(resultset["results"]["bindings"])>0):
#    for binding in resultset["results"]["bindings"]:
#        gene = binding["gene"]["value"]
#        print gene
#        
#resultset = sparql("www4.wiwiss.fu-berlin.de", "/diseasome/sparql", queryDiseasesomeForDrugs)
#if (len(resultset["results"]["bindings"])>0):
#    for binding in resultset["results"]["bindings"]:
#        drug = binding["drug"]["value"]
#        print drug

fp = open("ginkgo_side_effect.ttl", "wb")  
        
resultset = sparql("naxos.zoo.ox.ac.uk", "/sparql", queryTCMForIngredients)
if (len(resultset["results"]["bindings"])>0):
#    c = pycurl.Curl()
    count = 0
    for binding in resultset["results"]["bindings"]:
        ingredient = binding["ingredient"]["value"]
        
        count = count + 1
        print "Start downloading " + ingredient
#        c.setopt(pycurl.URL, ingredient)
#        c.setopt(pycurl.WRITEDATA, fp)
#        c.perform()
    print "Total drugs from Drugbank "
    print count 
#    curl.close()
#    fp.close()
    sys.stdout.flush()
