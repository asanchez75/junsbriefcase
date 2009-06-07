import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs

def sparql(host, port, path, query):
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

#query = """
#PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
#select *
#from <http://purl.org/science/graph/ncbi/gene-info>
#where {
#    ?gene sc:ggp_has_symbol "F3" .
#    ?gene sc:ggp_from_species_described_by  <http://purl.org/commons/record/ncbi_taxonomy/9606> .
#}"""

queryTCMPart1 = """
PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
select distinct ?gene ?medicine
where {     
    ?gene owl:sameAs <"""
    
queryTCMPart2 = """> .
    <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> tcm:gene ?gene .
    ?medicine tcm:association ?gene .
}
"""

queryPart1 = """
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select distinct ?gene
from <http://purl.org/science/graph/ncbi/gene-info>
where {
    ?gene sc:ggp_has_symbol \""""

queryPart2 = """\" .
    ?gene sc:ggp_from_species_described_by  <http://purl.org/commons/record/ncbi_taxonomy/9606> .
}"""


inputgenes = ["APOE", "CHRNB2", "GAB2", "CH25H", "SORL1", "TNF","OTC", "CST3", "ACE", "MAPT"]

for inputgene in inputgenes:
    query = queryPart1 + inputgene + queryPart2
    
    resultset = sparql("hcls.deri.org", 80, "/sparql", query)
    
    if (len(resultset["results"]["bindings"])>0):
#        print inputgene
        
        for binding in resultset["results"]["bindings"]:
            geneid = binding["gene"]["value"]
#            print geneid
            
            query = queryTCMPart1 + geneid + queryTCMPart2
            
            resultset2 = sparql("naxos.zoo.ox.ac.uk", 80, "/sparql", query)
            
            if (len(resultset2["results"]["bindings"])>0):
                print inputgene + "\t" + geneid
                for binding in resultset2["results"]["bindings"]:
                    tcmgene = binding["gene"]["value"]
                    print tcmgene
                    tcm = binding["medicine"]["value"]
                    print tcm
