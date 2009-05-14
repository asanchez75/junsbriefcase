import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs

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

def sparqlDescribe(host, path, query):
    params = urllib.urlencode({"query": query})
    headers = { 
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "application/rdf+xml"}
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
        resultSet = res.read() 
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

queryDiseasesomeForGenes = """
PREFIX diseasesome:      <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseasome/>
select distinct ?gene
where {     
    <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74> diseasesome:associatedGene ?gene .
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
select distinct ?target
where {     
    ?drug drugbank:possibleDiseaseTarget <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74> ;
        drugbank:target ?target . 
}limit 500
"""

describeByDrugbank = """
PREFIX drugbank:      <http://www4.wiwiss.fu-berlin.de/drugbank/resource/drugbank/>
describe <"""

describeByDrugbank2 = """>"""


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

outfilename = 'target.rdf'
outfile = codecs.open(outfilename, mode='w')
        
resultset = sparql("www4.wiwiss.fu-berlin.de", "/drugbank/sparql", queryDrugbankForDrugs)
if (len(resultset["results"]["bindings"])>0):
#    c = pycurl.Curl()
    count = 0
    for binding in resultset["results"]["bindings"]:
        #drug = binding["drug"]["value"]
        target = binding["target"]["value"]
        count = count + 1
        #print "Start downloading " + drug
        print "Start downloading " + target
        #query = describeByDrugbank + drug + describeByDrugbank2
        query = describeByDrugbank + target + describeByDrugbank2
        #print query
        resultset = sparqlDescribe("www4.wiwiss.fu-berlin.de", "/drugbank/sparql", query)
        #print resultset
        outfile.write(resultset)
        outfile.flush()
    print "Total drugs from Drugbank "
    print count  

outfile.close()