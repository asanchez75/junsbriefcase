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

queryHerbs = ["ginkgo"]

queryLinkedCTForTrials_part1 = """
PREFIX linkedct: <http://data.linkedct.org/resource/linkedct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
select distinct ?trial ?title
where { ?trial linkedct:brief_title ?title . filter regex(?title, \""""

queryLinkedCTForTrials_part2 = """\", \"i\"). }
"""

for herb in queryHerbs:
    queryLinkedCTForTrials = queryLinkedCTForTrials_part1 + herb + queryLinkedCTForTrials_part2
    print queryLinkedCTForTrials
    resultset = sparql("data.linkedct.org", "/sparql", queryLinkedCTForTrials)
    
    if (len(resultset["results"]["bindings"])>0):
        for binding in resultset["results"]["bindings"]:
            title = binding["title"]["value"]
            trial = binding["trial"]["value"]
            
            print "trial :" + trial
            print "title :" + title