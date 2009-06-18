import simplejson as json
import httplib
import urllib
import time
import StringIO
import sys
import codecs
#import pycurl
import sys

def sparql(host, path, query):
    params = urllib.urlencode({"query": query})
    headers = { 
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "application/sparql-results+json"}
    conn = httplib.HTTPConnection(host)
    conn.request('POST', path, params, headers)
    res = conn.getresponse()
    if (res.status != 200):
        print res.status
        print res.reason
        print res.read()
        conn.close()
        return None
    else:
        resultSet = json.load(res)
        conn.close()
        return resultSet

queryHerbs = ["http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba", 
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum",
              "http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera"
              ]

queryTCMForIngredients_part1 = """
PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
select distinct ?ingredient ?dailymedIngredient
where { <"""

queryTCMForIngredients_part2 = """> tcm:ingredient ?ingredient . ?dailymedIngredient owl:sameAs ?ingredient .
}
"""

queryDailymedForDrug_part1 = """
PREFIX dailymed:      <http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select distinct ?drug ?drugname
where {     
    ?drug dailymed:activeIngredient <"""
    
queryDailymedForDrug_part2 = """> ; dailymed:name ?drugname ; dailymed:representedOrganization ?organization . 
} limit 100
"""

querySider_part1 = """
PREFIX sider:      <http://www4.wiwiss.fu-berlin.de/sider/resource/sider/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select distinct ?effect ?effectname
where {     
    <"""

querySider_part2 = """> sider:sideEffect ?effect . ?effect rdfs:label ?effectname . }LIMIT 100 """

mappingSider_part1 = """
PREFIX sider:      <http://www4.wiwiss.fu-berlin.de/sider/resource/sider/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
select distinct ?drug 
where {     
    ?drug rdfs:label ?drugname . filter regex(?drugname, "^"""

mappingSider_part2 = """\", "i"). }LIMIT 100""" 

outfilename = 'ginkgo_side_effect_batch.n3'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

for herb in queryHerbs:
    queryTCMForIngredients = queryTCMForIngredients_part1 + herb + queryTCMForIngredients_part2
    resultset = sparql("naxos.zoo.ox.ac.uk", "/sparql", queryTCMForIngredients)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            ingredient = binding["ingredient"]["value"]
            dailymedIngredient = binding["dailymedIngredient"]["value"]
            
            #### find dailymed drugs
            
            queryDailymedForDrug = queryDailymedForDrug_part1 + dailymedIngredient + queryDailymedForDrug_part2
                        
            dailymedResultset =  sparql("www4.wiwiss.fu-berlin.de", "/dailymed/sparql", queryDailymedForDrug)
            
            mappedDrug = []
            siderDrug = []
            drugnames = {}
            
            if (len(dailymedResultset["results"]["bindings"])>0):
                triple = "<" + herb + ">" + "\t<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/ingredient>\t" + "<" + dailymedIngredient + "> .\n"
                outfile.write(triple)
                outfile.flush()
                    
                for binding in dailymedResultset["results"]["bindings"]:
#                    print "start downloading drug from dailymed "
                    drug = binding["drug"]["value"]
                    drugname = binding["drugname"]["value"]
                    print drug
                    
                    ### find the mapping sider drug
                    
                    mappingSider = mappingSider_part1 + drugname + mappingSider_part2
                    print mappingSider
                    mappingSiderResultset = sparql("www4.wiwiss.fu-berlin.de", "/sider/sparql", mappingSider)
                    
                    if (len(mappingSiderResultset["results"]["bindings"])>0):
                        for binding in mappingSiderResultset["results"]["bindings"]:
                            drug = binding["drug"]["value"]
                            print "found " + drug
                            if (drug in mappedDrug):
                                print "do nothing"
                            else:
                                print "add a new drug to the array"
                                mappedDrug.append(drug)
                                drugnames[drug] = drugname
                            if (drug in siderDrug):
                                print "do nothing"
                            else:
                                print "add a new drug to the array"
                                siderDrug.append(drug)
                            
                            
                    else:
                        if (drug in mappedDrug):
                            print "do nothing"
                        else:
                            print "add a new drug to the array"
                            mappedDrug.append(drug)
                            drugnames[drug] = drugname
                        print "no mapping for " + drug
                
                ## write the drug to triples
                for drug in mappedDrug:        
                    triple = "<" + drug + ">" + "\t<http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/activeIngredient>\t<" + dailymedIngredient + "> .\n"
                    triple += "<" + drug + ">" + "\t<http://www.w3.org/2000/01/rdf-schema#label>\t\"" + drugnames[drug] + "\" . \n"
                    outfile.write(triple)
                    outfile.flush()
                    
                ## find side-effects
                
                for siderdrug in siderDrug:                                
                    querySider = querySider_part1 + siderdrug + querySider_part2           
                    print querySider            
                    siderResultSet = sparql("www4.wiwiss.fu-berlin.de", "/sider/sparql", querySider)#            
                    if (len(siderResultSet["results"]["bindings"])>0):
                        print "found "
                        print len(siderResultSet["results"]["bindings"])
                        print "effects"
                        for binding in siderResultSet["results"]["bindings"]:
                            effect = binding["effect"]["value"]
                            effectname = binding["effectname"]["value"]
                            triple = "<" + siderdrug + ">" + "\t<http://www4.wiwiss.fu-berlin.de/sider/resource/sider/sideEffect>\t<" + effect + "> .\n"
                            triple += "<" + effect + ">\t<http://www.w3.org/2000/01/rdf-schema#label>\t\"" + effectname + "\" . \n"
                            outfile.write(triple)
                            outfile.flush()
outfile.close()    
