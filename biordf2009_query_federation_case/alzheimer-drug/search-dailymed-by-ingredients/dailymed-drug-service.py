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

#query = """
#PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
#select *
#from <http://purl.org/science/graph/ncbi/gene-info>
#where {
#    ?gene sc:ggp_has_symbol "F3" .
#    ?gene sc:ggp_from_species_described_by  <http://purl.org/commons/record/ncbi_taxonomy/9606> .
#}"""

queryHerbs = ["http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba"]

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

#resultset = sparql("www4.wiwiss.fu-berlin.de", "/diseasome/sparql", queryDiseasesomeForGenes)
#    
#if (len(resultset["results"]["bindings"])>0):
#    for binding in resultset["results"]["bindings"]:
#        gene = binding["gene"]["value"]
#        print gene
#        
#resultset = sparql("www4.wiwiss.fu-berlin.de", "/diseasome/sparql", queryDiseasesomeForDrugs)
#if (len(resultset["results"]["bindings"])>0):
#    for binding in resultset["results"]["bindings"]:
#        drug = binding["drug"]["value"]
#        print drug

#fp = open("ginkgo_side_effect.ttl", "wb")  

outfilename = 'ginkgo_side_effect.n3'
outfile = codecs.open(outfilename, mode='w', encoding='UTF-8')

for herb in queryHerbs:
    queryTCMForIngredients = queryTCMForIngredients_part1 + herb + queryTCMForIngredients_part2
    resultset = sparql("naxos.zoo.ox.ac.uk", "/sparql", queryTCMForIngredients)
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            ingredient = binding["ingredient"]["value"]
            dailymedIngredient = binding["dailymedIngredient"]["value"]
            
            #### query for drugs which contain a particular active ingredient from dailymed
            
            queryDailymedForDrug = queryDailymedForDrug_part1 + dailymedIngredient + queryDailymedForDrug_part2
                        
            dailymedResultset =  sparql("www4.wiwiss.fu-berlin.de", "/dailymed/sparql", queryDailymedForDrug)
            
            if (len(dailymedResultset["results"]["bindings"])>0):
                for binding in dailymedResultset["results"]["bindings"]:
#                    print "start downloading drug from dailymed "
                    drug = binding["drug"]["value"]
                    drugname = binding["drugname"]["value"]
                    print drug
                    
                    triple = "<" + herb + ">" + "\t<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/ingredient>\t" + "<" + dailymedIngredient + "> .\n"
                    outfile.write(triple)
                    outfile.flush();
                    
                    ### find the mapping sider drug
                    
                    mappingSider = mappingSider_part1 + drugname + mappingSider_part2
                    
                    print mappingSider
                    
                    mappingSiderResultset = sparql("www4.wiwiss.fu-berlin.de", "/sider/sparql", mappingSider)
                    
                    if (len(mappingSiderResultset["results"]["bindings"])>0):
                        for binding in mappingSiderResultset["results"]["bindings"]:
                            drug = binding["drug"]["value"]
                            print "found " + drug
                            triple = "<" + drug + ">" + "\t<http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/activeIngredient>\t<" + dailymedIngredient + "> ;"
                            triple += "\t<http://www.w3.org/2000/01/rdf-schema#label>\t\"" + drugname + "\" . \n"
                            outfile.write(triple)
                            outfile.flush()
                            
                            querySider = querySider_part1 + drug + querySider_part2
                            
                            #print querySider
                            
                            siderResultSet = sparql("www4.wiwiss.fu-berlin.de", "/sider/sparql", querySider)
                            
                            if (len(siderResultSet["results"]["bindings"])>0):
                                print "found "
                                print len(siderResultSet["results"]["bindings"])
                                print "effects"
                                for binding in siderResultSet["results"]["bindings"]:
                                    effect = binding["effect"]["value"]
                                    effectname = binding["effectname"]["value"]
                                    triple = "<" + drug + ">" + "\t<http://www4.wiwiss.fu-berlin.de/sider/resource/sider/sideEffect>\t<" + effect + "> ;"
                                    triple += "<" + effect + ">\t<http://www.w3.org/2000/01/rdf-schema#label>\t\"" + effectname + "\" . \n"
                                    outfile.write(triple)
                                    outfile.flush()
                    else:
                        print "no mapping for " + drug
                        triple = "<" + drug + ">" + "\t<http://www4.wiwiss.fu-berlin.de/dailymed/resource/dailymed/activeIngredient>\t<" + dailymedIngredient + "> ;"
                        triple += "\t<http://www.w3.org/2000/01/rdf-schema#label>\t\"" + drugname + "\" . \n"
                        outfile.write(triple)
                        outfile.flush()
outfile.close()    
