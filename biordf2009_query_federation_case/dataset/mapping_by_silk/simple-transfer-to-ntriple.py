import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/TCM_gene_disease_associations.tab'
infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\genes_tcm_drugbank.nt'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.ttl'
outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\genes_tcm_drugbank_simple.owl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

reader = csv.reader(open(infilename, "rb"))

for row in reader:
    triple = ""
    #print "to see what is in a row: " + row[0] + "\n"
    line = row[0]
    tvalue = line[1:line.find(':')-1]
    url1 = line[line.find(':')+2:line.find('owl:sameAs')-1]
    url2 = line[line.find('owl:sameAs')+11:len(line)-2]
    
    triple = url1 + "\t <http://www.w3.org/2002/07/owl#sameAs> \t" + url2 + " .\n"
    
    outfile.write(triple)
    outfile.flush()

infile.close()
outfile.close()
