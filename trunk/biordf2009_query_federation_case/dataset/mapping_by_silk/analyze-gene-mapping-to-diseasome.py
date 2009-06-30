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


def searchforDisGenes(tcmgene):
    queryPart1 = """
        PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
        prefix owl:     <http://www.w3.org/2002/07/owl#> 
        SELECT DISTINCT ?disgene
        from <http://www.open-biomed.org.uk/gene-mapping/1/>
        WHERE {<"""
        
    queryPart2 = """> owl:sameAs ?disgene}
        """
        
    disgenes = []
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryPart1+tcmgene+queryPart2)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            disgene = binding["disgene"]["value"]
            disgenes.append(disgene)
    return disgenes


def searchforDisGene (tcmgene):
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
        SELECT DISTINCT ?silkgene
        from <http://open-biomed.org.uk/genes_tcm_diseasome_simple/190609/>
        WHERE {?silkgene owl:sameAs <"""
        
    queryPart2 = """>}"""
    
    silkgene = ""
    
    resultset = sparqlWithPorts("rodos.zoo.ox.ac.uk", 8890, "/sparql", queryPart1+tcmgene+queryPart2)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
           silkgene = binding["silkgene"]["value"]
            
    return silkgene








#### main function

outfilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\analyze_gene_mapping_to_diseasome.txt'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

count = countMappedTCMGenes()
outfile.write("the number of mapped TCM genes are: ")
outfile.write(count)
outfile.write("\n")
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

silkgene1 = []

if (len(resultset["results"]["bindings"])>0):
    for binding in resultset["results"]["bindings"]:
        tcmgene = binding["gene"]["value"]
        mapped = binding["mapped"]["value"]
        print mapped
        if (re.match("1", mapped)):
            print "One to one mapping for gene: " + tcmgene
            onegene.append(tcmgene)            
        else:
            print "One to many mapping for gene: " + tcmgene
            multigene.append(tcmgene)

outfile.write("the number of one-to-one mapping TCM genes are: ")
outfile.write(str(len(onegene)))
outfile.write("\n")
outfile.flush()

outfile.write("the number of one-to-many mapping TCM genes are: ")
outfile.write(str(len(multigene)))
outfile.write("\n")
outfile.flush()














#### analyze the one-to-one mapping


outfile.write("########correctly mapped disease gene######\n")
outfile.flush()
todofilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\todo_one_to_one_gene_mapping_to_diseasome.txt'
todofile = codecs.open(todofilename, mode='w', encoding='UTF-8')
todofile.write("#### the wrongly mismatched one-to-one mapping TCM genes are ####\n")
todofile.flush()

analyzed = 0
for gene in onegene:
    analyzed = analyzed + 1
    disgene = searchforDisGene(gene)
    silkgene = searchforSilkGene (gene)
    if (re.match(disgene, silkgene)):
        triple = gene + "\towl:sameAs\t" + disgene + "\n"
        silkgene1.append(silkgene)
        outfile.write(triple)
        outfile.flush()
    else:
        todofile.write(gene + "\t" + disgene + "\t" + silkgene + "\n")
        todofile.flush()
        
todofile.close()
outfile.close()        
print "analyzed the one-to-one mapping"
print analyzed




#### analyze the one-to-many mapping
manyfilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\one_to_many_gene_mapping_to_diseasome.txt'
manyfile = codecs.open(manyfilename, mode='w', encoding='UTF-8')
manyfile.write("TCMGene\tDiseasomeGene Manually\tDiseasomeGenebySilk\n")
manyfile.flush()

silkgene2 = []

for gene in multigene:
    disgenes = searchforDisGenes(gene)    
    silkgene = searchforSilkGene(gene)
    for disgene in disgenes:
        triple = gene + "\t" + disgene + "\t" + silkgene + "\n"
        manyfile.write(triple)
        manyfile.flush()
        
        

manyfile.write("#### Genes with no mapping by Silk for the one-to-many mapping TCM genes ####\n")
analyzed = 0
notmapped = 0
mappingsBySilk = {}
hasMappingBySilk = False
for gene in multigene:
    analyzed = analyzed + 1
    disgenes = searchforDisGenes(gene)
    
    silkgene = searchforSilkGene(gene)
    for disgene in disgenes:
        if (re.match(disgene, silkgene)):
            hasMappingBySilk = True
            mappingsBySilk[gene] = silkgene
            silkgene2.append(silkgene)
            
    if (not hasMappingBySilk):
        notmapped = notmapped + 1
        manyfile.write(gene)
        manyfile.flush()

manyfile.write("Not mapped genes " + str(notmapped) + "genes\n")
manyfile.flush()            

manyfile.write("#### Genes with at least one mapping by Silk for the one-to-many mapping TCM genes ####\n")
for gene in mappingsBySilk:
    triple = gene + "\t" + mappingsBySilk[gene] + "\n"
    manyfile.write(triple)
    manyfile.flush()
    
manyfile.write("Analyzed " + str(analyzed) + "genes\n")
manyfile.flush()
    
manyfile.close()    



### find the two overlapping silk genes
for gene1 in silkgene1:
    for gene2 in silkgene2:
        if (re.match(gene1, gene2)):
            print "the overlapping gene" + gene1
            break 
