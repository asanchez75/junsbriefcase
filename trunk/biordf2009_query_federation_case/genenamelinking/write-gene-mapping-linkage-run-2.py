import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv

infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\genenamelinking\\results_using_deri\\manually_corrected_multi_mapping_tcm_genes.csv'
#infilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/tcm_genes.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\genenamelinking\\results_using_deri\\gene-name-mapping-linkage-run-manual.ttl'
#outfilename = '/root/workspace/biordf2009_query_federation_case/genenamelinking/unique_mapping_tcm_genes.csv'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

namespace = "@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .\n"
namespace = namespace + "@prefix oddlinker:     <http://data.linkedmdb.org/resource/oddlinker/> .\n"
namespace = namespace + "@prefix void:     <http://rdfs.org/ns/> .\n"
namespace = namespace + "@prefix dcterms:     <http://purl.org/dc/terms/> .\n"
namespace = namespace + "@prefix owl:     <http://www.w3.org/2002/07/owl#> .\n"
namespace = namespace + "@prefix rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
outfile.write(namespace)

genename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/'
interlink = '<http://purl.org/net/tcm/id/interlink/'
linkagerun = '<http://purl.org/net/tcm/id/linkage_run/2>'
voidlinkset = '<http://purl.org/net/tcm/id/linkset/2>'

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\t')

### void
triple = voidlinkset + "\t rdf:type \t void:Linkset ;\n"
triple = triple + "\t void:target \t <http://lod.openlinksw.com/sparql> ;\n"
triple = triple + "\t void:target \t <http://hcls.deri.org:8080/sparql> ;\n"
triple = triple + "\t void:linkPredicate \t owl:sameAs .\n\n"
outfile.write(triple)
outfile.flush()   

### linkage_run
triple = linkagerun + "\t oddlinker:linkage_date \t \"2009-04-28\"^^xsd:date ;\n"
triple = triple + "\t oddlinker:linkage_method \t \"Manual\" ;\n"
triple = triple + "\trdf:type\toddlinker:linkage_run .\n\n"
outfile.write(triple)
outfile.flush()   

### interlinking
i = 1
for row in reader:
    triple = ""
    
    tcmgenename, entrezgeneid = row[0].replace(" ", "_"), row[1]
    
    triple = genename + tcmgenename + ">\t owl:sameAs \t<" + entrezgeneid + "> .\n"
    triple = triple + interlink + str(i) + ">\t oddlinker:link_source\t" + genename + tcmgenename + "> ;\n"
    triple = triple + "\t oddlinker:link_target \t<" + entrezgeneid + "> ;\n"
    triple = triple + "\t oddlinker:link_type \t owl:sameAs ;\n"
    triple = triple + "\t oddlinker:linkage_run \t" + linkagerun + ";\n"
    triple = triple + "\t dcterms:isPartOf \t" + voidlinkset + ";\n"
    triple = triple + "\t rdf:type \t oddlinker:interlink .\n\n"
    outfile.write(triple)
    outfile.flush()
    i = i + 1
    
outfile.close()