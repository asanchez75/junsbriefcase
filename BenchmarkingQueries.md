# Query 1 #
```
# query 1
# Select feature short name, unique name, annotation ID, and official
# full name, given any label and where feature is D. melanogaster
# gene.

PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>    
PREFIX so: <http://purl.org/obo/owl/SO#>
PREFIX syntype: <http://purl.org/net/flybase/synonym-types/>

SELECT DISTINCT ?uniquename ?name ?accession ?fullname WHERE {

  ?feature skos:altLabel "aly" ; 
    a so:SO_0000704 ;
    chado:organism <http://openflydata.org/id/flybase/organism/Drosophila_melanogaster> ;
    chado:uniquename ?uniquename ;
    chado:name ?name ; 
    chado:feature_dbxref [ 
      chado:accession ?accession ; 
      chado:db <http://openflydata.org/id/flybase/db/FlyBase_Annotation_IDs> 
    ] .

  OPTIONAL {
    ?fs 
      chado:feature ?feature ; 
      chado:is_current "true"^^xsd:boolean ;
      chado:synonym [ 
        a syntype:FullName ;
        chado:name ?fullname ; 
      ] ;
      a chado:Feature_Synonym .
  }

}
```

```
0.367258432863
0.347984159458
0.37685516671
0.329882092173
0.29467408318
0.358848389292
0.33840892929
0.343710710862
0.284845738174
0.360638214142
=== Average time === 
0.340310591614
```


```
SELECT distinct f.uniquename, f.name, d.accession, s.name FROM feature f, organism o, feature_dbxref fd, dbxref d, db db, feature_synonym fs, synonym s
WHERE f.organism_id = o.organism_id and o.genus = 'Drosophila' and o.species = 'melanogaster' and f.name = 'aly' and 
f.feature_id = fd.feature_id and fd.dbxref_id = d.dbxref_id and d.db_id = db.db_id and db.name='FlyBase Annotation IDs'
and f.feature_id = fs.feature_id and fs.is_current and fs.synonym_id = s.synonym_id and s.type_id='60037' and f.
```

|1547|
|:---|
|1484|
|1469|
|1484|
|1484|
|1500|
|1484|
|1485|
|1516|
|1485|

Avg: 1493.8ms

# Query 2 #
```
# query 2
# select publications for a given D. melanogaster gene

PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX so: <http://purl.org/obo/owl/SO#>

SELECT * WHERE {
  
  ?feature 
    chado:uniquename "FBgn0010774"^^xsd:string ;
    a so:SO_0000704 ;
    chado:organism <http://openflydata.org/id/flybase/organism/Drosophila_melanogaster> ;
    chado:feature_pub ?pub .

  ?pub a chado:Pub ;
    chado:uniquename ?uniquename .
  
  OPTIONAL { ?pub chado:title ?title }
  OPTIONAL { ?pub chado:pyear ?pyear }
  OPTIONAL { ?pub chado:pages ?pages }
  OPTIONAL { ?pub chado:volume ?volume }
  OPTIONAL { ?pub chado:issue ?issue }
  OPTIONAL { ?pub chado:miniref ?miniref }

}
```

```
0.75153823933
0.756381159469
0.688668168917
0.670496607156
0.640806703734
0.617909842444
0.743410513494
0.721768787335
0.676506106368
0.6728101353
=== Average time === 
0.694029626355
```

```
select distinct feature.uniquename, feature_pub.feature_id, pub.pub_id, pub.title, pub.pyear, pub.pages, pub.volume, pub.issue, pub.miniref
from feature_pub, pub, feature
where feature_pub.pub_id = pub.pub_id and feature.feature_id = feature_pub.feature_id and feature.uniquename = 'FBgn0015799'
```


Avg(1594,1344,1468,1609,1469,1344,1344,1360,1343,1344) = 1421.9ms

# Query 3 #
```
# query 3
# select location data for a given D. melanogaster gene

PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX fbp: <http://purl.org/net/flybase/property-types/>   
PREFIX so: <http://purl.org/obo/owl/SO#>
 
SELECT * WHERE {
  ?feature 
    chado:uniquename "FBgn0015269"^^xsd:string ;
    a so:SO_0000704 ;
    chado:organism <http://openflydata.org/id/flybase/organism/Drosophila_melanogaster> .
    
  ?featureloc 
    chado:feature ?feature ;
    a chado:Featureloc ;
    chado:fmin ?fmin ;
    chado:fmax ?fmax ;
    chado:locgroup ?locgroup ;
    chado:strand ?strand ;
    chado:srcfeature ?srcfeature .
    
  ?srcfeature
    a chado:Feature ;
    chado:name ?srcfeature_name ;
    chado:uniquename ?srcfeature_uniquename ;
    chado:seqlen ?srcfeature_seqlen .
}
```

```
0.408615591671
0.371720376991
0.357437790083
0.427115440919
0.416945812986
0.358501214657
0.440280819997
0.347036472795
0.41975194379
0.442050711088
=== Average time === 
0.398945617498
```

```
select distinct f.feature_id, f.name, f.uniquename, f.seqlen
from feature f
where f.feature_id in (select distinct fl.srcfeature_id from feature f, featureloc fl, organism o
where f.feature_id = fl.feature_id and f.organism_id = o.organism_id and o.genus = 'Drosophila' and o.species = 'melanogaster' and f.uniquename = 'FBgn0015269')
```

```
select distinct f.feature_id, fl.fmin, fl.fmax, fl.locgroup, fl.strand from feature f, featureloc fl, organism o
where f.uniquename = 'FBgn0015269' and o.genus = 'Drosophila' and o.species = 'melanogaster' and f.organism_id = o.organism_id and f.feature_id = fl.feature_id
```

|20422+20578=41000|
|:----------------|
|19859+20250=40109|
|21312+20703=42015|
|20453+20594=41047|
|20531+20422=40953|
|20344+21032=41376|
|20562+20828=41390|
|21782+20688=42470|
|20312+20578=40890|
|20422+20953=41375|

Avg: 41262.5ms

The new query, which is more correct:
```
select distinct f.uniquename, fl.featureloc_id, fl.fmin, fl.fmax, fl.locgroup, fl.strand, f2.feature_id, f2.name, f2.uniquename, f2.seqlen,  f.feature_id
from feature f2, feature f, featureloc fl, organism o
where f.feature_id = fl.feature_id and f.organism_id = o.organism_id and o.genus = 'Drosophila' and o.species = 'melanogaster' 
and f.uniquename = 'FBgn0015269' and f2.feature_id=fl.srcfeature_id
```

|20266|
|:----|
|19969|
|20312|
|20516|
|20219|
|20750|
|20375|
|20141|
|20532|
|20703|
Avg: 20378.3ms


# Python code for the SPARQL performance evaluation #
```
import simplejson as json
import httplib
import urllib
import time

def sparql(host, port, path, query):
    params = urllib.urlencode({"query": query})
    headers = { 
        "Content-type": "application/x-www-form-urlencoded",
        "Accept": "application/sparql-results+json"}
    conn = httplib.HTTPConnection(host, port)
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

query = """
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX fbp: <http://purl.org/net/flybase/property-types/>   
PREFIX so: <http://purl.org/obo/owl/SO#>
 
SELECT * WHERE {
  ?feature 
    chado:uniquename "FBgn0015269"^^xsd:string ;
    a so:SO_0000704 ;
    chado:organism <http://openflydata.org/id/flybase/organism/Drosophila_melanogaster> .
    
  ?featureloc 
    chado:feature ?feature ;
    a chado:Featureloc ;
    chado:fmin ?fmin ;
    chado:fmax ?fmax ;
    chado:locgroup ?locgroup ;
    chado:strand ?strand ;
    chado:srcfeature ?srcfeature .
    
  ?srcfeature
    a chado:Feature ;
    chado:name ?srcfeature_name ;
    chado:uniquename ?srcfeature_uniquename ;
    chado:seqlen ?srcfeature_seqlen .
}
"""
elapse = 0
for i in range (0,10):
    start = time.clock()
    resultset = sparql("openflydata.org", 80, "/query/flybase-FB2009_02", query)

#    for binding in resultset["results"]["bindings"]:
#        feature = binding["feature"]["value"]
#        uniquename = binding["uniquename"]["value"]
#        name = binding["name"]["value"]
#        genus = binding["genus"]["value"]
#        species = binding["species"]["value"]
    elapse_per = time.clock() - start
    elapse = elapse + elapse_per
    print elapse_per

print "=== Average time === "    
print elapse/10
```