import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/TCM_gene_disease_associations.tab'
#infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_gene_disease_associations.tab'
infilename = '../source-data/human.protein.aliases.v8.2.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.ttl'
#outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_gene_disease_associations_statistics.ttl'
outfilename = 'human-protein.ttl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

namespace = "@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .\n"
outfile.write(namespace)

proteinname = '<http://purl.org/net/open-biomed/id/ensembl/protein/'
linkname = '<http://purl.org/net/open-biomed/id/ensembl/link/'

predicate_label = '<http://www.w3.org/2000/01/rdf-schema#label>'
predicate_source = '<http://purl.org/net/open-biomed/ensembl/schema/source>'
predicate_ensembl = '<http://purl.org/net/open-biomed/ensembl/schema/ensembl>'

#reader = csv.DictReader(infile, delimiter="\t")
reader = csv.reader(open(infilename, "rb"), delimiter='\t')
#skip the first row

i = 0

for row in reader:
    #print "to see what is in a row: " + row[0] + "\n"
    triple = ""
    
    i = i + 1
    
    proteinid, alias, source = row[1].strip(), row[2].strip(), row[3].strip()
    
    
    
    
    triple += linkname + str(i) + ">\n"
    triple += "\t" + predicate_label + "\t\"" + alias + "\" ;\n"
    triple += "\t" + predicate_ensembl + "\t" + proteinname + proteinid + "> ;\n"
    
    sources = source.split(" ")
    
    for src in sources:
        triple += "\t" + predicate_source + "\t\"" + src + "\" ; \n"
    triple += ".\n"
    
    outfile.write(triple)
    outfile.flush()

infile.close()
outfile.close()
