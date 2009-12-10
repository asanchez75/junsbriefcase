import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv
import re

def service(path):
    
    host = "stitch.embl.de"
    conn = httplib.HTTPConnection(host)
    conn.request('GET', path)
    res = conn.getresponse()
    if (res.status != 200):
        print res.status
        print res.reason
        print res.read()
        conn.close()
        return None
    else:   
        data = res.read()     
        conn.close()
        return data


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

outfilename = 'chemical-info-.ttl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

genename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/'
proteinname = '<http://purl.org/net/open-biomed/id/ensembl/protein/'
berlinprotein = '<http://www4.wiwiss.fu-berlin.de/stitch/resource/proteins/'

type_protein = '<http://purl.org/net/open-biomed/ensembl/schema/Protein>'
type_protein_interactions = '<http://purl.org/net/open-biomed/ensembl/schema/ProteinInteractions>'

predicate_owlsame = '<http://www.w3.org/2002/07/owl#sameAs>'
predicate_species = '<http://purl.org/net/open-biomed/ensembl/schema/species>'
predicate_description = '<http://www.w3.org/2000/01/rdf-schema#description>'
predicate_label = '<http://www.w3.org/2000/01/rdf-schema#label>'
predicate_symbol = '<http://purl.org/net/open-biomed/ensembl/schema/symbol>'
predicate_protein = '<http://purl.org/net/open-biomed/ensembl/schema/proteinOfPI>'

# query for all the tcm ingredients

query = '''
SELECT distinct ?ingredient
where {?s a <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Ingredient>; rdfs:label ?ingredient }
'''

resultset = sparql("www.open-biomed.org.uk", "/sparql/", query)

if (len(resultset["results"]["bindings"]) >0):
    for binding in resultset["results"]["bindings"]:
        ingredient = binding["ingredient"]["value"]
        print ingredient
        
        path = "/api/tsv-no-header/resolve?identifier=" + ingredient + "&species=9606"
        
        result = service(path)
        
        # process the result, add the tsv file to the outfile
        
        if (result):
        
            #reader = csv.reader(open(result, "rb"), delimiter='\t')
            
            
            #print result
            
            reader = result.split("\n")
            
            for row in reader:
            
                id = row.split("\t")[0].strip()
                
                if (re.match("^-1", id)):
                    print id            
                    outfile.write(ingredient+"\t"+id[3:len(id)]+"\n")
                    outfile.flush
                    outfile.flush
        else:
            print "no mapping for ingredient " + ingredient
            outfile.write(ingredient+"\n")
            outfile.flush
            outfile.flush
    
outfile.close()
