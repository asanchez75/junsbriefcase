# Queries to FlyBase DB #

By the time of writing, the official realease of FlyBase is Release 2009-03, more recent than the data harvested in our RDF DB.

See also:
  * http://imageweb.zoo.ox.ac.uk/wiki/index.php/Flyweb/Gene_Name_Synonyms
  * http://code.google.com/p/openflydata/source/browse/#svn/tags/chado-20090311-FM3-RC2/modules/pub (publication metadata only)
  * http://code.google.com/p/openflydata/source/browse/tags/chado-20090311-FM3-RC2/modules/sequence/flybase/sequence-vanilla-all.d2rq.ttl (linking features with publications)


Access FlyBase Chado database (PostgreSQL)
```
hostname: flybase.org
port: 5432
username: flybase
password: (no password)
database name: flybase
```

or
```
psql -h flybase.org -U flybase flybase
```

# Query for Gene FBgn0015799 #
## Search in the feature\_pub and pub tables ##

```
select feature.uniquename, feature_pub.feature_id, pub.pub_id
from feature_pub, pub, feature
where feature_pub.pub_id = pub.pub_id and feature.feature_id = feature_pub.feature_id and feature.uniquename = 'FBgn0015799'
```

162 records were returned. Some of them might be new records added since February.

Query to FlyBase Site Release2009-02 returns 160 records. New references are:
  * http://flybase.org/cgi-bin/fbidq.html?FBrf0202994
  * http://flybase.org/cgi-bin/fbidq.html?FBrf0205083

Query to FlyBase RDF SPARQL endpoint updated in 2009-02 returns 159 records. The missed reference is:
  * http://flybase.org/reports/FBrf0057329.html (flybase:pub\_id=>2189960)

Very strange! This record is not in the database for this gene, using the above query!
This means that, to get all the records for this gene, we might need to query other publication-relevant tables.

## Search in other tables for Gene FBgn0015799 ##
```
### search in the featureloc_pub table

select *
from featureloc_pub
where featureloc_pub.pub_id = '2189960'

### 0 rows returned

```

```
### search in the featuremap_pub table

select *
from featuremap_pub
where featuremap_pub.pub_id = '2189960'

### 0 rows returned

```


```
### search in the expression_pub table

select *
from expression_pub
where expression_pub.pub_id = '2189960'

### 0 rows returned

```


```
### search in the featureprop_pub, featureprop, and feature tables

SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and featureprop_pub.pub_id='218960'

### 23 rows returned
```


The feature property relating to the gene "FBgn0015799" is "polyclonal":

```
"featureprop_id";"feature_id";"type_id";"value";"rank";"featureprop_pub_id";"featureprop_id";"pub_id";"feature_id";"dbxref_id";"organism_id";"name";"uniquename";"residues";"seqlen";"md5checksum";"type_id";"is_analysis";"timeaccessioned";"timelastmodified";"is_obsolete"
2288675;3084941;60035;"polyclonal";0;402500;2288675;218960;3084941;58047;1;"Rbf";"FBgn0015799";"";4370;"";219;f;"2003-12-01 16:53:34.014597";"2003-12-01 16:53:34.014597";f

```


The "antibody" section in FlyBase section clearly shows how this citation is associated with this Gene, although this is not clearly stated by the "Data from Reference" section in the page http://fb2009_02.flybase.org/reports/FBrf0057329.html.

```
### search in the feature_relationship_pub, featurerelationship, and feature tables

select r.*, p.*, f.uniquename, f.feature_id
from feature_relationship as r, feature_relationship_pub as p, feature as f
where r.feature_relationship_id = p.feature_relationship_id and p.pub_id = '218960' and f.feature_id = r.object_id 

### 4 rows returned, but none relates to our gene

select r.*, p.*, f.uniquename, f.feature_id
from feature_relationship as r, feature_relationship_pub as p, feature as f
where r.feature_relationship_id = p.feature_relationship_id and p.pub_id = '218960' and f.feature_id = r.subject_id 

### 4 rows returned, but none relates to our gene
```

## Query SPARQL to test whether featureprop is present in the KB ##
By reading the D2R mapping files, it shows that this is not present in the KB.

# Summary of query for genes with missing results #
| Gene name | FlyWeb widget | FlyBase site 2009-02 | Missing reference | FlyBase DB 2009-03 |
|:----------|:--------------|:---------------------|:------------------|:-------------------|
| FBgn0015799 | 159 | 160 | FBrf0057329 (2189960) | 162 (2 updates, 1 unattributed, actually 159), +1 from featureprop\_pub |
| FBgn0024285 |22 |23 | FBrf0204101 (348205) | 22, +1 from feature\_relationship |
| FBgn0002838 (FBgn0039460)| 34  | 35  | FBrf0105495 (150339) | 34, |
| FBgn0027279 (FBgn0031192, FBgn0052502)| 13  | 15  | FBrf0105495 (150339), FBrf0174215 (150340) | 13, |
| FBgn0000577 | 1462  |1465   |    | 1471 (todo: too many to eyeball) |
| FBgn0003996 | cannot be finished |3625 |  | 3633 (todo: too many to eyeball) |

For the last two genes, I searched in every possible table and could not find the expected publication records. Note that, these missing publication records are also marked as pink in FlyBase's web site. Maybe it would be worthwhile to communicate with the team to understand why they are being marked as pink on the web site.


```

### query for FBgn0024285 in the featureprop_pub, featureprop, and feature tables

SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and featureprop_pub.pub_id='218960' and feature.uniquename = 'FBgn0015799'

### 3 rows returned

2288675;3084941;60035;"polyclonal";0;402500;2288675;218960;3084941;58047;1;"Rbf";"FBgn0015799";"";4370;"";219;f;"2003-12-01 16:53:34.014597";"2003-12-01 16:53:34.014597";f

7057887;3084941;100099;"797 (aa); 95 (kD observed)";1;1557151;7057887;218960;3084941;58047;1;"Rbf";"FBgn0015799";"";4370;"";219;f;"2003-12-01 16:53:34.014597";"2003-12-01 16:53:34.014597";f

7060218;3084941;100090;"2.593 (unknown)";1;1559482;7060218;218960;3084941;58047;1;"Rbf";"FBgn0015799";"";4370;"";219;f;"2003-12-01 16:53:34.014597";"2003-12-01 16:53:34.014597";f


```

```
## query for FBgn0024285 

select r.*, p.*, f.uniquename, f.feature_id, cvterm.*, cv.name
from feature_relationship as r, feature_relationship_pub as p, feature as f, cvterm, cv
where r.feature_relationship_id = p.feature_relationship_id and r.type_id = cvterm.cvterm_id and cvterm.cv_id = cv.cv_id and p.pub_id = '348205' and f.feature_id = r.subject_id and f.uniquename = 'FBgn0024285'

### result
7082425;4553722;11487309;59983;0;"";1547532;7082425;348205;"FBgn0024285";4553722;59983;4;"";1663273;0;0;"associated_with";"relationship type"
```

```
## query for FBgn0002838 

select r.*, p.*, f.uniquename, f.feature_id
from feature_relationship as r, feature_relationship_pub as p, feature as f, pub
where r.feature_relationship_id = p.feature_relationship_id and f.feature_id = r.subject_id and f.uniquename = 'FBgn0002838' and p.pub_id = '150339'

### result
0 rows returned

SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature, pub
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and feature.uniquename = 'FBgn0002838' and featureprop_pub.pub_id = '150339'


### result
0 rows returned

```

```
## query for FBgn0027279

select r.*, p.*, f.uniquename, f.feature_id
from feature_relationship as r, feature_relationship_pub as p, feature as f, pub
where r.feature_relationship_id = p.feature_relationship_id and f.feature_id = r.subject_id and f.uniquename = 'FBgn0027279' and p.pub_id = '150339'

### result
0 rows returned

select r.*, p.*, f.uniquename, f.feature_id
from feature_relationship as r, feature_relationship_pub as p, feature as f, pub
where r.feature_relationship_id = p.feature_relationship_id and f.feature_id = r.subject_id and f.uniquename = 'FBgn0027279' and p.pub_id = '150340'

### result
0 rows returned

```

```
## query for FBgn0027279

SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature, pub
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and feature.uniquename = 'FBgn0027279' and featureprop_pub.pub_id = '150339'


### result
0 rows returned

SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature, pub
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and feature.uniquename = 'FBgn0027279' and featureprop_pub.pub_id = '150340'


### result
0 rows returned
```


# Search for publication record 150339 #
## Search in the feature\_relationship\_pub table ##
```
select p.pub_id, f.uniquename, r.*
from feature_relationship_pub as p, feature_relationship as r, feature as f 
where p.pub_id='150339' and p.feature_relationship_id = r.feature_relationship_id and r.subject_id = f.feature_id and f.uniquename ='FBgn0027279'

###
0 rows returned

```

## Search in the feature\_relationshipprop\_pub table ##
```
select *
from feature_relationshipprop_pub as p, feature_relationshipprop as r, feature_relationship as rr, feature as f
where p.pub_id = '150339' and r.feature_relationshipprop_id = p.feature_relationshipprop_id and r.feature_relationship_id = rr.feature_relationship_id and rr.subject_id = f.feature_id

### nothing for my genes
```


## Search in the featureprop\_pub table ##
```
SELECT featureprop.*, featureprop_pub.*, feature.*
  FROM featureprop_pub, featureprop, feature
where featureprop_pub.featureprop_id = featureprop.featureprop_id and feature.feature_id = featureprop.feature_id and featureprop_pub.pub_id='150339'

### nothing for my genes

```


## Search in the phendesc and feature\_genotype table ##
```
select f.uniquename, p.*
from phendesc as p, feature_genotype as fp, feature as f
where pub_id = '150339' and p.genotype_id = fp.genotype_id and fp.feature_id = f.feature_id

### nothing for my genes
```


## Search in the phenstatement and feature\_genotype table ##
```
select f.uniquename
from phenstatement as p, feature_genotype as fp, feature as f
where p.pub_id = '150339' and p.genotype_id = fp.genotype_id and fp.feature_id = f.feature_id

### nothing for my genes
```

## Search in the phenotype\_comparison and feature\_genotype table ##
```
select f.uniquename
from phenstatement as p, feature_genotype as fp, feature as f
where p.pub_id = '150339' and p.genotype_id = fp.genotype_id and fp.feature_id = f.feature_id

### nothing for my genes
```



# All possible tables relevant to publications #
  * expression\_pub
  * feature\_pub
  * feature\_cvterm
  * feature\_pubprop
  * feature\_relationship\_pub (#)
  * feature\_relationshipprop\_pub (#)
  * feature\_synonym
  * featureprop\_pub (#)
  * featureloc\_pub
  * featuremap\_pub
  * library\_pub
  * libraryprop\_pub
  * library\_synonym
  * library\_cvterm
  * pubprop
  * pub\_dbxref
  * pub\_relationship
  * stock\_pub
  * stockprop\_pub
  * stock\_relationship\_pub
  * stock\_cvterm
  * phendesc (feature\_genotype) (#)
  * phenotype\_comparison
  * phenstatement (#)

Tables marked with (#) mean that they do not return results for the above two genes, while those not marked means that they do not contain any info about those two publication records.

The following tales no longer exist in Flybase r.2009-03
  * protocol
  * phenotype\_comparison\_cvterm
  * study
  * phylotreee\_pub
  * phylonode\_pub