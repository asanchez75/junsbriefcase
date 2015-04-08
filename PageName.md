## returns 11
```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX so: <http://purl.org/obo/owl/SO#>

SELECT ?feature (count(distinct *) as ?count) WHERE {
  
  ?feature 
    chado:uniquename "FBgn0036925"^^xsd:string ;
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
  OPTIONAL { ?pub chado:pub_dbxref ?dbxref }
}
group by ?feature
```

### returns 11
```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX so: <http://purl.org/obo/owl/SO#>

SELECT distinct * WHERE {
  
  ?feature 
    chado:uniquename "FBgn0036925"^^xsd:string ;
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
  OPTIONAL { ?pub chado:pub_dbxref ?dbxref }
}
```

### returns 8, which is right. because multiple dbxref(s) are given for one publication
```
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX chado: <http://purl.org/net/chado/schema/>
PREFIX so: <http://purl.org/obo/owl/SO#>

SELECT count(distinct ?pub) WHERE {
  
  ?feature 
    chado:uniquename "FBgn0036925"^^xsd:string ;
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
  OPTIONAL { ?pub chado:pub_dbxref ?dbxref }
}
```