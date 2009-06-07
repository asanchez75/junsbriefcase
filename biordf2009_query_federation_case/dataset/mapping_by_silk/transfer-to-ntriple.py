import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/TCM_gene_disease_associations.tab'
infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\ingredients_tcm_dailymed.nt'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.ttl'
outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\dataset\\mapping_by_silk\\ingredients_tcm_to_dailymed.owl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

namespace = "@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .\n"
namespace = namespace + "@prefix oddlinker:     <http://data.linkedmdb.org/resource/oddlinker/> .\n"
namespace = namespace + "@prefix void:     <http://rdfs.org/ns/> .\n"
namespace = namespace + "@prefix silk:     <http://www4.wiwiss.fu-berlin.de/bizer/silk/spec/> .\n"
namespace = namespace + "@prefix dcterms:     <http://purl.org/dc/terms/> .\n"
namespace = namespace + "@prefix owl:     <http://www.w3.org/2002/07/owl#> .\n"
namespace = namespace + "@prefix rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n"
outfile.write(namespace)

reader = csv.reader(open(infilename, "rb"))

interlink = '<http://purl.org/net/tcm/id/interlink/'
linkagerun = '<http://purl.org/net/tcm/id/linkage_run/3>'
voidlinkset = '<http://purl.org/net/tcm/id/linkset/3>'

### void
triple = voidlinkset + "\t rdf:type \t void:Linkset ;\n"
triple = triple + "\t void:target \t <http://lod.openlinksw.com/sparql> ;\n"
triple = triple + "\t void:target \t <http://hcls.deri.org:8080/sparql> ;\n"
triple = triple + "\t void:linkPredicate \t owl:sameAs .\n\n"
outfile.write(triple)
outfile.flush()  

### linkage_run
triple = linkagerun + "\t oddlinker:linkage_date \t \"2009-05-27\"^^xsd:date ;\n"
triple = triple + "\t oddlinker:linkage_method \t :silk ;\n"
triple = triple + "\trdf:type\toddlinker:linkage_run .\n\n"
outfile.write(triple)
outfile.flush() 

### silk
triple = ":silk \t foaf:homepage \t <http://www4.wiwiss.fu-berlin.de/bizer/silk/> .\n\n"
outfile.write(triple)
outfile.flush()   

i = 945
for row in reader:
    triple = ""
    #print "to see what is in a row: " + row[0] + "\n"
    line = row[0]
    tvalue = line[1:line.find(':')-1]
    url1 = line[line.find(':')+2:line.find('owl:sameAs')-1]
    url2 = line[line.find('owl:sameAs')+11:len(line)-2]
    
    triple = url1 + "\t owl:sameAs \t" + url2 + " .\n"
    
    triple = triple + interlink + str(i) + ">\t oddlinker:link_source\t" + url1 + " ;\n"
    triple = triple + "\t oddlinker:link_target \t" + url2 + " ;\n"
    triple = triple + "\t silk:confidence \t\"" + tvalue + "\" ;\n"
    triple = triple + "\t oddlinker:link_type \t owl:sameAs ;\n"
    triple = triple + "\t oddlinker:linkage_run \t" + linkagerun + " ;\n"
    triple = triple + "\t dcterms:isPartOf \t" + voidlinkset + " ;\n"
    triple = triple + "\t rdf:type \t oddlinker:interlink .\n\n"
    
    i = i + 1
    
    outfile.write(triple)
    outfile.flush()

infile.close()
outfile.close()
