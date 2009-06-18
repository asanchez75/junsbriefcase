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
predicate_ingredient = re.compile('<http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/activeIngredient>')

IRI_ingredient = re.compile('<http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/')

ingredients = []

drugs_for_Histidine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3192"]
#drugs_for_adenosine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2017", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2675", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2846", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3888", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/4073"]
drugs_for_adenosine = ["http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/191", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3888", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/4073"]
drugs_for_Atropine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1377", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/554"]
#drugs_for_testosterone = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2417", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2893", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2894", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3383"]
drugs_for_testosterone = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2417", "http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/5408", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2894", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3383"]
drugs_for_caffeine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2120"]
drugs_for_Alcohol = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/301", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/769"]
#drugs_for_Acetic_Acid = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1002", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1206", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3319", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3773", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3910", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/880"]
drugs_for_Acetic_Acid = ["http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/175"]
drugs_for_copper = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/638"]
drugs_for_Lysine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1559"]
drugs_for_Leucine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1073", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/191", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1921", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2047", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3001", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/432"]
#drugs_for_Mannitol = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1812", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/197", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2124", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3270", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3577", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/4074"]
drugs_for_Mannitol = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1812", "http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/453", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2124", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3270", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3577", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/4074"]
drugs_for_ESTRADIOL = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1369", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1748", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1831", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1832", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2036", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2068", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2153", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2185", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/221", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/237", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2819", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/292", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3371", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/363", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/364", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3810", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3914", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3928", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/468", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/774"]
drugs_for_scopolamine = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1185"]
#drugs_for_progesterone = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2452", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/39", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/648"]
drugs_for_progesterone = ["http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/4920", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/39", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/648"]
#drugs_for_folic_acid = ["http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/1801", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/2559", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/3866", "http://www4.wiwiss.fu-berlin.de/dailymed/resource/drugs/681"]
drugs_for_folic_acid = ["http://www4.wiwiss.fu-berlin.de/sider/resource/drugs/3405"]

drugsForIngredient = {'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Histidine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/adenosine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Atropine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/testosterone': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/caffeine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Alcohol': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Acetic_Acid': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/copper': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Lysine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Leucine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Mannitol': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/ESTRADIOL': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/scopolamine': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/progesterone': [],
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/folic_acid': [],
                      }

expectedDrugsForIngredient = {'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Histidine': drugs_for_Histidine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/adenosine': drugs_for_adenosine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Atropine': drugs_for_Atropine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/testosterone': drugs_for_testosterone,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/caffeine': drugs_for_caffeine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Alcohol': drugs_for_Alcohol,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Acetic_Acid': drugs_for_Acetic_Acid,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/copper': drugs_for_copper,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Lysine': drugs_for_Lysine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Leucine': drugs_for_Leucine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/Mannitol': drugs_for_Mannitol,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/ESTRADIOL': drugs_for_ESTRADIOL,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/scopolamine': drugs_for_scopolamine,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/progesterone': drugs_for_progesterone,
                      'http://www4.wiwiss.fu-berlin.de/dailymed/resource/ingredient/folic_acid': drugs_for_folic_acid,
                      }

for row in reader:
    subject, predicate, object = row[0], row[1], row[2]
    
    matches = predicate_gene.search(predicate)
    if matches != None :
        if (not (object in ingredients)):
            ingredients.append(object)
        
    matchingDrugs = predicate_ingredient.search(predicate)
    if matchingDrugs != None :
        ingredient = object[1:-3]
        
        drugs = drugsForIngredient.get(ingredient, None)
        
        if ( not (subject in drugs) ):
            drugs.append(subject)
            drugsForIngredient[ingredient] =  drugs
            

if (len(ingredients) == 15):            
    print "Right number of ingredients"
else:
    print "Ingredients not right"
    print len(ingredients)

print "check the drugs containing an ingredient"
    
for ingredient in drugsForIngredient:
    if (len(drugsForIngredient[ingredient]) == len(expectedDrugsForIngredient[ingredient])):
        print "right number of drugs with active ingredient of " + ingredient
    else:
        print "drugs for ingredient : " + ingredient + " not right" 
        print "actual"
        print len(drugsForIngredient[ingredient])
        print "expected"
        print len(expectedDrugsForIngredient[ingredient])
        