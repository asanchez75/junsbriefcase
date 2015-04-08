## Deploy MILARQ ##

Check out the milarq source code following the link at [http://code.google.com/p/milarq/source/checkout](http://code.google.com/p/milarq/source/checkout).

Build the checked out milarq project and then copy the `webapps/` directory to your tomcat/webapps/ directory such as tomcat/webapps/milarq. The `webapps/` directory should contain all the necessary configuration files, jar files and classes in the `WEB-INF/` directory. The deployment should work when you point to http://localhost:8080/milarq/


### Load data into TDB ###

The latest release of MILARQ is tested against TDB-0.8.8. It is not guaranteed to work with any other older or more recent versions.

You can use the script in the folder `workspace/tools/tdbloader.sh` to load data into TDB. The script uses the `define_paths.sh` script in the same directory. You need to set up the following class paths in the `define_paths.sh` script:
```
## go to MILARQROOT/workspace/tools

## edit the file define_paths.sh according to your system
## for example

JAVA_BIN=${JAVA_BIN:-/usr/bin/java}

WORKSPACE_ROOT=${WORKSPACE_ROOT:-/home/zhaoj/workspace}

MILARQ_PROJECT=${MILARQ_PROJECT:-googlecode-milarq-20110104}

## in the same directory, load data into a tdb database

./tdbloader.sh -v --loc=/mnt/data/tdb/bdgp_20081030 /mnt/tmp/bdgp-images-all-20081030.nt >> /var/log/tdbloader-08.20110104.log

```


### Create configure file for SPARQL endpoint ###

To use MILARQ to host SPARQL endpoint, you need to create configuration files for your TDB RDF data stores in the `MILARQ/WEB_LIB/tdb` directory. Note that the `sparqlite-assembly.ttl` file in the upper directory defines which configuration files are recognized by MILARQ.

```
## go to tomcat/webapps/milarq/WEB_LIB/tdb/
## you can find some existing milarq/sparlite configure files

## create one named as bdgp-20081030.ttl

@prefix tdb:     <http://jena.hpl.hp.com/2008/tdb#> .
@prefix rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix ja:      <http://jena.hpl.hp.com/2005/11/Assembler#> .

[] ja:loadClass "com.hp.hpl.jena.tdb.TDB" .

<#dataset> rdf:type tdb:DatasetTDB ;
    tdb:location "/mnt/data/tdb/bdgp_20081030" ;
    .
```

If you load your RDF data into separate Named Graphs and you don't want to specify the graph names in your SPARQL query, you need to edit the `sparqlite_assembly.ttl` file setting `lite:defaultGraphIsUnion` to `true`.

```

# Sparqlite assembly file.
#
# created by chris for milarq
#
@prefix tdb:    <http://jena.hpl.hp.com/2008/tdb#>.
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix ja:     <http://jena.hpl.hp.com/2005/11/Assembler#>.
@prefix lite:   <http://purl.org/net/sparqlite/vocab#>.

lite:root a lite:Sparqlite
    ; lite:mapIf [lite:matches ".*"; lite:replacement "WEB-INF/tdb/%s.ttl"]
    ; lite:defaultGraphIsUnion true
    .

```

## Create The Basic LARQ index ##

The key idea of MILARQ is to optimatise the performance of an RDF store by creating additional indexes and/or additional shortcut triples. Both the indexing and triple creation tasks can be performed using command line tools from MILARQ. More efficiently, as shown by the MILARQ Claros demo server, we can create shell script to define required optimisation commands as a pipeline.

An example of such a pipeline script can be found at `svn+ssh://milos2.zoo.ox.ac.uk/var/svn/ImageWeb/claros_demo_server`: `WebContent/WEB-INF/data/combined/makecombineddata.sh`.

The basic enhancement is to create Lucene indexes. This can be done by:
  * load your RDF data into an appropriate TDB data store
  * create the Lucene index using the `tdblarqindex` command line tool

By copying from the `makecombineddata.sh` file we managed to create the extra lucene index in the milarq application file directories.

## Create Additional Indexes ##