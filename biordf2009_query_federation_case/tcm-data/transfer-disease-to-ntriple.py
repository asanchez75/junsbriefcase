import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/rawdata/TCM_disease_associations.tab'
#infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_disease_associations.tab'
infilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\tcm-data\\rawdata\\TCM_disease_associations.tab'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.ttl'
#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_disease_associations_statistics.ttl'
#outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_disease_associations_statistics.ttl'
outfilename = '\\workspaces\\zhaoj\\biordf2009_query_federation_case\\tcm-data\\TCM_disease_associations_statistics.ttl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

namespace = "@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .\n"
outfile.write(namespace)

medicinename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/'
diseasename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/'
statistics = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/statistics/'
type_statistics = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Statistics>'
type_disease = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Disease>'
type_medicine = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Medicine>'
predicate_treatment = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/treatment>'
predicate_source = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/source>'
predicate_tvalue = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/medicine_disease_tvalue>'
rdfs_label = '<http://www.w3.org/2000/01/rdf-schema#label>'

#reader = csv.DictReader(infile, delimiter="\t")
reader = csv.reader(open(infilename, "rb"), delimiter='\t')
#skip the first row
reader.next();

i = 1
for row in reader:
    #print "to see what is in a row: " + row[0] + "\n"
    triple = ""
    #print "to see what is the first column in a row: " + splits[0] + "\n"
    medicineid, diseaseid, tvalue = row[0].replace(" ", "_"), re.compile('(, | )').sub("_", row[1]), row[len(row)-1].strip()
    triple = medicinename + medicineid + ">\ta\t" + type_medicine + " ;\n"
    triple = triple + "\t" + rdfs_label + "\t\"" + row[0] + "\";\n"
    triple = triple + "\t" + predicate_treatment + "\t" +  diseasename + diseaseid + "> .\n"
    triple = triple + diseasename + diseaseid + ">\ta\t" + type_disease + " ;\n"
    triple = triple + "\t" + rdfs_label + "\t\"" + row[1] + "\" .\n"
    
    # updated model for describing statistics
    triple = triple + statistics + str(i) + ">\ta\t" + type_statistics + " ;\n"
    triple = triple + "\t" + predicate_source + "\t" + medicinename + medicineid + "> ;\n"
    triple = triple + "\t" + predicate_source + "\t" + diseasename + diseaseid + "> ;\n"
    triple = triple + "\t" + predicate_tvalue + "\t\"" + tvalue + "\"^^xsd:float .\n\n"
    
    #triple = triple + medicinename + medicineid + ">\t" + t_value + "\t\"" + tvalue + "\"^^xsd:float .\n\n"
    outfile.write(triple)
    outfile.flush()
    i = i + 1
    

infile.close()
outfile.close()
