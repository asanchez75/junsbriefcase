import re
import StringIO
import codecs
import csv
import sys
import optparse
import logging

# TODO set this to file path
#infilename = '/root/workspace/biordf2009_query_federation_case/TCM_gene_disease_associations.tab'
infilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_gene_disease_associations.tab'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

#outfilename = '/root/workspace/biordf2009_query_federation_case/tcm-data/TCM_gene_disease_associations.nt'
outfilename = '\\oxford\\svn\\biordf2009_query_federation_case\\tcm-data\\TCM_gene_disease_associations.nt'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

ingredientname = '<http://tcm.lifescience.ntu.edu.tw/id/ingredient/'
genename = '<http://tcm.lifescience.ntu.edu.tw/id/gene/'
diseasename = '<http://tcm.lifescience.ntu.edu.tw/id/disease/'
type_disease = '<http://tcm.lifescience.ntu.edu.tw/Disease>'
type_ingredient = '<http://tcm.lifescience.ntu.edu.tw/Ingredient>'
type_gene = '<http://tcm.lifescience.ntu.edu.tw/Gene>'
predicate_ingredient = '<http://tcm.lifescience.ntu.edu.tw/ingredient>'
predicate_gene = '<http://tcm.lifescience.ntu.edu.tw/gene>'
rdfs_label = '<http://www.w3.org/2000/01/rdf-schema#label>'


#reader = csv.DictReader(infile, delimiter="\t")
reader = csv.reader(open(infilename, "rb"))

def replace_space (string):
    return 

i = 0
for row in reader:
    #print "to see what is in a row: " + row[0] + "\n"
    triple = ""
    if i > 0:
        splits = row[0].split("\t")
        #print "to see what is the first column in a row: " + splits[0] + "\n"
        ingredientid, geneid, diseaseid = splits[0].replace(" ", "_"), splits[1].replace(" ", "_"), splits[2].replace(" ", "_")
        
        triple = diseasename + diseaseid + ">\ta\t" + type_disease + " ;\n"
        triple = triple + "\t" + rdfs_label + "\t\"" + splits[2] + "\";\n"
        triple = triple + "\t" + predicate_ingredient + "\t" +  ingredientname + ingredientid + "> ;\n"
        triple = triple + "\t" + predicate_gene + "\t" +  genename + geneid + "> .\n"
        triple = triple + ingredientname + ingredientid + ">\ta\t" + type_ingredient + " ;\n"
        triple = triple + "\t" + rdfs_label + "\t\"" + splits[0] + "\" .\n"
        triple = triple + genename + geneid + ">\ta\t" + type_gene + " ;\n"
        triple = triple + "\t" + rdfs_label + "\t\"" + splits[1] + "\" .\n\n"
    outfile.write(triple)
    outfile.flush()
    i = i + 1
    

infile.close()
outfile.close()
