# Generate process #
## For starting up ##
  1. get an amazon account for the web services, EC2 and S3
  1. experiment launching instances through the web-based management console, so that you can have some default security setting for your account
  1. install the ec2 command line tool on your local machine
  1. follow the gettingstartedguide to 1) create your keypair, 2) run an instance using a public image, 3) access your instance through http and ssh, 4) customize your instance such as its security level, and 5) finally, terminate your instance.

Note:
  * terminate the instance whenever you can since you are billed whenever you have a running instance.

## For creating your own image ##
  1. find an image with your favorite OS or including your favorite software systems
  1. launch an instance of such an image
  1. customize the instance, finish as much as you can in one way
  1. create a bundle of the instance and register it as your own image, which you can start from the next time by launching an instance of this image

Note:
  * try to configure access to the instance before making it public
  * need to have an elastic storage volume to keep the data persistent

## For having a public server using your image ##
  1. do all above
  1. allocate an elastic IP address to the instance

Note:
  * we can launch different types of instances for one image, allowing us to use a larger instance to perform demanding tasks
  * to preserve modifications to the instance, we need to create a bundle and register a new image; otherwise the change would be lost.

# Create a test image #
```
########################################################################################
######## 2009-11-24
########
######## work to create an EC2 image for open-biomed
########################################################################################
## assume we already have AWS account, and have signed up for S3 and EC2
## we have launched an image through the web-based console
## now we try to ssh into this EC2 instance ec2-79-125-34-108.eu-west-1.compute.amazonaws.com
#
ssh -i id_rsa-gsg-keypair root@ec2-79-125-34-108.eu-west-1.compute.amazonaws.com
ssh -i ec2-for-flykit-2009.pem root@ec2-79-125-34-108.eu-west-1.compute.amazonaws.com
chmod 600 ec2-for-flykit-2009.pem 
ssh -i ec2-for-flykit-2009.pem root@ec2-79-125-34-108.eu-west-1.compute.amazonaws.com
## it worked
##
############################################
######## USE COMMAND-LINE TOOL TO CONTROL AMI
############################################
#### setup EC2 tools
## set up java home
#
export JAVA_HOME=/usr/bin/java
#
#### set up home for the ec2 command-line tool
#
export EC2_HOME=/home/zhaoj/kit/ec2-api-tools-1.3-42584/
echo $EC2_HOME 
export PATH=$PATH:$EC2_HOME/bin
#
#### create .ec2 directory for keeping the keys
#
mkdir .ec2
mv *.pem ~./ec2/
#
#### set up paths for the keys
#
export EC2_PRIVATE_KEY=~/.ec2/pk-XXXX.pem
export EC2_CERT=~/.ec2/cert-XXXX.pem
echo $JAVA_HOME
#
## All worked!!
############################################
####### try launching an AMI
############################################
#### list all available AMIs
#
ec2-describe-images -o self -o amazon
#
#### check which version of tools
#
echo $EC2_HOME 
ec2-version
#
## using api version 2009-08-15
## found docs at http://docs.amazonwebservices.com/AWSEC2/2009-08-15/GettingStartedGuide/
#
#### try launching an instance
#
ec2-describe-images -o self -o amazon
#
#### find a suitable AMI
#
ec2-describe-images -o self -o amazon | grep machine
#
#### try to find image identified by ec2-public-images/getting-started.manifest.xml in the third column
## in this case: ami-3c47a355
#
#### generate a key pair
#
ec2-add-keypair ec2openbiomed-keypair
emacs id_rsa-gsg-keypair
less id_rsa-gsg-keypair
chmod 600 id_rsa-gsg-keypair 
ls -l id_rsa-gsg-keypair
# 
#### launch an instance of an AMI
#
ec2-run-instances ami-3c47a355 -k ec2openbiomed-keypair
#
## INSTANCE i-41f89229 ami-3c47a355 pending ec2openbiomed-keypair 0 m1.small 2009-11-24T11:43:59+0000
#### check the status
#
ec2-describe-instances i-41f89229
#
#### check out in web browser http://ec2-75-101-194-85.compute-1.amazonaws.com
## it didn't work!
#### authorize network access to the instance
#
ec2-authorize default -p 22
ec2-authorize default -p 80
#
## now http acccess worked!
#
#### check SSH HOST KEY FINGERPRINTS for a public AMI not bundled
#
ec2-get-console-output i-41f89229
#
#### try to ssh to the instance
#
ssh -i id_rsa-gsg-keypair root@ec2-75-101-194-85.compute-1.amazonaws.com/
ssh -i id_rsa-gsg-keypair root@ec2-75-101-194-85.compute-1.amazonaws.com
#
## it all worked!
```

## Create the customized image for open-biomed ##
```
## assume that keypair for open-biomed has been generated openbiomed-keypair and put in the right place and give the right access right
#### create an instance of ubuntu 9.01 jaunty 32-bit server, created by Eric Hammond:  ami-ccf615a5
#
ec2-run-instances ami-ccf615a5 -k openbiomed-keypair --instance-type m1.small
#
#### check the status of instance i-656d190d
#
ec2-describe-instances i-656d190d
#
## instance running at ec2-72-44-34-80.compute-1.amazonaws.com
#### ssh to instance ec2-72-44-34-80.compute-1.amazonaws.com
#
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-72-44-34-80.compute-1.amazonaws.com
#
## apache was then installed on the instance
```
### Bundle the image ###
```
#### copy key and certificate to the machine to be bundled.
#
scp -i .ec2/id_rsa-openbiomed-keypair .ec2/pk-XXXX.pem .ec2/cert-XXXX.pem root@ec2-72-4
4-34-80.compute-1.amazonaws.com:/mnt
## copy to /mnt to prevent them being bundled with the new AMI
#### start the bundle
#
## now use AWS account ID as username to bundle
#
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-72-44-34-80.compute-1.amazonaws.com
## follow the instruction in the GettingStartedGuide to create the bundle
# http://docs.amazonwebservices.com/AWSEC2/2009-08-15/GettingStartedGuide/
## the bundle is successfully uploaed and ready for register
## bucket name open-biomed-bucket/open-biomed-rdf
#
## ssh in to see whether it worked
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-72-44-34-80.compute-1.amazonaws.com
## ssh worked; now register the bundle as my EC2 image
##
ec2-register open-biomed-bucket/image.manifest.xml
## got image ami-10fc1e79
#### start an instance of this image
#
ec2-run-instances ami-10fc1e79
#### check the status of the instance
#
ec2-describe-instances i-73582c1b
#### check instance running at ec2-75-101-206-234.compute-1.amazonaws.com
## it works
#### ssh to the instance
#
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-75-101-206-234.compute-1.amazonaws.com
## ssh worked
ec2-describe-instances
#### copy keys to the new instance
scp -i .ec2/id_rsa-openbiomed-keypair .ec2/pk-XXXX.pem .ec2/cert-XXXX.pem root@ec2-75-101-206-234.compute-1.amazonaws.com:/mnt
#### terminate the old instance
#
ec2-terminate-instances i-656d190d
ec2-describe-instances
## terminated the old instance
## end of the session 
```

# set up virtuoso on ec2 #
```
##############################
##### ec2 work on open-biomed on 2009-11-25
##### start to set up virtuoso on ec2
##############################
#### first, create a new EBS volume
#### following docs at http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/ (API version 2009-08-15)
#
# what availability zone?
#
ec2-describe-availability-zones 
#
# let's use us-east-1a
#
# create a 10GiB volume
#
ec2-create-volume --size 10 --zone us-east-1a
ec2-create-volume --size 10 -z us-east-1a
## VOLUME  vol-8dcd35e4    10              us-east-1a      creating        2009-11-25T11:57:12+0000
#### try to attach volume
## to instance: i-73582c1b; vol: vol-8dcd35e4 
ec2-describe-instances
ec2-attach-volume vol-8dcd35e4 -i i-73582c1b -d /dev/sdh
## the instance is not in the same zone. so have to terminate the old instance and start a new one
## terminate the instance
ec2-terminate-instances i-73582c1b
## check status of instances
ec2-describe-instances
## instance i-73582c1b is terminated
## launch a new instance in the zone of us-east-1a
ec2-run-instances -z us-east-1a ami-10fc1e79
#### check the status of the instance of i-1fbdc977
ec2-describe-instances i-1fbdc977
#### try again to attach the volume
ec2-attach-volume vol-8dcd35e4 -i i-1fbdc977 -d /dev/sdh
## attachees volume vol-8dcd35e4 to instance i-1fbdc977 and exposes it as device /dev/sdh
## ATTACHMENT      vol-8dcd35e4    i-1fbdc977      /dev/sdh        attaching       2009-11-25T14:37:55+0000
ec2-describe-volumes
## VOLUME  vol-8dcd35e4    10              us-east-1a      in-use  2009-11-25T11:57:12+0000
ATTACHMENT      vol-8dcd35e4    i-1fbdc977      /dev/sdh        attached        2009-11-25T14:37:55+0000
ec2-describe-instances
## all looks good
## ok, now log in to instance to do further work...
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-75-101-170-147.compute-1.amazonaws.com
## ssh connection worked
## next upload open-biomed related data to the instance
scp - .ec2/id_rsa-openbiomed-keypair open-biomed-data/flyatlas-dataset-all-20090519.ttl root@ec2-75-101-170-147.compute-1.amazonaws.com:/mnt/tmp
scp -i .ec2/id_rsa-openbiomed-keypair open-biomed-data/flyatlas-dataset-all-20090519.ttl root@ec2-75-101-170-147.compute-1.amazonaws.com:/mnt/tmp
scp -i .ec2/id_rsa-openbiomed-keypair open-biomed-data/flyatlas_probe2gene_20090923.nt root@ec2-75-101-170-147.compute-1.amazonaws.com:/mnt/tmp
scp -i .ec2/id_rsa-openbiomed-keypair open-biomed-data/flyted-full-dump-2009-11-18.ttl root@ec2-75-101-170-147.compute-1.amazonaws.com:/mnt/tmp
scp -i .ec2/id_rsa-openbiomed-keypair open-biomed-data/flyted2flybase_20090715.nt root@ec2-75-101-170-147.compute-1.amazonaws.com:/mnt/tmp
#### start to ssh in in order to set up virtuoso
ssh -i .ec2/id_rsa-openbiomed-keypair root@ec2-75-101-170-147.compute-1.amazonaws.com
```

```
### created a new image to preserve today's work
### now I have two images but no instances running
### images: ami-10fc1e79(basic); ami-cec123a7 (with virtuoso store)
```

# obtain and associate elastic IP for open-biomed #
```
### see documents at: http://docs.amazonwebservices.com/AWSEC2/latest/UserGuide/
### ssh to my instance to check its public and private IP addresses
#
ifconfig eth0
curl http://169.254.169.254/latest/meta-data/local-ipv4
curl http://169.254.169.254/latest/meta-data/public-ipv4
#
#### allocate a new IP address for use 
#
ec2-allocate-address
## ADDRESS: ********
#### map the instance to this IP address
#
ec2-associate-address -i i-debf14b7 75.101.163.187
ec2-describe-addresses
#
#### de-assocaite an instance with the address, in order to launch a larger instance, for example
#
ec2-run-instances ami-6ba54002 -n 1 --availability-zone us-east-1a 
ec2-disassociate-address 75.101.163.187
ec2-describe-addresses
ec2-associate-address -i i-3ea74257 67.202.55.255
ec2-terminate-instances i-4bc32334
#
##### all set. ready to redirect the open-biomed dns to this new address, before doing the following 
#####
##### do some security configuration with the current instance
##### create a snap shot of the current volume and delete the old snapshot
##### delete the old image open-biomed-bucket
##### create and register a new image based on the current instance
```

# Set up the instance #
## Install Apache ##
```
##### install apache on ubuntu ami
##### check and configure the locations for apt-get
##### see document at: https://help.ubuntu.com/community/Repositories/CommandLine
#### see whether the addition locations works
sudo apt-get update
sudo apt-get update
sudo apt-get install emacs
#### install apache http://www.howtogeek.com/howto/ubuntu/installing-php5-and-apache-on-ubuntu/
sudo apt-get install apache2
sudo /etc/init.d/apache2 restart
#### enable modules
{{{
a2enmode module_name
}}}
or edit http.conf file by adding a line like
{{{
LoadModule mod_rewrite /usr/lib/apache2/modules/mod_rewrite.so
}}}

```

## Install Tomcat ##
See notes at: http://www.howtogeek.com/howto/linux/installing-tomcat-6-on-ubuntu/

It can also be installed using apt-get
```
sudo apt-get install tomcat6
```

# Old logs during FlyWeb project #
## Set the account ##
  * set up a ssh key for my user account
> ssh-keygen -q -f ./.ssh/openflydata\_id\_rsa -t rsa

  * copy ssh key to the remote ec2 server
> ssh-copy-id -i ./.ssh/openflydata\_id\_rsa.pub jun@openflydata.org

  * log in the ec2 server using a local key
> ssh -i .ssh/openflydata\_id\_rsa jun@openflydata.org

# EC2/Load RDF data into TDB on EC2 #
I have not tried to load data into TDB yet. The following notes show me how to set up a tdb store and a sparql endpoint for a dataset on openflydata.org of EC2.

  * log in the ec2 server using a local key

I have to be user zhaoj and go to my home directory to run the following command:
```
 ssh -i .ssh/openflydata_id_rsa jun@openflydata.org
```

Then following the instruction at: http://code.google.com/p/openflydata/wiki/RecipeTdbLoadData

I need the root password to do all these [sticker](pink.md).

  * Configure the TDB store: http://code.google.com/p/openflydata/wiki/RecipeSparqliteCreateTdbEndpoint
```
(stats
  (meta
    (timestamp "2008-12-03T16:33:52.695+00:00"^^<http://www.w3.org/2001/XMLSchema#dateTime>)
    (run@ "2008/12/03 16:33:52")
    (count 39600))
  (<http://purl.org/net/flyted/schema/objective> 2484)
  (<http://purl.org/net/flyted/schema/probeConcentration> 2596)
  (<http://purl.org/net/flyted/schema/optivar> 2484)
  (<http://purl.org/net/flyted/schema/apical> 2403)
  (<http://www.w3.org/1999/02/22-rdf-syntax-ns#type> 4278)
  (<http://purl.org/net/flyted/schema/cMount> 2585)
  (<http://purl.org/net/flyted/schema/expression> 5389)
  (<http://www.w3.org/2000/01/rdf-schema#label> 3437)
  (<http://purl.org/net/flyted/schema/probe> 2596)
  (<http://purl.org/net/flyted/schema/stage> 2596)
  (<http://www.w3.org/2000/01/rdf-schema#seeAlso> 2596)
  (<http://purl.org/net/flyted/schema/hybridisesTranscriptOf> 821)
  (<http://purl.org/net/flyted/schema/thumbnail> 2596)
  (<http://purl.org/net/flyted/schema/genotype> 2739))
```