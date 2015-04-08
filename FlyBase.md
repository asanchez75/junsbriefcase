# Recipe #
  1. create dump
    1. create a m.large instance
    1. create or attach a volume (~20G) to the instance
    1. using d2r dump-rdf to create RDF dump of FlyBase
  1. load dump
    1. create a m.xlarge instance
    1. create or attach a volume to the instance, with virtuoso installed
    1. create small RDF files to be loaded to the RDF store

# Create RDF data dump #

## create instance ##
# create a large 64-bit ubuntu instance through the console, such as ami-eef61587 (ami-87a243ee the more recent and better one June 21, 2011)

See also: http://alestic.com/

## create volume ##

fb20106: the small dump is ~2G and the full dump is ~12G.

Launch a volume based on the 40G snapshot snap-6240e509 and attach it to m.large instance through the console.

Log into the m.large instance and mount the volume to the instance:
```
mkdir /mnt/flybase-data-dump/

mount /dev/sdh/ /mnt/flybase-data-dump/
```

## create dump ##
```
# go to ./googlecode_openflydata_chado/utils/
# set paths
export D2RQROOT=/mnt/flybase-data-dump/d2r-server-0.7
export CHADOROOT=/mnt/flybase-data-dump/googlecode_openflydata_chado

# create dump, for example
./flybase-mini-dump.sh ../flybase-dump-fbyyyymm/ dbxref-vanilla.d2r.ttl

```

The dump has to be created table by table, because flybase restricts how many users can connect to the postgres server synchronously.

To create a small dump the script should set to:
```
echo "=== general module ==="
dump dbxref dbxref-vanilla-small
dump general general-vanilla-small

echo "=== organism module ==="
dump organism organism-vanilla

echo "=== sequence module ==="
dump synonym synonym-small
dump feature feature-type-small
dump featurelabel feature-label-small
dump synonymtype synonym-type-small
```

To create a full dump, the script should be set to:
```
echo "=== general module ==="
dump dbxref dbxref-vanilla
dump general general-vanilla

echo "=== organism module ==="
dump organism organism-vanilla

echo "=== sequence module ==="
dump synonym synonym
dump feature feature-type
dump featurelabel feature-label
dump synonymtype synonym-type

```

# Load FlyBase on an XL Instance #

## Create an instance ##

## Attach volume ##

## Load data ##
### Install screen ###
```
cp /etc/apt/sources.list /etc/apt/sources.list.bk

less /etc/apt/sources.list
```

### add the following lines to the file
```
deb http://us.archive.ubuntu.com/ubuntu/ jaunty universe
deb-src http://us.archive.ubuntu.com/ubuntu/ jaunty universe
deb http://us.archive.ubuntu.com/ubuntu/ jaunty-updates universe
deb-src http://us.archive.ubuntu.com/ubuntu/ jaunty-updates universe

deb http://us.archive.ubuntu.com/ubuntu/ jaunty multiverse
deb-src http://us.archive.ubuntu.com/ubuntu/ jaunty multiverse
deb http://us.archive.ubuntu.com/ubuntu/ jaunty-updates multiverse
deb-src http://us.archive.ubuntu.com/ubuntu/ jaunty-updates multiverse
```

```
sudo apt-get update
apt-get install screen
```

### Mount volume ###
```
mkdir /mnt/arrayexpress-tdb/

sudo modprobe xfs
sudo apt-get install xfsprogs
sudo mkfs.xfs /dev/sdi 

mount /dev/sdh/ /mnt/arrayexpress-tdb/

mkdir /mnt/arrayexpress-tdb/arrayexpress-data/20110621

mkdir /mnt/arrayexpress-tdb/tdb

mkdir /mnt/arrayexpress-tdb/indexes

mkdir /mnt/arrayexpress-tdb/lucene-subjects

mkdir /mnt/arrayexpress-tdb/lucene-literals
```

### Install java ###
```
sudo apt-get install sun-java6-jdk
```
### Install milarq ###
```
scp -i id_rsa-gsg-keypair milarq-201102-FM3.tar.gz root@ec2-50-17-150-17.compute-1.amazonaws.com:/mnt/

scp -i id_rsa-gsg-keypair googlecode-milarq-20110104.tar.gz root@ec2-50-17-150-17.compute-1.amazonaws.com:/mnt/

```
### Load data in screen ###
```
# start up virtuoso
/mnt/virtuoso/bin/virtuoso-t
# check virtuoso is up
less virtuoso.log
ps aux | grep virtuoso
```

```
#Create an empty file with name: flybase-dbxref-vanilla-small.ext.graph

cd /mnt/flybase-data-dump/flybase-dump-fb201006-small/

apt-get install emacs

emacs flybase-dbxref-vanilla-small.ext.graph

or

#Create an empty file with name: global.graph

cd /mnt/flybase-data-dump/flybase-dump-fb201006-small/

emacs global.graph

# adding the graph IRI in the file
http://purl.org/net/dataset/flybase-201006

#Register the RDF data file with graph IRI 

SQL>ld_dir ('/mnt/flybase-data-dump/flybase-dump-fb201006-small/', 'flybase-general-vanilla-small.nt', 'http://purl.org/net/dataset/flybase-201006');

SQL>ld_dir ('/mnt/flybase-data-dump/flybase-dump-fb201006-small/', '*.nt', 'http://purl.org/net/dataset/flybase-201006');

# then execute
SQL>rdf_loader_run ();
```



# Sandbox #
```
# create an extra large instance through the console
# create a volume of 40GB and attach it to the instance through the console
# format the volume to make it available for the instance
sudo modprobe xfs
sudo apt-get install xfsprogs
sudo mkfs.xfs /dev/sdi 

echo "/dev/sdi /media/virtuoso xfs noatime 0 0" | sudo tee -a /etc/fstab
sudo mkdir /media/virtuoso
sudo mount /media/virtuoso 

sudo mount /dev/sdh /mnt/data-store

# install virtuoso on /media/virtuoso

#### load flybase data using isql
#### see http://www.openlinksw.com/dataspace/dav/wiki/Main/VirtBulkRDFLoader
```

# Create a snapshot of the volume #
```
### to make the volume available for a small instance
### stop the virtuoso service
lsof aux | grep virtuoso
### umount the disk
umount /mnt/virtuoso
### create a snapshot of the volume
ec2-create-snapshot volume_id
### describe a snapshot
ec2-describe-snapshots snap-78a54011
ec2-describe-snapshot-attribute snap-78a54011
```

# Attach the volume to a small instance #
```
## create another small instance of open-biomed
## create a volume using the snapshot

## attach the volume to the instance

## check virtuoso works and query works

The virtuoso configuration file has to be changed to point to the data store in the attached volume, because the virtuoso software on the volume is compile for 64-bit machine and cannot be directly launched by the small instance.
```

Note: it's always a good idea to use the XL instance to load and index the data, and to create new snapshots and volumes for the small instance to use.