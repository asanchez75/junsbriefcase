import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
import csv
import re

infilename = 'mapping_stitch_genes.csv'
infile = codecs.open(infilename, mode='r', encoding='UTF-8')

outfilename1 = 'unique_mapping.csv'
outfile1 = codecs.open(outfilename1, mode='w', encoding='UTF-8')

outfilename2 = 'not_unique_mapping.csv'
outfile2 = codecs.open(outfilename2, mode='w', encoding='UTF-8')

# read in the genes

reader = csv.reader(open(infilename, "rb"), delimiter='\t')

for row in reader:
    
    tcmgeneid = row[0].strip()
    print "analyze mapping " + tcmgeneid
    print len(row)
    if len(row) == 3:
        print "unique mapping " + tcmgeneid
        outfile1.write(tcmgeneid+"\t"+row[1].strip()+"\n")
        outfile1.flush
    elif len(row) == 4:
        prog = re.compile("^-1.")
        if (prog.match(row[2])):
            print "unique mapping " + tcmgeneid 
            outfile1.write(tcmgeneid+"\t"+row[1].strip()+"\n")
            outfile1.flush
        else:
            outfile2.write(tcmgeneid+"\t"+row[1].strip()+"\t"+row[2].strip()+"\n")
            outfile2.flush
    else:
        output = ""
        for col in row:
            output += col + "\t"
        output.rstrip()
        output += "\n"
        outfile2.write(output)
        outfile2.flush


        