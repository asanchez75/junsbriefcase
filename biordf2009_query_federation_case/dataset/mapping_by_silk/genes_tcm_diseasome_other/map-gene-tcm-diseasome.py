import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv

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
    

infilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\genenamelinking\\tcm_genes_part2.csv'
#infilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/tcm_genes.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')
reader = csv.reader(open(infilename, "rb"), delimiter='\n')


outfilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\mapping_diseasome_genes_part3.ttl'
#outfilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/unique_mapping_tcm_genes.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')


queryTcmPart1 = """
PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
prefix owl:     <http://www.w3.org/2002/07/owl#> 
select distinct ?gene
from <http://purl.org/net/data/tcm/tcm-20090619>
where {<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/"""

queryTcmPart2 = """> owl:sameAs ?gene}"""

queryPart1 = """
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select distinct ?name
from <http://purl.org/science/graph/ncbi/gene-info>
where {<"""

queryPart2= """> sc:ggp_has_symbol ?name}"""

queryDiseasomePart1 = """
PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#>
Select distinct ?gene
where {?gene rdfs:label ?label . filter regex(?label, \"^"""

queryDiseasomePart2 = """$\", \"i\")} limit 10"""
count = 0

for row in reader:
    tcmgeneid = row[0].strip()
    print tcmgeneid
    #print queryTcmPart1+tcmgeneid+queryTcmPart2
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryTcmPart1+tcmgeneid+queryTcmPart2)
     
    
    #    print "multiple mapping gene "
        
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:            
            gene = binding["gene"]["value"]
            print gene
            count = count + 1        
            print "mapped"
            print count
            print "genes"
            
            queryDeri = queryPart1 + gene + queryPart2
        
            #        print queryDeri
        
            deriSymobls = sparql("hcls.deri.org", "/sparql", queryDeri)
        
            if (len(deriSymobls["results"]["bindings"])>0):
                for binding in deriSymobls["results"]["bindings"]:
                    name =  binding["name"]["value"]
                    print name
                    
                    queryDiseasome = queryDiseasomePart1 + name + queryDiseasomePart2
                    #                print queryDiseasome
                
                    mappingGene = sparql("www4.wiwiss.fu-berlin.de", "/diseasome/sparql", queryDiseasome)
                    
                    if (len(mappingGene["results"]["bindings"])>0):
                        for binding in mappingGene["results"]["bindings"]:
                            disgene =  binding["gene"]["value"]
                            print "has a mapping gene " + disgene
                            triple = "<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/"+tcmgeneid + ">\t<http://www.w3.org/2002/07/owl#sameAs>\t<" + disgene + "> .\n"       
                            outfile.write(triple)
                            outfile.flush
    
outfile.close()