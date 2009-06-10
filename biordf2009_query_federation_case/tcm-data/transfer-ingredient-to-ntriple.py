import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/TCM_gene_disease_associations.tab'
infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_ingredient_associations.tab'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.ttl'
outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_ingredient_associations_statistics.ttl'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

namespace = "@prefix xsd:     <http://www.w3.org/2001/XMLSchema#> .\n"
outfile.write(namespace)

medicinename = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/'
ingredientname = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/ingredient/'
statistics = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/statistics/'
type_statistics = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Statistics>'
type_ingredient = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Ingredient>'
type_medicine = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/Medicine>'
predicate_ingredient = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/ingredient>'
predicate_source = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/source>'
predicate_tvalue = '<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/medicine_ingredient_association_tvalue>'
rdfs_label = '<http://www.w3.org/2000/01/rdf-schema#label>'

#reader = csv.DictReader(infile, delimiter="\t")
reader = csv.reader(open(infilename, "rb"), delimiter='\t')

def replace_space (string):
    return 

i = X
for row in reader:
    #print "to see what is in a row: " + row[0] + "\n"
    triple = ""
    if i > 0:
        
        medicineid, ingredientid, tvalue = row[0].replace(" ", "_"), re.compile('(,| )').sub("_", row[1]), row[len(row)-1].strip()
        
        triple = medicinename + medicineid + ">\ta\t" + type_medicine + " ;\n"
        triple = triple + "\t" + rdfs_label + "\t\"" + row[0] + "\" ;\n"
        triple = triple + "\t" + predicate_ingredient + "\t" +  ingredientname + ingredientid + "> .\n"
        triple = triple + ingredientname + ingredientid + ">\ta\t" + type_ingredient + " ;\n"
        triple = triple + "\t" + rdfs_label + "\t\"" + row[1] + "\" .\n"
        
        # updated model for describing statistics
        triple = triple + statistic + str(i) + "\ta\t" + type_statistic + " ;\n"
        triple = triple + "\t" + predicate_source + "\t" + medicinename + medicineid + "> ;\n"
        triple = triple + "\t" + predicate_source + "\t" + ingredientname + ingredientid + "> ;\n"
        triple = triple + "\t" + predicate_tvalue + "\t\"" + tvalue + "\"^^xsd:float .\n\n"
        
        #triple = triple + medicinename + medicineid + ">\t" + t_value + "\t\"" + tvalue + "\"^^xsd:float .\n\n"
    outfile.write(triple)
    outfile.flush()
    i = i + 1
    

infile.close()
outfile.close()
