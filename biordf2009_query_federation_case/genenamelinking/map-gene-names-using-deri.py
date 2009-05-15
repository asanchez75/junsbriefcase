import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv

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

queryPart1 = """
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select distinct ?gene
from <http://purl.org/science/graph/ncbi/gene-info>
where {
    ?gene sc:ggp_has_symbol \""""

queryPart2 = """\" .
    ?gene sc:ggp_from_species_described_by  <http://purl.org/commons/record/ncbi_taxonomy/9606> .
}"""

infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\genenamelinking\\tcm_genes.csv'
#infilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/tcm_genes.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\genenamelinking\\unique_mapping_tcm_genes.csv'
#outfilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/unique_mapping_tcm_genes.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\n')

for row in reader:
    tcmgeneid = row[0].strip()
    
    query = queryPart1 + tcmgeneid + queryPart2

    resultset = sparql("hcls.deri.org", 80, "/sparql", query)    
    
#    print "multiple mapping gene "
    
    if (len(resultset["results"]["bindings"])==1):
        print tcmgeneid
#        outfile.write(tcmgeneid + "\t" )
        
        for binding in resultset["results"]["bindings"]:
            gene = binding["gene"]["value"]
            print gene
            gene = tcmgeneid + "\t" + gene + "\n"
            outfile.write(gene)
            outfile.flush
    
outfile.close()