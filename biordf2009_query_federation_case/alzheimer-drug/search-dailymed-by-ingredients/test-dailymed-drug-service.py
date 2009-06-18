import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import re
import sys
import csv

infilename = "ginkgo_side_effect.n3"
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

reader = csv.reader(open(infilename, "rb"), delimiter='\t')


predicate_gene = re.compile('<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/ingredient>')

ingredients = []

for row in reader:
    subject, predicate, object = row[0], row[1], row[2]
    
    matches = predicate_gene.search(predicate)
    if matches != None :
        if (not (object in ingredients)):
            ingredients.append(object)
            

if (len(ingredients) == 15):            
    print "Right number of ingredients"
else:
    print "Ingredients not right"
    print len(ingredients)