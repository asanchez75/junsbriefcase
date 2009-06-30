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


def countMappedTCMGenes():
    count = 0
    query = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT COUNT(DISTINCT ?gene) as ?count
        from <http://www.open-biomed.org.uk/gene-mapping/1/>
        WHERE {?gene owl:sameAs ?disgene}
        """
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", query)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            count = binding["count"]["value"]
    return count


def searchforDisGene(tcmgene):
    queryPart1 = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        prefix owl:     <http://www.w3.org/2002/07/owl#> 
        SELECT DISTINCT ?disgene
        from <http://www.open-biomed.org.uk/gene-mapping/1/>
        WHERE {<"""
        
    queryPart2 = """> owl:sameAs ?disgene}
        """
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryPart1+tcmgene+queryPart2)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            disgene = binding["disgene"]["value"]
    return disgene


def searchforSilkGene (tcmgene):
    queryPart1 = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        prefix owl:     <http://www.w3.org/2002/07/owl#> 
        SELECT DISTINCT ?disgene
        from <http://open-biomed.org.uk/genes_tcm_diseasome_simple/190609/>
        WHERE {?silkgene owl:sameAs <"""
        
    queryPart2 = """>}"""
    
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryPart1+tcmgene+queryPart2)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
           silkgene = binding["silkgene"]["value"]
            
    return silkgen








#### main function

outfilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\analyze_gene_mapping_to_diseasome.txt'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

count = countMappedTCMGenes()
outfile.write("the number of mapped TCM genes are: ")
outfile.write(count)
outfile.flush()








#### who are uniquely mapped, and who are not
query = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT DISTINCT ?gene count(distinct ?disgene) as ?mapped
        from <http://www.open-biomed.org.uk/gene-mapping/1/>
        WHERE {?gene owl:sameAs ?disgene}
        group by ?gene
        """
resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", query)

onegene = []
multigene = []

if (len(resultset["results"]["bindings"])>0):
    for binding in resultset["results"]["bindings"]:
        tcmgene = binding["gene"]["value"]
        mapped = binding["count"]["value"]
        if (mapped == 1):
            print "One to one mapping for gene: " + tcmgene
            onegene.append(tcmgene)
        else:
            print "One to many mapping for gene: " + tcmgene
            multigene.append(tcmgene)

outfile.write("the number of one-to-one mapping TCM genes are: ")
outfile.write(len(onegene))
outfile.flush()

outfile.write("the number of one-to-many mapping TCM genes are: ")
outfile.write(len(multigene))
outfile.flush()














#### analyze the one-to-one mapping


outfile.write("########correctly mapped disease gene######")
outfile.flush()
todofilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\todo_one_to_one_gene_mapping_to_diseasome.txt'
todofile = codecs.open(todofilename, mode='w', encoding='UTF-8')
todofile.write("#### the wrongly mismatched one-to-one mapping TCM genes are ####")
todofile.flush()

analyzed = 0
for gene in onegene:
    analyzed = analyzed + 1
    disgene = searchforDisGene(gene)
    if (re.match(disgene, silkgene)):
        triple = gene + "\towl:sameAs\t" + disgene
        outfile.write()
    else:
        todofile.write(gene + "\t" + disgene + "\t" + silkgene + "\t")
        
print "analyzed the one-to-one mapping"
print analyzed




#### analyze the one-to-many mapping