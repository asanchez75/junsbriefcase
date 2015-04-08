# Load RDF into SDB 1.1 #
```
 $ export SDBROOT=/usr/local/sdb11/
 $ export PATH=$SDBROOT/bin:$PATH
 $ export SDB_USER=flyweb
 $ export SDB_PASSWORD=obah10gu
 $ export SDB_JDBC=/var/lib/apache-tomcat-5.5.26/webapps/joseki3-1/WEB-INF/lib/postgresql-8.3-603.jdbc3.jar
```

Create the postgres database
```
 su postgres
 createdb -O flyweb -E utf8 bdgp-YYYYMMDD-sdb-hash
 exit
```

Make SDB configurations for each database
```
 vi /etc/sdb11/sdb-pgsql-hash-bdgp-YYYYMMDD.ttl
```

```
 @prefix sdb:     <http://jena.hpl.hp.com/2007/sdb#> .
 @prefix rdfs:    <http://www.w3.org/2000/01/rdf-schema#> .
 @prefix rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
 @prefix ja:      <http://jena.hpl.hp.com/2005/11/Assembler#> .

 <#store> rdf:type sdb:Store ;
    sdb:layout         "layout2/hash" ;
    sdb:connection     <#conn> ;
 .
 <#conn> rdf:type sdb:SDBConnection ;
    sdb:sdbType        "postgresql" ;
    sdb:sdbHost        "localhost" ;
    sdb:sdbName        "bdgp-YYYYMMDD-sdb-hash" ;
    sdb:driver         "org.postgresql.Driver" ;
    .
```

Format each of the SDB databases.
```
 $ sdbconfig --time --verbose --sdb=/etc/sdb11/sdb-pgsql-hash-bdgp-YYYYMMDD.ttl --format
 Operation: format: Time 2.254 seconds
```

Load data:
```
 sdbload --time --verbose --sdb=/etc/sdb11/sdb-pgsql-hash-bdgp-YYYYMMDD.ttl /tmp/file.nt
```

```
Add: 20,000 triples  (Batch: 1943 / Run: 1943)   [M:30,072,832/F:5,190,248]
Add: 40,000 triples  (Batch: 2626 / Run: 2233)   [M:30,072,832/F:20,614,608]
Add: 60,000 triples  (Batch: 1561 / Run: 1953)   [M:30,072,832/F:21,635,448]
Add: 80,000 triples  (Batch: 1326 / Run: 1746)   [M:29,958,144/F:20,666,832]
Add: 100,000 triples  (Batch: 1701 / Run: 1737)   [M:29,958,144/F:3,315,064]
Add: 120,000 triples  (Batch: 1020 / Run: 1555)   [M:30,089,216/F:6,384,560]
Add: 140,000 triples  (Batch: 1752 / Run: 1581)   [M:30,089,216/F:12,113,608]
Add: 160,000 triples  (Batch: 1204 / Run: 1521)   [M:30,089,216/F:9,914,712]
Add: 180,000 triples  (Batch: 1289 / Run: 1491)   [M:30,089,216/F:11,140,576]
Add: 200,000 triples  (Batch: 1183 / Run: 1453)   [M:30,089,216/F:9,750,256]
  Elapsed: 137.6 seconds
Add: 220,000 triples  (Batch: 881 / Run: 1372)   [M:30,089,216/F:12,189,376]
Add: 240,000 triples  (Batch: 1039 / Run: 1337)   [M:30,089,216/F:10,364,216]
Add: 260,000 triples  (Batch: 966 / Run: 1298)   [M:30,089,216/F:10,269,928]
Add: 280,000 triples  (Batch: 982 / Run: 1269)   [M:30,089,216/F:9,861,536]
Add: 300,000 triples  (Batch: 815 / Run: 1224)   [M:30,089,216/F:12,556,336]
Add: 320,000 triples  (Batch: 750 / Run: 1177)   [M:30,089,216/F:10,627,680]
Add: 340,000 triples  (Batch: 792 / Run: 1145)   [M:30,089,216/F:9,465,144]
Add: 360,000 triples  (Batch: 640 / Run: 1096)   [M:30,089,216/F:4,403,608]
Add: 380,000 triples  (Batch: 673 / Run: 1061)   [M:50,302,976/F:15,064,008]
Add: 400,000 triples  (Batch: 725 / Run: 1037)   [M:50,302,976/F:20,513,208]
  Elapsed: 385.4 seconds
Add: 420,000 triples  (Batch: 599 / Run: 1002)   [M:50,302,976/F:21,744,384]
Add: 440,000 triples  (Batch: 556 / Run: 967)   [M:50,302,976/F:19,527,976]
Add: 460,000 triples  (Batch: 571 / Run: 939)   [M:50,302,976/F:24,941,184]
Add: 480,000 triples  (Batch: 592 / Run: 916)   [M:50,302,976/F:23,079,576]
Add: 500,000 triples  (Batch: 507 / Run: 888)   [M:50,302,976/F:26,270,520]
Add: 520,000 triples  (Batch: 503 / Run: 862)   [M:50,302,976/F:21,549,480]
Add: 540,000 triples  (Batch: 481 / Run: 838)   [M:50,302,976/F:2,716,840]
Add: 560,000 triples  (Batch: 510 / Run: 819)   [M:50,302,976/F:23,202,120]
Add: 580,000 triples  (Batch: 442 / Run: 796)   [M:50,302,976/F:24,429,032]
Add: 600,000 triples  (Batch: 423 / Run: 773)   [M:50,302,976/F:3,620,232]
  Elapsed: 775.7 seconds
Add: 620,000 triples  (Batch: 373 / Run: 747)   [M:50,302,976/F:20,669,480]
Add: 640,000 triples  (Batch: 379 / Run: 725)   [M:50,302,976/F:2,769,288]
Add: 660,000 triples  (Batch: 301 / Run: 695)   [M:50,302,976/F:17,956,776]
Add: 680,000 triples  (Batch: 391 / Run: 680)   [M:50,302,976/F:1,894,328]
Add: 700,000 triples  (Batch: 376 / Run: 665)   [M:50,302,976/F:12,860,832]
Add: 720,000 triples  (Batch: 362 / Run: 649)   [M:50,302,976/F:24,404,960]
Add: 740,000 triples  (Batch: 542 / Run: 646)   [M:50,302,976/F:9,980,808]
Add: 760,000 triples  (Batch: 565 / Run: 644)   [M:50,302,976/F:29,234,808]
Add: 780,000 triples  (Batch: 579 / Run: 642)   [M:50,302,976/F:13,959,840]
Add: 800,000 triples  (Batch: 677 / Run: 643)   [M:50,302,976/F:28,322,096]
  Elapsed: 1244.0 seconds
Add: 820,000 triples  (Batch: 267 / Run: 621)   [M:50,302,976/F:13,001,616]
Add: 840,000 triples  (Batch: 304 / Run: 606)   [M:50,302,976/F:29,853,512]
Add: 860,000 triples  (Batch: 308 / Run: 593)   [M:50,302,976/F:12,598,280]
Add: 880,000 triples  (Batch: 317 / Run: 581)   [M:50,302,976/F:23,798,368]
Add: 900,000 triples  (Batch: 280 / Run: 568)   [M:50,302,976/F:2,184,296]
Add: 920,000 triples  (Batch: 285 / Run: 556)   [M:50,302,976/F:3,045,136]
Add: 940,000 triples  (Batch: 333 / Run: 548)   [M:50,302,976/F:133,472]
Add: 960,000 triples  (Batch: 296 / Run: 539)   [M:50,302,976/F:2,308,984]
Add: 980,000 triples  (Batch: 336 / Run: 532)   [M:50,302,976/F:3,206,080]
Add: 1,000,000 triples  (Batch: 304 / Run: 524)   [M:50,302,976/F:4,124,408]
  Elapsed: 1905.8 seconds
Add: 1,020,000 triples  (Batch: 301 / Run: 517)   [M:50,302,976/F:26,041,128]
Add: 1,040,000 triples  (Batch: 254 / Run: 507)   [M:50,302,976/F:2,880,784]
Add: 1,060,000 triples  (Batch: 248 / Run: 497)   [M:50,302,976/F:24,670,152]
Add: 1,080,000 triples  (Batch: 220 / Run: 486)   [M:50,302,976/F:2,639,264]
Added 1080060 triples
Loaded in 2358.574 seconds [457 triples/s]
```

  * For the FlyTED dataset generated on 05/11/2008:
```
Start load: /var/www/html/flyweb-data/flyted-full-dump-2008-11-05-03.n3
Add: 20,000 triples  (Batch: 819 / Run: 819)   [M:17,113,088/F:1,102,704]
Add: 40,000 triples  (Batch: 1066 / Run: 927)   [M:24,195,072/F:9,820,328]
Added 49836 triples
Loaded in 52.063 seconds [957 triples/s]
```

  * Create the index:
```
 sdbconfig --verbose --time --sdb=/etc/sdb11/sdb-pgsql-hash-bdgp-YYYYMMDD.ttl --index
 Operation: add indexes: Time 76.607 seconds
```

  * Create the index for the flyted dataset:
```
 sdbconfig --verbose --time --sdb=/etc/sdb11/sdb-pgsql-hash-flyted-20081105.ttl --index
  Operation: add indexes: Time 3.409 seconds
```

# Configure sparqlite for a SDB database #
## Edit /META-INF/context.xml file ##
Add:
```
 <!-- most current -->
    <Resource 
        name="jdbc/bdgp" 
        auth="Container"
        type="javax.sql.DataSource" 
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://localhost/pointothemostrecentdb" # this name has to be the same as your SDB database
        username="flyweb" 
        password="obah10gu" 
        maxActive="20" 
        maxIdle="10"
        maxWait="5000"
        removeAbandoned="true"
        removeAbandonedTimeout="10"
        logAbandoned="true"
    />

    <!-- config for bdgp YYYYMMDD hash layout -->
    <Resource
        name="jdbc/bdgp-20081017-hash"
        auth="Container"
        type="javax.sql.DataSource"
        driverClassName="org.postgresql.Driver"
        url="jdbc:postgresql://localhost/bdgp-YYYYMMDD-sdb-hash"
        username="flyweb"
        password="obah10gu"
        maxActive="20"
        maxIdle="10"
        maxWait="5000"
        removeAbandoned="true"
        removeAbandonedTimeout="10"
        logAbandoned="true"
   />
```