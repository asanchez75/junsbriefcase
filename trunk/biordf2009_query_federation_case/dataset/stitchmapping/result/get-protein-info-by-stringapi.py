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


infilename = '../test/not_unique_mapping.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename = 'protein-info-2.ttl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

genename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/'
proteinname = '<http://purl.org/net/open-biomed/id/ensembl/protein/'
berlinprotein = '<http://www4.wiwiss.fu-berlin.de/stitch/resource/proteins/'

type_protein = '<http://purl.org/net/open-biomed/ensembl/schema/Protein>'

predicate_owlsame = '<http://www.w3.org/2002/07/owl#sameAs>'
predicate_species = '<http://purl.org/net/open-biomed/ensembl/schema/species>'
predicate_description = '<http://www.w3.org/2000/01/rdf-schema#description>'
predicate_label = '<http://www.w3.org/2000/01/rdf-schema#label>'
predicate_symbol = '<http://purl.org/net/open-biomed/ensembl/schema/symbol>'

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\t')

for row in reader:
    tcmgeneid = row[0].strip()
    ensemblproteinid = row[1].strip()
    
    # fire off a web service request
    
    path = "/api/tsv-no-header/resolve?identifier=" + ensemblproteinid + "&species=9606"
    
    result = service(path)
    
    # process the result, add the tsv file to the outfile
    if (result):
        
        output = genename + tcmgeneid.strip() + ">\t" + predicate_owlsame + "\t" + proteinname + ensemblproteinid + "> .\n"
        
        output = proteinname + ensemblproteinid + ">\t" + predicate_owlsame + "\t" + berlinprotein + ensemblproteinid[5:len(ensemblproteinid)] + "> .\n"
        
        read_result = result.split("\t")
        
        output += proteinname + ensemblproteinid + ">\t a \t" + type_protein + " ; \n"
        
        output += "\t " + predicate_species + "\t \"" + read_result[2].strip() + "\" ; \n"
        
        output += "\t " + predicate_symbol + "\t \"" + read_result[3].strip() + "\" ; \n"
        
        output += "\t " + predicate_label + "\t \"" + read_result[3].strip() + "\" ; \n"
        
        output += "\t " + predicate_description + "\t \"" + read_result[4].strip() + "\" .\n"
            
        outfile.write(output+"\n")
        outfile.flush
        outfile.flush
    else:
        print "no mapping for gene " + emsemblproteinid
    
outfile.close()
