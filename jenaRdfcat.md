shows how to use jena.rdfcat to convert rdf files from one format to another.

# Details #

cd /root/workspace/oai2sparql

export OAITOSPARQLROOT=/root/workspace/oai2sparql

CP="$(./oai2sparql\_path)"

$JAVA\_HOME/jre/bin/java" -cp "$CP" jena.rdfcat -out N3 go\_daily-termdb-20090122.owl > go\_daily-termdb-20090122.n3


Note that,
**it did not work when the owl file was not in the local directory** it did not work when the command options were given in a different order


I did not try to make sure that it has to be in this order, but this command worked.

see also about jena.rdfcat at: http://jena.sourceforge.net/javadoc/jena/rdfcat.html

It was run using Jena 2.