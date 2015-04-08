# Dataset #

The set of datasets used by the final openflydata release are:
  * Flybase: http://code.google.com/p/openflydata/wiki/FlyBaseMilestone3
  * BDGP: http://openflydata.org/dump/bdgp_images_20081030
  * FlyAtlas: http://openflydata.org/dump/flyatlas_20080916
  * FlyTED: http://openflydata.org/dump/flyted_20081203

All the datasets were loaded into `/mnt/tmp/`.

# Set up TDB store #

```

mkdir /mnt/data1
mkdir /mnt/data1/tdb
cd /mnt/data1


wget http://downloads.sourceforge.net/jena/TDB-0.6.0.zip?modtime=1225187084&big_mirror=0
ls
unzip TDB-0.6.0.zip 
ls
mv TDB-0.6.0 /usr/local
rm /usr/local/tdb
ln -s /usr/local/TDB-0.6.0 /usr/local/tdb

export TDBROOT=/usr/local/tdb
export PATH=$TDBROOT/bin:$PATH
chmod -R a+x /usr/local/tdb
tdbloader --help

#
# tdbloader looks ok, try loading
#
tdbloader --verbose --loc=/mnt/data1/tdb/flybase_genenames_20081017 /mnt/tmp/flybase-genenames-all-20081017-1.nt >> /var/log/tdbloader.20081030.log

```

# Set up SPARQLite #

## deploy sparqlite from war ##

  * http://sparqlite.googlecode.com/files/sparqlite-20090226-0.4-alpha4.war
  * http://code.google.com/p/sparqlite/wiki/InstallConfigureSparqlite04

```
### in tomcat/webapps/sparqlite-0.4-alpha/
unzip sparqlite-20090226-0.4-alpha4.war

```