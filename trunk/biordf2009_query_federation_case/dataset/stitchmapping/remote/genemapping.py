import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv

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


infilename = 'tcm_genes.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename = 'mapping_stitch_genes.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\n')

for row in reader:
    tcmgeneid = row[0].strip()
    
    # fire off a web service request
    
    path = "/api/tsv-no-header/resolve?identifier=" + tcmgeneid + "&species=9606&format=only-ids"
    
    result = service(path)
    
    # process the result, add the tsv file to the outfile
    if (result):
        print result
        output = ""
        
        read_result = result.split("\n")
        
        output = tcmgeneid
        
        for mapping in read_result:
            output += "\t" + mapping
        
        outfile.write(output+"\n")
        outfile.flush
    
outfile.close()