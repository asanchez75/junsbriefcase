import simplejson as json
import httplib
import urllib
import time
import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

infilename = 'not_unique_mapping.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')


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

query1 = '''
SELECT DISTINCT ?ensembl
from <http://purl.org/net/data/stitch-protein-20091206>
where { ?link rdfs:label "'''

query2 = '''" ; <http://purl.org/net/open-biomed/ensembl/schema/source> "BLAST_UniProt_GN" ; <http://purl.org/net/open-biomed/ensembl/schema/ensembl> ?ensembl.}
'''


reader = csv.reader(open(infilename, "rb"), delimiter='\t')

mapping = 0

for row in reader:
    geneid, ensembl = row[0].strip(), row[1].strip()
    
    query = query1 + geneid + query2 
    #print query
    
    resultset = sparql("naxos.zoo.ox.ac.uk", "/sparql/", query)
    
    if (len(resultset["results"]["bindings"])>1):
        print "non unique mapping " + geneid
    elif (len(resultset["results"]["bindings"])==1):
        bindings = resultset["results"]["bindings"]
        binding = str(bindings[0]["ensembl"]["value"])
        
        ensembl_stitch = "9606." + binding[51:len(binding)]
        #print ensembl_stitch
        #print ensembl
        if (ensembl == ensembl_stitch):
            mapping = mapping +1
        else:
            print "unmapped " + geneid
            
print "total right mapping " + str(mapping)
