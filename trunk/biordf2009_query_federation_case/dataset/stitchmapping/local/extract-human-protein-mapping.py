import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv
import re

infilename = 'protein.aliases.v8.2.txt'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename = 'human.protein.aliases.v8.2.txt'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\t')

for row in reader:
    speciesid = row[0].strip()
    if speciesid == "9606":
        output = ""
        for element in row:
            output += element + "\t"
        output.rstrip()
        output += "\n"
        outfile.write(output)
        outfile.flush
    