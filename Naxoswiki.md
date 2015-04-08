# Rodos setup #
  * [RDF data into SDB1.1](Load.md)
  * [sparqlite for a SDB database](Configure.md)

# EC2 Stuff #
  * [the account](Set.md)
  * [EC2/Load RDF data into TDB on EC2]

# FlyWeb relevant #
## BDGP ##
  * Import the mySql dump from BDGP: [ftp://ftp.fruitfly.org/pub/exgomysqldump/archive/current/](ftp://ftp.fruitfly.org/pub/exgomysqldump/archive/current/) into a local mysql database, in order to examine the schema of the database
  * the database is named as bdgp\_20070309, after the version number of bdgp.

### Create an RDF dump from the BDGP relational database using D2R toolkit ###
<pre>
/usr/local/d2r-server-0.4/dump-rdf -m /root/workspace/openflydata/bdgp/imagemapping/d2r-bdgp-insituimages.ttl -f N-TRIPLE > /root/Desktop/bdgp-images-all-20081016.nt<br>
</pre>

### Check the updates to the dump ###
<pre>
tail -f file.name<br>
</pre>

### Check how many triples in the dump ###
<pre>
wc -l ~/flybase-genes-dmel-not-obsolete-with-fbgn-cg-synonyms-fullname-symbol-anyname.nt<br>
</pre>

## SDB on Naxos ##
### SDB1.2 Installation ###
**Get SDB from SVN ...
> $ sudo svn co http://jena.svn.sourceforge.net/svnroot/jena/SDB/trunk /root/kit/sdb/**

**Compile sdb.jar ...
```
 $ cd /usr/lib/jena/sdb
 $ sudo mkdir bldbin
 $ sudo ant jar
```
Set up your environment ...
```
 $ export SDBROOT=/path/to/sdb
 $ export PATH=$SDBROOT/bin:$PATH
 $ export SDB_USER=YourDatabaseUserName
 $ export SDB_PASSWORD=YourDatabasePassword
 $ export SDB_JDBC=/path/to/your/jdbc/driver
```
Create postgres databases for the SDB test suite (one for each layout).
```
 $ su postgres
 $ createuser -D -A -P sdb11
 $ createdb -O sdb11 -E utf8 sdb11hash
 $ createdb -O sdb11 -E utf8 sdb11index
 $ exit
```** Export SDB environment variables.
```
 $ export SDBROOT=/root/kit/sdb12
 $ export PATH=$SDBROOT/bin:$PATH
 $ export SDB_USER=YourDatabaseUserName
 $ export SDB_PASSWORD=YourDatabasePassword
 $ export SDB_JDBC=/path/to/postgresql-8.3-603.jdbc3.jar
```
Modify the config for the SDB test suite.
```
 $ mkdir /etc/sdb12
 $ cp /root/kit/sdb12/Store/sdb-pgsql.ttl /etc/sdb12/sdb-pgsql-hash-test.ttl
 $ cp /root/kit/sdb12/Store/sdb-pgsql.ttl /etc/sdb12/sdb-pgsql-index-test.ttl
```

Create the SDB database.
```
 $ cd /root/kit/sdb12/bin
 $ sdbconfig --time --verbose --sdb=/etc/sdb12/sdb-pgsql-hash-test.ttl --create
 $ sdbconfig --time --verbose --sdb=/etc/sdb12/sdb-pgsql-index-test.ttl --create
```
Run the SDB test suite on both test databases.
```
 $ sdbtest --time --verbose --sdb=/etc/sdb12/sdb-pgsql-hash-test.ttl testing/manifest-sdb.ttl 
 $ sdbtest --time --verbose --sdb=/etc/sdb12/sdb-pgsql-index-test.ttl testing/manifest-sdb.ttl
```

### Create and Load Databases for BDGP ###
BDGP dump is at: /root/Desktop/bdgp-images-all-20081016.nt
```
 su postgres
 createuser -D -A -P flywebnaxos
 createdb -O flywebnaxos -E utf8 bdgp-sdb-hash
 exit
```
Make SDB configurations for each database. E.g.

> vi /etc/sdb12/sdb-pgsql-hash-bdgp-20081017.ttl

<pre>
@prefix sdb:     <http://jena.hpl.hp.com/2007/sdb#> .<br>
@prefix rdfs:    <http://www.w3.org/2000/01/rdf-schema#> .<br>
@prefix rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .<br>
@prefix ja:      <http://jena.hpl.hp.com/2005/11/Assembler#> .<br>
<br>
<#store> rdf:type sdb:Store ;<br>
sdb:layout         "layout2/hash" ;<br>
sdb:connection     <#conn> ;<br>
.<br>
<#conn> rdf:type sdb:SDBConnection ;<br>
sdb:sdbType        "postgresql" ;<br>
sdb:sdbHost        "localhost" ;<br>
sdb:sdbName        "bdgp-20081030-sdb-hash" ;<br>
sdb:driver         "org.postgresql.Driver" ;<br>
.<br>
</pre>

Format each of the SDB databases.
```
 $ sdbconfig --time --verbose --sdb=/etc/sdb12/sdb-pgsql-hash-bdgp-20081017.ttl --format
```
Load data & create indexes.
```
 $ sdbload --time --verbose --sdb=/etc/sdb12/sdb-pgsql-hash-bdgp-20081017.ttl /path/to/file.rdf
 $ sdbconfig --verbose --time --sdb=/etc/sdb12/sdb-pgsql-hash-bdgp-20081017.ttl --index

 Added 1080060 triples
 Loaded in 514.055 seconds [2101 triples/s]

 Operation: add indexes: Time 25.677 seconds
```
### SDB Joseki Integration ###
Following instructions at http://jena.hpl.hp.com/wiki/SDB/Joseki_Integration ...

  * Copy SDB jar to lib directory.

> $ cp $SDBROOT/lib/sdb.jar /var/lib/tomcat/webapps/joseki3-1/WEB-INF/lib/

  * Edit Joseki configuration file at "webapps/joseki/WEB-INF/joseki-config.ttl"

Finally, add a snippet for the URL mapping in web.xml.
```
  <servlet-mapping>
    <servlet-name>SPARQL service processor</servlet-name>
    <url-pattern>/flyted-pgsql-sdb</url-pattern>
  </servlet-mapping>
```
## BDGP SPARQl queries ##
**The SPARQLer interface: http://serifos.zoo.ox.ac.uk/bdgp/snorql/** The SPARQL endpoint: http://serifos.zoo.ox.ac.uk/bdgp/sparql

### The prefix ###
```

<pre>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX go: <http://purl.org/obo/owl/GO#>
PREFIX oban: <http://www.berkeleybop.org/ontologies/oban/alpha#>
PREFIX vocab: <http://serifos.zoo.ox.ac.uk/bdgp/resource/vocab/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://www.geneontology.org/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX digitalmedia: <http://www.mindswap.org/2005/owl/digital-media#>
PREFIX map: <file:/C:/oxford/d2r-server-0.4/d2r-server-0.4/mapping.n3#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX oborel: <http://www.obofoundry.org/ro/ro.owl#>
PREFIX insitu: <http://www.fruitfly.org/insituimages/insitu_images/thumbnails>
PREFIX db: <http://serifos.zoo.ox.ac.uk/bdgp/resource/>
PREFIX obo: <http://purl.org/obo/owl>
PREFIX genomics: <http://www.berkeleybop.org/ontologies/genomics/alpha#>


Unknown end tag for &lt;/pre&gt;


```

### The Queries ###
**Test whether images exist in the data**```

ASK {?image rdf:type vocab:image}
```

The expected JSON output should be:
```

{"head":{},"boolean":true}
```

**Test whether image URIs exist in the data:**```

ASK {?image vocab:image_path ?path}
```

The expected JSON output should be:
```

select ?path {?image vocab:image_path ?path}
```

**Get image URIs:**```

select ?path {?image vocab:image_path ?path}
```

There should be at least one image URI.

**Get the gene product associated with a given gene**```

<pre>
SELECT * WHERE {?gp skos:altLabel "CG10151"}


Unknown end tag for &lt;/pre&gt;


```

This should return at least one gene product. The expected JSON output should be:
```

<pre>
{
"head": {
"vars": [ "gp" ]
} ,
"results": {
"bindings": [
{
"gp": { "type": "uri" , "value": "http://serifos.zoo.ox.ac.uk/bdgp/resource/gene_product/2831" }
}
]
}
}


Unknown end tag for &lt;/pre&gt;


```

**Get Image URIs for a give gene product**```

<pre>
SELECT ?path WHERE {
?exp oban:has_participants_from ?gp .
?img digitalmedia:depicts ?exp .
?image vocab:image_path ?path
Filter (?gp = <http://serifos.zoo.ox.ac.uk/bdgp/resource/gene_product/2831>)
}


Unknown end tag for &lt;/pre&gt;


```

This should return at least one image URI.

**Get image URIs for a given gene**```

<pre>
SELECT * WHERE {
?img digitalmedia:depicts [ oban:has_participants_from [ skos:altLabel "genename" ] ]; vocab:image_path ?path .
}


Unknown end tag for &lt;/pre&gt;


```

# Postgres #
Install the latest Postgresql (v8.3):
```
 yum install postgresql
 yum install postgresql-server
```

I had to run initdb in order to have the right access to create database tables.

create the data folder at: /var/data/progres/
```
initdb:
 initdb -D /var/data/postgres/
```

<pre>
The files belonging to this database system will be owned by user "postgres".<br>
This user must also own the server process.<br>
<br>
The database cluster will be initialized with locale en_US.UTF-8.<br>
The default database encoding has accordingly been set to UTF8.<br>
<br>
fixing permissions on existing directory /var/data/postgres ... ok<br>
creating directory /var/data/postgres/global ... ok<br>
creating directory /var/data/postgres/pg_xlog ... ok<br>
creating directory /var/data/postgres/pg_xlog/archive_status ... ok<br>
creating directory /var/data/postgres/pg_clog ... ok<br>
creating directory /var/data/postgres/pg_subtrans ... ok<br>
creating directory /var/data/postgres/pg_twophase ... ok<br>
creating directory /var/data/postgres/pg_multixact/members ... ok<br>
creating directory /var/data/postgres/pg_multixact/offsets ... ok<br>
creating directory /var/data/postgres/base ... ok<br>
creating directory /var/data/postgres/base/1 ... ok<br>
creating directory /var/data/postgres/pg_tblspc ... ok<br>
selecting default max_connections ... 100<br>
selecting default shared_buffers ... 1000<br>
creating configuration files ... ok<br>
creating template1 database in /var/data/postgres/base/1 ... ok<br>
initializing pg_authid ... ok<br>
enabling unlimited row size for system tables ... ok<br>
initializing dependencies ... ok<br>
creating system views ... ok<br>
loading pg_description ... ok<br>
creating conversions ... ok<br>
setting privileges on built-in objects ... ok<br>
creating information schema ... ok<br>
vacuuming database template1 ... ok<br>
copying template1 to template0 ... ok<br>
copying template1 to postgres ... ok<br>
<br>
WARNING: enabling "trust" authentication for local connections<br>
You can change this by editing pg_hba.conf or using the -A option the<br>
next time you run initdb.<br>
<br>
Success. You can now start the database server using:<br>
<br>
postmaster -D /var/data/postgres<br>
or<br>
pg_ctl -D /var/data/postgres -l logfile start<br>
</pre>

Keep /var/data/postgres/pg\_hba.conf as default.

Run postmaster -D /var/data/postgres to start the database server.

  * Log in as the postgres superuser
> > su - postgres

  * Go to postgres console:
> > psql -U postgres or psql

  * Create a new postgresql user from linux shell:
```
createuser -leP username (the 'l' gives the login privilege, 'e' shows the command sent to the server, and 'P' means assigning a password to the new role)
```
  * show databases: SHOW DATABASES = \l
  * use database [databasename](databasename.md): \c databasename
  * show tables: \db
  * describe table [tablename](tablename.md): \d [tablename](tablename.md)

  * Create a new user from psql shell:
```
 create role joseki31; (create a new role, but it does not give you the login privilege or assign password)
 select rolname from pg_roles; (to confirm this new role exists)

 alter role joseki31 login; (in order to let it login. )
 alter role joseki31 password 'psw'; (You don't need these two commands if you used the 'createuser' command)
```
  * Create a new database from linux shell:

> createdb -O username -E encoding dbname

for example

> createdb -O flywebnaxos -E utf8 tcm-sdb-hash

  * Create a new database from psql shell:
> > create database dbname owner username;

  * Start psql session on a given database:
> > psql -d flyted -U joseki31 -W

  * Drop postgres database or user from linux shell:
```
 dropdb [dbname]
 dropuser [username]
```

  * Alter the "postgres" user password:


> $ sudo -u postgres psql postgres

Then, at the new prompt type these two commands, replacing 

&lt;password&gt;

 with the new password (keep this safe ) :
```
 ALTER USER postgres WITH ENCRYPTED PASSWORD ' <***password***> ';
 \q
```
To create a user:
```
 $ sudo -u postgres createuser -D -A -P [username]
```
... with no database creation rights (-D) with no add user rights -A) and will prompt you for entering a password (-P).

To create a database, e.g. "mydb":

> $ sudo -u postgres createdb mydb

To create a database specifying owner and encoding:

> $ sudo -u postgres createdb -O [owner](owner.md) -E utf8 [dbname](dbname.md)

N.B. two databases created, 'bdgp20080515' and 'flyted20080626'.

  * Configuring authentication:
Edit /var/lib/pgsql/data/pg\_hba.conf file in order to let users log into the local database. See http://www.postgresql.org/docs/8.1/interactive/client-authentication.html. We need to set:
```
local    all     all                   password
host     all     all   127.0.0.1/32    password
host     all     all   ::1/128         password
```
Then restart the postgres service service postgresql restart.

  * Check the tables of the database from psql:
> \d

# Local Subversion #
Location: /var/svn/drafts; https://naxos.zoo.ox.ac.uk/svn/drafts/

Checkout: svn checkout svn+ssh://user@naxos.zoo.ox.ac.uk/var/svn/drafts

See also: http://milos2.zoo.ox.ac.uk/ibrgtech/index.php/Milos_setup#Subversion

# Meeting and Activities #
  * [[Planning/13052008]]
  * [[of ESWC2008](Highlights.md)]
  * [[Research Data Workshop 06132008](Oxford.md)]
  * [[TalkingWithAlMum/08092008]]
  * [[HCLSMeeting/20102008]]
  * [[HCLSMeeting/21102008]]
  * [[HighlightsFromF2F](HighlightsFromF2F.md)]
  * [[Edinburgh20081128](Edinburgh20081128.md)]

## Sprint meeting notes ##
  * [[Planning/13052008]] - The agenda for the Sprint planning meeting on 13-14 May 2008. This is the 3rd Spring planning meeting in our group.

# HCLS #
## BioRDF ##
  * [[Descriptions](Descriptions.md)]

## LODD ##
  * [[LODD/QueryChineseMedicine]]

## Work on the first FlyWeb release ##
  * [[FlyBase schema to ontology](Mapping.md)]

# Virtuoso set up #
Set up on Naxos running Centos:
  * http://virtuoso.openlinksw.com/dataspace/dav/wiki/Main/VOSDownload
  * http://virtuoso.openlinksw.com/dataspace/dav/wiki/Main/VOSMake

Using the default configure, the tool was installed at /usr/local/virtuoso-opensource

Note:
  * Check the version number of the following tools installed on your system:
```
 $ autoconf --version
 $ automake --version
 $ libtoolize --version
 $ flex --version
 $ bison --version
 $ gperf --version
 $ gawk --version
 $ m4 --version
 $ make --version
 $ openssl version
```
**Make sure that your system has at least 460MB free space**

## Compile ##
  * Before everything started, I needed to uninstall flex2.5.4 and install flex 2.5.33 manually.

  * Running './configure'
```
 Virtuoso Open Source Edition 5.0.8 configuration summary
 ========================================================
 Installation variables
  layout                  default
  prefix                  /usr/local/virtuoso-opensource
  exec_prefix             ${prefix}
 Installation paths
  programs                ${exec_prefix}/bin
  include files           ${prefix}/include
  libraries               ${exec_prefix}/lib
  manual pages            ${prefix}/man
  vad packages            ${prefix}/share/virtuoso/vad
  database                ${prefix}/var/lib/virtuoso/db
  hosting                 ${exec_prefix}/lib/virtuoso/hosting
 Options
  BUILD_OPTS               xml ssl ldap imsg pldebug pthreads
```
  * Running 'make'
> This started at 12:52

## Installation ##
> make install

Optionally, at the root of the build tree to start the automated test suite:

> make check

This takes about an hour on a 2GHz machine and requires approximately 1 GB of free disk space.

## Get started ##
Start the server in the background:
```
 cd $VIRTUOSO_HOME/var/lib/virtuoso/db
 export PATH=/usr/local/virtuoso-opensource/bin:$PATH
 virtuoso-t -f &
```

The first time it's run, it will create the empty database (no special commands required) and install the Conductor VAD package. From here, you can access http://localhost:8890/ and http://localhost:8890/conductor/ and use the System Administration / Packages page to install other packages such as Demo and the ODS suite (addressbook, weblog, feeds manager and other applications) etc.

The default login is `dba' with a password of `dba' for the Conductor and isql (for DAV functions, the default login is `dav' with a password of `dav').

## Insert OWL ##
## Insert RDF ##
```
 curl -i -d "INSERT {<http://localhost:8890/DAV/home/rdf_sink/myfoaf.rdf> <http://www.w3.org/1999/02 /22-rdf-syntax-ns#type> <http://rdfs.org/sioc/ns#User>}" -u "jun:jun" -H "Content-Type: application/sparql-query" http://localhost:8890/DAV/home/xx/yy

 HTTP/1.1 201 Created
 Server: Virtuoso/05.08.3034 (Linux) i686-redhat-linux-gnu  
 Connection: Keep-Alive
 Content-Type: text/html; charset=UTF-8
 Date: Mon, 27 Oct 2008 15:11:42 GMT
 Accept-Ranges: bytes
 MS-Author-Via: SPARQL
 Content-Length: 0

http://localhost:8890/DAV/home/xx/yy returns:
 <rdf:RDF>
 <rdf:Description rdf:about="http://localhost:8890/DAV/home/rdf_sink/myfoaf.rdf">
 <rdf:type rdf:resource="http://rdfs.org/sioc/ns#User"/>
 </rdf:Description>
 </rdf:RDF>
```

## Performance Tuning ##
Because the graph name is normally normally used in our sparql queries, as one or more FROM or FROM NAMED, the default indices would not be appropriate. The following sequence need to executed in order to convert the data and create alternative indices:
```
 log_enable (2);
 drop index RDF_QUAD_OGPS;
 -- 132430 msec.
 checkpoint;
 create table R2 (G iri_id_8, S iri_id_8, P iri_id_8, O any, primary key (S, P, O, G));
 alter index R2 on R2 partition (S int (0hexffff00));
 insert into r2 (g, s, p, o) select g, s, p, o from rdf_quad;
 -- 1410126 msec.
 drop table RDF_QUAD;
 -- 447939 msec.
 checkpoint;
 -- 19421 msec.
 alter table r2 rename RDF_QUAD;
 create bitmap index RDF_QUAD_OPGS on DB.DBA.RDF_QUAD (O, P, G, S) partition (O varchar (-1, 0hexffff));
 -- 539202 msec.
 create bitmap index RDF_QUAD_POGS on RDF_QUAD (P, O, G, S) partition (O varchar (-1, 0hexffff));
  -- 478196 msec.
 create bitmap index RDF_QUAD_GPOS on RDF_QUAD (G, P, O, S) partition (O varchar (-1, 0hexffff));
 -- 433467 msec
 checkpoint;
 log_enable (1);
```

First drop the OGPS index to make space. Then, in row autocommit mode and without logging, copy the quads into a new primary key layout. Drop the old and rename the new over the old. Make the additional indices. Do a checkpoint after the drops so as to actually free the space also in the checkpointed state. Finish with a checkpoint so as to finalize the changes, since logging was turned off. Even if logging had been on, one would not wish to have to replay the reindexing if the server terminated abnormally. Finally turn logging back on for the session.

Note:This is all meant to be done with a SQL client like isql and not through a web interface. The web interface has no real session and the log\_enables do nothing there.

Other indexing schemes may be tried. We note however that in all cases, one or other of the indices should begin with G. This is because for schema operations it is necessary to read through a graph. If no index begins with G, this becomes a full table scan and is unworkable, leading to an extremely slow server start and making operations like drop graph as good as unusable.

## Other notes from Virtuoso web site ##
Public web service endpoints are proven to be sources of especially bad queries. While local application develpers can obtain instructions from database administrator and use ISQL access to the database in order to tune execution plans, "external" clients do not know details of configuration and/or lacks appropriate skills. The most common problem is that public endpoints usually get requests that does not mention the required graph, because that queries were initially written for use with triple stores. If the web service provides access to a single graph (or to a short list of graphs) then it is strongly recommended to configure it by adding a row into DB.DBA.SYS\_SPARQL\_HOST. The idea is that if the client specifies default graph in the request or uses named graphs and group graph patterns then he is probably smarter than average and will provide meaningful queries. If no graph names are specified then the query will benefit from preset graph because this will give the compiler some more indexes to choose from -- indexes that begin with G.

Sometimes web service endpoint is used to access data of only one application, not all data in the system. In that case one may wish to declare a separate storage that consists of only RDF Views made by that application and define input:storage in appropriate row of DB.DBA.SYS\_SPARQL\_HOST.

### Erroneous Cost Estimates and Explicit Join Order ###
The selectivity of triple patterns is determined at query compile time from sampling the data. It is possible that misleading data is produced. To see if the cardinality guesses are generally valid, look at the query plan with explain ().

Below is a sample from the LUBM qualification data set in the Virtuoso distribution. After running make test in binsrc/tets/lubm, there is a loaded database with the data. Start a server in the same directory to see the data.
```
 SQL> explain ('sparql prefix ub: <http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#>
 select * from <lubm>
 where { ?x rdf:type ub:GraduateStudent }');
 REPORT
 VARCHAR
 _______________________________________________________________________________
 {
 Precode:
      0: $25 "callret" := Call __BOX_FLAGS_TWEAK (<constant (lubm)>, <constant (1)>)
      5: $26 "lubm" := Call DB.DBA.RDF_MAKE_IID_OF_QNAME_SAFE ($25 "callret")
      12: $27 "callret" := Call __BOX_FLAGS_TWEAK (<constant (http://www.w3.org/1999/02/22-rdf-syntax-ns#type)>, <constant (1)>)
      17: $28 "-ns#type" := Call DB.DBA.RDF_MAKE_IID_OF_QNAME_SAFE ($27 "callret")
      24: $29 "callret" := Call __BOX_FLAGS_TWEAK (<constant (http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#GraduateStudent)>, <constant (1)>)
      29: $30 "owl#GraduateStudent" := Call DB.DBA.RDF_MAKE_IID_OF_QNAME_SAFE ($29 "callret")
      36: BReturn 0
 from DB.DBA.RDF_QUAD by RDF_QUAD_OGPS    1.9e+03 rows
 Key RDF_QUAD_OGPS  ASC ($32 "s-3-1-t0.S")
 <col=415 O = $30 "owl#GraduateStudent"> , <col=412 G = $26 "lubm"> , <col=414 P = $28 "-ns#type">
 row specs: <col=415 O LIKE <constant (T)>>
 Current of: <$34 "<DB.DBA.RDF_QUAD s-3-1-t0>" spec 5>
 After code:
      0: $35 "x" := Call ID_TO_IRI ($32 "s-3-1-t0.S")
      5: BReturn 0
 Select ($35 "x", <$34 "<DB.DBA.RDF_QUAD s-3-1-t0>" spec 5>)
 }
 22 Rows. -- 1 msec.
```

This finds the graduate student instances in the lubm graph. First the query converts the IRI literals to id's. Then, using a match of OG on OGPS it finds the IRI's of the graduate students. Then it converts the IRI id to return to the string form.

The cardinality estimate of 1.9e+03 rows is on the FROM line.

Doing an explain on the queries will show the cardinality estimates. To drill down further, one can split the query into smaller chunks and see the estimates for these, up to doing it at the triple pattern level. To indicate a variable that is bound but whose value is not a literal known at compile time, one can use the parameter marker ??.
```
 explain ('sparql define sql:table-option "order"  prefix ub: <http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#>
 select * from <lubm>
 where { ?x rdf:type ?? }');
```
This will not know the type but will know that a type will be provided. So instead of guessing 1900 matches, this will guess a smaller number, which is obviously less precise. Thus literals are generally better.

In some cases, generally to work around an optimization error, one can specify an explicit join order. This is done with the sql:select-option "order" clause in the SPARQL query prefix.
```
 select sparql_to_sql_text (' define sql:select-option "order" prefix ub: <http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#>
 select * from <lubm>
 where { ?x rdf:type ub:GraduateStudent . ?x ub:takesCourse <http://www.Department0.University0.edu/GraduateCourse0> }');
```
shows the SQL text with the order option at the end.

If an estimate is radically wrong then this should be reported as a bug.

If there is a FROM with a KEY on the next line and no column specs then this is a full table scan. The more columns are specified the less rows will be passed to the next operation in the chain. In the example above, there are three columns whose values are known before reading the table and these columns are leading columns of the index in use so column specs are
```
 <col=415 O = $30 "owl#GraduateStudent"> , <col=412 G = $26 "lubm"> , <col=414 P = $28 "-ns#type">
```
Note: A KEY with only a row spec is a full table scan with the row spec applied as a filter. This is usually not good unless this is specifically intended.

If queries are compiled to make full table scans when this is not specifically intended, this should be reported as a bug. The explain output and the query text should be included in the report.

An explicit join order is specified by the define sql:select-option "order" clause in the SPARQL query prefix: Consider:
```
 explain ('sparql define sql:select-option "order, loop" prefix ub: <http://www.lehigh.edu/~zhp2/2004/0401/univ-bench.owl#>
 select * from <lubm>
 where { ?x ub:takesCourse ?c . ?x rdf:type ub:GraduateStudent   }');
```
One will see in the output that the first table access is to retrieve all in the lubm graph which take some course and then later to check if this is a graduate student. This is obviously not the preferred order but the sql:select-option "order" forces the optimizer to join from left to right.

It is very easy to end up with completely unworkable query plans in this manner but if the optimizer really is in error, then this is the only way of overriding its prefrences. The effect of sql:select-option is pervasive, extending inside unions, optionals, subqueries etc within the statement.

We note that if, in the above query, both the course taken by the student and the type of the student are given, the query compilation will be, at least for all non-cluster cases, an index intersection. This is not overridden by the sql:select-option clause since an index intersection is always a safe guess, regardless of the correctness of the cardinality guesses of the patterns involved.

### Loading ###
There are many functions for loading RDF text, in RDF/XML and Turtle.

For loading RDF/XML, the best way is to ssplit the data to be loaded into multiple streams and load these in parallel using rdf\_load\_rdfxml (). To avoid running out of rollback space for large files and in order to have multiple concurrent loads not interfere with each other, the row autocommit mode should be enabled.

For example,
```
 log_enable (2);
 -- switch row-by-row autocommit on and logging off for this session
 db..rdf_load_rdfxml (file_to_string_output ('file.xml'), 'base_uri', 'target_graph');
 -- more files here ...
 checkpoint;
```

Loading a file with text like the above with isql will load the data. Since the transaction logging is off, make a manual checkpoint at the end to ensure that data is persisted upon server restart since there is no roll forward log.

If large amounts of data are to be loaded, run multiple such streams in parallel. One may have for example 6 streams for 4 cores. This means that if up to two threads wait for disk, there is still work for all cores.

Having substantially more threads than processors or disks is not particularly useful.

There exist multithreaded load functions which will load one file on multiple threads. Experience shows that loading multiple files on one thread per file is better.

For loading Turtle, some platforms may have a non-reentrant Turtle parser. This means that only one load may run at a time. One can try this by calling ttlp () from two sessions at the same time. If these do not execute concurrently, then the best way may be to try ttlp\_mt and see if this runs faster than a single threaded ttlp call.

### Loading UniProt RDF data ###
To load the uniprot data, create a function for example such as:
```
 create function DB.DBA.UNIPROT_LOAD (in log_mode integer := 1)
 {
  DB.DBA.RDF_LOAD_RDFXML_MT (file_to_string_output('filename1'),'http://base_uri_1', 'destination_graph_1', log_mode, 3);
  DB.DBA.RDF_LOAD_RDFXML_MT (file_to_string_output('filename2'),'http://base_uri_2', 'destination_graph_2', log_mode, 3);
  ...
  DB.DBA.RDF_LOAD_RDFXML_MT (file_to_string_output('filename9'),'http://base_uri_9', 'destination_graph_9', log_mode, 3);
 }
```

If you are starting from blank database and you can drop it and re-create in case of error signaled, use it this way:
```
 checkpoint;
 checkpoint_interval(6000);
 DB.DBA.UNIPROT_LOAD (0),
 checkpoint;
 checkpoint_interval(60);
```

If the database contains important data already and there's no way to stop it and backup before the load then use:
```
 checkpoint;
 checkpoint_interval(6000);
 DB.DBA.UNIPROT_LOAD (),
 checkpoint;
 checkpoint_interval(60);
```

Note that the 'number of threads' parameter of DB.DBA.RDF\_LOAD\_RDFXML() mentions threads used to process data from file, an extra thread will read the text and parse it, so for 4 CPU cores there's no need in parameter value greater than 3. Three processing threads per one parsing tread is usually good ratio because parsing is usually three times faster than the rest of loading so CPU loading is well balanced. If for example you are using 2 x Quad Xeon, then you can choose between 8 single-threaded parsers or 2 parsers with 3 processing threads each. With 4 cores you may simply load file after file with 3 processing threads. The most important performance tuning is to set the [Parameters](Parameters.md) section of virtuoso configuration file:
```
 NumberOfBuffers = 1000000
 MaxDirtyBuffers = 800000
 MaxCheckpointRemap = 1000000
 DefaultIsolation = 2
```

Note: these numbers are reasonable for 16 GB RAM Linux box. Usually when there are no such massive operations as loading huge database, you can set up the values as:
```
 NumberOfBuffers = 1500000
 MaxDirtyBuffers = 1200000
 MaxCheckpointRemap = 1500000
 DefaultIsolation = 2
```

Tip: Thus after loading all data you may wish to shutdown, tweak and start server again. If you have ext2fs or ext3fs filesystem, then it's better to have enough free space on disk not to make it more than 80% full. When it's almost full it may allocate database file badly, resulting in measurable loss of disk access speed. That is not Virtuoso-specific fact, but a common hint for all database-like applications with random access to big files.

Here is an example of using awk file for splitting big file smaller ones:
<pre>
BEGIN {<br>
file_part=1000<br>
e_line = "<br>
<br>
Unknown end tag for </RDF><br>
<br>
"<br>
cur=0<br>
cur_o=0<br>
file=0<br>
part=file_part<br>
}<br>
{<br>
res_file_i="res/"FILENAME<br>
line=$0<br>
s=$1<br>
res_file=res_file_i"_"file".rdf"<br>
<br>
if (index (s, "<br>
<br>
Unknown end tag for </Description><br>
<br>
") == 1)<br>
{<br>
cur=cur+1<br>
part=part-1<br>
}<br>
<br>
if (part > 0)<br>
{<br>
print line >> res_file<br>
}<br>
<br>
if (part == 0)<br>
{<br>
#		print "===================== " cur<br>
print line >> res_file<br>
print e_line >> res_file<br>
close (res_file)<br>
file=file+1<br>
part=file_part<br>
res_file=res_file_i"_"file".rdf"<br>
system ("cp beg.txt " res_file)<br>
}<br>
}<br>
END { }<br>
</pre>

### Loading DBPedia RDF data ###
You can use the following script as an example for loading DBPedia RDF data in Virtuoso:
```
 #!/bin/sh
 LOG=load_dbpedia.log
 #rm -f $LOG

 #Directory structore
 mkdir BAD   2>> /dev/null
 mkdir READY 2>> /dev/null

 ISQL=${ISQL-isql}
 PORT=${PORT-1118}
 DATABASE_USER=${DATABASE_USER-dba}
 DATABASE_PASS=${DATABASE_PASS-dba}
 DATABASE_INI=${DATABASE_INI-dbpedia.ini}

 DSN="$ISQL $PORT $DATABASE_USER $DATABASE_PASS"
 export LOG DSN DATABASE_INI

 STAR_NEW_SERVER ()
 {
	rm -rf core *.lck   2>> /dev/null
	echo "Starting OpenLink Virtuoso Universal Server"
        virtuoso-iodbc-t +wait -c $DATABASE_INI
	sleep 5
	echo "Starting OpenLink Virtuoso Universal Server - Done."
	STATUS=1
 }

 CHECK_LOG()
 {
    rline=`cat temp.res | grep -i "TURTLE RDF loader"`
    if test "x$rline" != "x"
    then
	echo "BAD FILE. " $1 | tee -a $LOG
	echo $bad_line
	bad_line=`cat temp.res | grep "TURTLE RDF loader" | sed -e "s/\*\*\* Error 37000: \[Virtuoso Driver\]\[Virtuoso Server\]SP029: TURTLE RDF loader, line //g" | cut -f 1 -d :`
	echo "Bad line:" $bad_line " from " $1
	mv $1 BAD
    fi

    rline=`cat temp.res | grep -i "Lost connection to server"`
    if test "x$rline" != "x"
    then
	echo "GPF !!! in " $1 | tee -a $LOG
	STAR_NEW_SERVER
	return
    fi

    rline=`cat temp.res | grep -i "Connect failed"`
    if test "x$rline" != "x"
    then
	STAR_NEW_SERVER
	return
    fi

    sleep 1
    STATUS=0
 } 

 echo "======================================="
 echo "Loading dbpedia started."
 echo "======================================="

 LOAD_ONE ()
 {
    FINISH=0
    for f in `find data -name '*.nt'`
    do
	du -h data READY $f
	#   LOAD DATA
	echo "Loading $f (`cat $f | wc -l` lines) `date \"+%H:%M:%S\"`" | tee -a $LOG
	$DSN verbose=on banner=off prompt=off echo=ON errors=stdout  \
	exec="ttlp_mt (file_to_string_output ('$f'), '', 'http://dbpedia.org');" > temp.res
	cat temp.res >> $LOG
	CHECK_LOG $f
	if test $STATUS -ne 0
	then
	    return
	fi

	#   CHECKPOINT
	echo "Checkpoint start at: `date \"+%H:%M:%S\"`" | tee -a $LOG
	$DSN verbose=on banner=off prompt=off echo=ON errors=stdout exec="checkpoint;" > temp.res
	cat temp.res >> $LOG

	CHECK_LOG $f
	if test $STATUS -ne 0
	then
	    return
	fi
	$DSN verbose=on banner=off prompt=off echo=ON errors=stdout  \
	exec="sparql select count(*) where { ?s <http://dbpedia.org/property/wordnet_type> ?o};" > temp.res
	cat temp.res >> $LOG
	CHECK_LOG $f
	echo "Finish.  "
	echo "======================================="
	mv $f READY 2>> /dev/null
	rm temp.res
	return
    done

    FINISH=1
 }

 while true
 do
  LOAD_ONE
  if test $FINISH -ne 0
  then
      echo "If you read this you have a red letter day !!!"
      echo "Check BAD directory for bad skiped files."
      echo "======================================="
      exit 0
  fi
 done
```

### Loading Bio2RDF data ###
The shell script below was used to import files in n3 notation into OpenLink Virtuoso RDF storage.

When an syntax error it will cut content from next line and will retry. This was used on ubuntu linux to import bio2rdf and freebase dumps.

Note it uses gawk, so it must be available on system where is tried. Also for recovery additional disk space is needed at max the size of original file.
```
#!/bin/bash

PASS=$1
f=$2
g=$3

# Usage
if [ -z "$PASS" -o -z "$f" -o -z "$g" ]
then
  echo "Usage: $0 [password] [ttl-file] [graph-iri]"
  exit
fi

if [ ! -f "$f" ]
then
    echo "$f does not exists"
    exit
fi

# Your port here
PORT=1111  #`inifile -f dbpedia.ini -s Parameters -k ServerPort`
if test -z "$PORT"
then
    echo "Cannot find INI and inifile command"
    exit
fi

# Initial run
isql $PORT dba $PASS verbose=on banner=off prompt=off echo=ON errors=stdout exec="ttlp_mt (file_to_string_output ('$f'), '', '$g'); checkpoint;" > $0.log

# If disconnect etc.
if [ $? != 0 ]
then
    echo "An error occured, please check $0.log"
    exit
fi

# Check for error
line_no=`grep Error $0.log | awk '{ match ($0, /line [0-9]+/, x) ; match (x[0], /[0-9]+/, y); print y[0] }'`
newf=$f.part
inx=1

# Error recovery
while [ ! -z "$line_no" ]
do
    cat $f |  awk "BEGIN { i = 0 } { if (i==$line_no) { print \$0; exit; } i = i + 1 }"  >> bad.nt
    line_no=`expr $line_no + 1`
    echo "Retryng from line $line_no"
    cat $f |  awk "BEGIN { i = 0 } { if (i>=$line_no) print \$0; i = i + 1 }"  > tmp.nt
    mv tmp.nt $newf
    f=$newf
    mv $0.log $0.log.$inx
    # Run the recovered part
    isql $PORT dba $PASS verbose=on banner=off prompt=off echo=ON errors=stdout exec="ttlp_mt (file_to_string_output ('$f'), '', '$g'); checkpoint;" > $0.log

    if [ $? != 0 ]
    then
	echo "An error occured, please check $0.log"
	exit
    fi
   line_no=`grep Error $0.log | awk '{ match ($0, /line [0-9]+/, x) ; match (x[0], /[0-9]+/, y); print y[0] }'`
   inx=`expr $inx + 1`
done
```

### Using SPARUL ###
Since SPARUL updates are generally not ment to be transactional, it is best to run these in log\_enable (2) mode, which commits every operation as it is done. This prevents one from running out of rollback space. Also for bulk updates, transaction logging can be turned off. If so, one should do a manual checkpoint after the operation to ensure persistence across server restart since there is no roll forward log.

To have a roll forward log and row by row autocommit, one may use log\_enable (3). This will write constantly into the log which takes extra time. Having no logging and doing a checkpoint when the whole work is finished is faster.

Many SPARUL operations can be run in parallel in this way. If they are independent with respect to their input and output, they can run in parallel and row by row autocommit will ensure they do not end up waiting for each others' locks.

### DBpedia Benchmark ###
We ran the DBpedia benchmark queries again with different configurations of Virtuoso. Comparing numbers given by different parties is a constant problem. In the case reported here, we loaded the full DBpedia 3, all languages, with about 198M triples, onto Virtuoso v5 and Virtuoso Cluster v6, all on the same 4 core 2GHz Xeon with 8G RAM. All databases were striped on 6 disks. The Cluster configuration was with 4 processes in the same box. We ran the queries in two variants:
**With graph specified in the SPARQL FROM clause, using the default indices.** With no graph specified anywhere, using an alternate indexing scheme.

The times below are for the sequence of 5 queries. As there is a query in the set that specifies no condition on S or O and only P, thus cannot be done with the default indices With Virtuoso v5. With Virtuoso Cluster v6 it can, because v6 is more space efficient. So we added the index:
```
 create bitmap index rdf_quad_pogs on rdf_quad (p, o, g, s);

Virtuoso v5 with gspo, ogps, pogs 	Virtuoso Cluster v6 with gspo, ogps 	Virtuoso Cluster v6 with gspo, ogps, pogs
 
cold 	210 s 	136 s 	33.4 s

warm 	0.600 s 	4.01 s 	0.628 s

```

Now let us do it without a graph being specified. Note that alter index is valid for v6 or higher. For all platforms, we drop any existing indices, and:
```
 create table r2 (g iri_id_8, s, iri_id_8, p iri_id_8, o any, primary key (s, p, o, g))
 alter index R2 on R2 partition (s int (0hexffff00));

 log_enable (2);
 insert into r2 (g, s, p, o) select g, s, p, o from rdf_quad;

 drop table rdf_quad;
 alter table r2 rename RDF_QUAD;
 create bitmap index rdf_quad_opgs on rdf_quad (o, p, g, s) partition (o varchar (-1, 0hexffff));
 create bitmap index rdf_quad_pogs on rdf_quad (p, o, g, s) partition (o varchar (-1, 0hexffff));
 create bitmap index rdf_quad_gpos on rdf_quad (g, p, o, s) partition (o varchar (-1, 0hexffff));
```

The code is identical for v5 and v6, except that with v5 we use iri\_id (32 bit) for the type, not iri\_id\_8 (64 bit). We note that we run out of IDs with v5 around a few billion triples, so with v6 we have double the ID length and still manage to be vastly more space efficient.

With the above 4 indices, we can query the data pretty much in any combination without hitting a full scan of any index. We note that all indices that do not begin with s end with s as a bitmap. This takes about 60% of the space of a non-bitmap index for data such as DBpedia.

If you intend to do completely arbitrary RDF queries in Virtuoso, then chances are you are best off with the above index scheme.
```
Virtuoso v5 with gspo, ogps, pogs 	Virtuoso Cluster v6 with gspo, ogps, pogs

warm 	0.595 s 	0.617 s
```

The cold times were about the same as above, so not reproduced.

It is in the SPARQL spirit to specify a graph and for pretty much any application, there are entirely sensible ways of keeping the data in graphs and specifying which ones are concerned by queries. This is why Virtuoso is set up for this by default.

On the other hand, for the open web scenario, dealing with an unknown large number of graphs, enumerating graphs is not possible and questions like which graph of which source asserts x become relevant. We have two distinct use cases which warrant different setups of the database, simple as that.

The latter use case is not really within the SPARQL spec, so implementations may or may not support this.

Once the indices are right, there is no difference between specifying a graph and not specifying a graph with the queries considered. With more complex queries, specifying a graph or set of graphs does allow some optimizations that cannot be done with no graph specified. For example, bitmap intersections are possible only when all leading key parts are given.

The best warm cache time is with v5; the five queries run under 600 ms after the first go. This is noted to show that all-in-memory with a single thread of execution is hard to beat.

Cluster v6 performs the same queries in 623 ms. What is gained in parallelism is lost in latency if all operations complete in microseconds. On the other hand, Cluster v6 leaves v5 in the dust in any situation that has less than 100% hit rate. This is due to actual benefit from parallelism if operations take longer than a few microseconds, such as in the case of disk reads. Cluster v6 has substantially better data layout on disk, as well as fewer pages to load for the same content.

This makes it possible to run the queries without the pogs index on Cluster v6 even when v5 takes prohibitively long.

The purpose is to have a lot of RAM and space-efficient data representation.

For reference, the query texts specifying the graph are below. To run without specifying the graph, just drop the FROM <http://dbpedia.org> from each query. The returned row counts are indicated below each query's text.
```
 sparql SELECT ?p ?o FROM <http://dbpedia.org> WHERE {
  <http://dbpedia.org/resource/Metropolitan_Museum_of_Art> ?p ?o };

 -- 1337 rows

 sparql PREFIX p: <http://dbpedia.org/property/>
 SELECT ?film1 ?actor1 ?film2 ?actor2
 FROM <http://dbpedia.org> WHERE {
  ?film1 p:starring <http://dbpedia.org/resource/Kevin_Bacon> .
  ?film1 p:starring ?actor1 .
  ?film2 p:starring ?actor1 .
  ?film2 p:starring ?actor2 . };

 --  23910 rows

 sparql PREFIX p: <http://dbpedia.org/property/>
 SELECT ?artist ?artwork ?museum ?director FROM <http://dbpedia.org>
 WHERE {
  ?artwork p:artist ?artist .
  ?artwork p:museum ?museum .
  ?museum p:director ?director };

 -- 303 rows

 sparql PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
 PREFIX foaf: <http://xmlns.com/foaf/0.1/>
 PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
 SELECT ?s ?homepage FROM <http://dbpedia.org>  WHERE {
   <http://dbpedia.org/resource/Berlin> geo:lat ?berlinLat .
   <http://dbpedia.org/resource/Berlin> geo:long ?berlinLong .
   ?s geo:lat ?lat .
   ?s geo:long ?long .
   ?s foaf:homepage ?homepage .
   FILTER (
     ?lat        <=     ?berlinLat + 0.03190235436 &&
     ?long       >=     ?berlinLong - 0.08679199218 &&
     ?lat        >=     ?berlinLat - 0.03190235436 &&
     ?long       <=     ?berlinLong + 0.08679199218) };

 -- 56 rows

 sparql PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>
 PREFIX foaf: <http://xmlns.com/foaf/0.1/>
 PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
 PREFIX p: <http://dbpedia.org/property/>
 SELECT ?s ?a ?homepage FROM <http://dbpedia.org>  WHERE {
   <http://dbpedia.org/resource/New_York_City> geo:lat ?nyLat .
   <http://dbpedia.org/resource/New_York_City> geo:long ?nyLong .
   ?s geo:lat ?lat .
   ?s geo:long ?long .
   ?s p:architect ?a .
   ?a foaf:homepage ?homepage .
   FILTER (
     ?lat        <=     ?nyLat + 0.3190235436 &&
     ?long       >=     ?nyLong - 0.8679199218 &&
     ?lat        >=     ?nyLat - 0.3190235436 &&
     ?long       <=     ?nyLong + 0.8679199218) };

 -- 13 rows
<math>Insert formula here</math>
```