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

query = """
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?gene
where {
    ?gene rdf:type <http://tcm.lifescience.ntu.edu.tw/Gene> .
}
"""

#resultset = sparql("www.csw.inf.fu-berlin.de", 4039, "/sesame/repositories/tcmgene", query)
resultset = sparql("lod.openlinksw.com", 80, "/sparql", query)

outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\genenamelinking\\tcm_genes.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

for binding in resultset["results"]["bindings"]:
    gene = binding["gene"]["value"]
    print gene
    gene = gene + "\n"
    outfile.write(gene)
    outfile.flush
    
outfile.close()