You can access the latest RDF-TCM through the following SPARQL endpoints:
  * http://hcls.deri.org/sparql, through the graph of http://hcls.deri.org/resource/graph/tcm
  * http://www.open-biomed.org.uk/sparql, through the graph of http://purl.org/net/data/tcm/tcm-20090619

The dataset is free for academic use and available under Creative Commons Attribution License. Please cite the original work published in BMC Complementary and Alternative Medicine when re-using the data.


The first SPARQL endpoint is more stable and performs faster than the second one.


See also: http://code.google.com/p/junsbriefcase/wiki/TGDdataset

# Data Ontology for the RDF TCM Dataset #
| Classes |       |
|:--------|:------|
|         | Disease |
|         | Medicine|
|         | Gene    |
|         | Ingredient|
|         | Effect|
|         | Statistics (added for [R3](https://code.google.com/p/junsbriefcase/source/detail?r=3)) |
|         | Association(added for [R3](https://code.google.com/p/junsbriefcase/source/detail?r=3)) |

Object properties as by Release 2.
|  Object Properties | Domain | Range | Dataset |
|:-------------------|:-------|:------|:--------|
| gene | Disease | Gene | TCM\_gene\_disease\_associations.tab |
| medicine | Disease | Medicine | TCM\_gene\_disease\_associations.tab |
| contextAssociation| Medicine| Gene| TCM\_gene\_disease\_associations.tab |
| ingredient | Medicine | Ingredient | TCM\_ingredient\_associations.tab |
| association | Medicine | Gene | TCM\_gene\_associations.tab |
| effect | Medicine | Effect | TCM\_effect\_associations.tab |
| treatment | Medicine | Disease | TCM\_disease\_associations.tab |


Object properties as in Release 3.
|  Object Properties | Domain | Range | Dataset |
|:-------------------|:-------|:------|:--------|
| contextAssociation | Association | Gene/Disease/Medicne | TCM\_gene\_disease\_associations.tab |
| ingredient | Medicine | Ingredient | TCM\_ingredient\_associations.tab |
| association | Medicine | Gene | TCM\_gene\_associations.tab |
| effect | Medicine | Effect | TCM\_effect\_associations.tab |
| treatment | Medicine | Disease | TCM\_disease\_associations.tab |
| source | Statistics | Ingredient/Gene/Disease/Medicne/Effect | All |

## Modelling the t-value properties ##
|  Data Properties | Dataset |
|:-----------------|:--------|
| medicine\_gene\_disease\_association\_tvalue |TCM\_gene\_disease\_associations.tab|
| medicine\_ingredient\_association\_tvalue | TCM\_ingredient\_associations.tab |
| medicine\_gene\_association\_tvalue | TCM\_gene\_associations.tab |
| medicine\_effect\_association\_tvalue | TCM\_effect\_associations.tab|
| medicine\_disease\_tvalue |TCM\_disease\_associations.tab|

The domain of these properties are all ''Statistics''.

Since [R3](https://code.google.com/p/junsbriefcase/source/detail?r=3), the domain of these properties is tcm:Statistics and the range is a xsd:float value.

## Data dumps ##
Notice: there is a server move on the weeks of  26 June - 3 July, 2009
### Release 3 ###
  * http://www.open-biomed.org.uk/tcmdata/tcm_rdf_data_release3_190609_ttl.tar.gz

Statistics about the data:
  * Number of triples: 111,021
  * Number of outgoing links: 3,438
  * Number of genes: 945
  * Number of herbs: 848
  * Number of ingredients: 1064
  * Number of diseases: 553
  * Number of effects: 241

### Release 2 ###
  * http://purl.oclc.org/NET/tcm/tcm_rdf_data_release2_270409.tar.gz
  * http://purl.oclc.org/NET/tcm/tcm_rdf_data_release2_270409_ttl.tar.gz

See also http://esw.w3.org/topic/DataSetRDFDumps

# Link Datasets #
  * Mapping genes to Extrez genes: 944 links
  * Mapping disease names to DBpedia: 255 links
  * Mapping disease names to Diseasesome: 63 (from 38 links)
  * Mapping disease names to Sideeffect: 171 (from 149 links)
  * Mapping genes to DBpedia: 649 links
  * Mapping genes to Diseasesome: 313 (from 96 links)
  * Mapping genes to Drugbank: 384 (from 238 links)
  * Mapping ingredient names to Dailymed: 21 links
  * Mapping herb/specie names to DBpedia: 438 links

## Map RDF-TCM to STITCH dataset ##
STITCH (http://stitch.embl.de/) "is a resource to explore known and predicted interactions of chemicals and proteins. Chemicals are linked to other chemicals and proteins by evidence derived from experiments, databases and the literature." Its data dumps can be downloaded under the license of CreatedCommons Attribution 3.0 (http://creativecommons.org/licenses/by/3.0/) and Attribution-Noncommercial-Share Alike 3.0 (http://creativecommons.org/licenses/by-nc-sa/3.0/).

**The database is still up to periodical updates.**

TCM genes are associated with:
  * Gene Ontology annotations
  * cross reference to PharmaGKB and STITCH
  * Integrated protein interaction and pathway information from HPRD
  * Pathway information from KEGG, NetPath and CGAP/BioCarta

## Map RDF-TCM to PharmGKB ##
There is one RDF PharmGKB hosted by Bio2RDF at: http://bio2rdf.semanticscience.org:8017/sparql.

An example gene record: http://bio2rdf.org/pharmgkb:PA334; http://www.pharmgkb.org/views/index.jsp?objCls=Gene&objId=PA334

# Example SPARQL Queries #
## Find all the genes associated with Alzheimer's disease ##
```
 PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
 PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
 select distinct ?gene
 where {<http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> tcm:gene ?gene. }
```

```
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/IL6
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/MAPK1
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/MAPT
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/CREB1
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/ADAMTS2
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/TNF
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/IL1B
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/NFKB1
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/CASP3
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/CCND1
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/ACHE
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/APLP2
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/ERBB2
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/AGPS
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/APP
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/TTR
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/gene/APOE
```

## Find all the genes and herbs associated with Alzheimer's disease and the t-value of the association ##
```
PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?gene ?medicine ?tvalue
where {
    <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> tcm:gene ?gene ; tcm:medicine ?medicine.
    ?medicine tcm:medicine_gene_disease_association_tvalue ?tvalue .
}
order by ?tvalue
```



## Find all the tcm medicines that can treat Alzheimer's disease ##
```
 PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
 PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
 select distinct ?medicine
 where {?medicine tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease>}
```

```
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Prunus_persica>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Angelica_gigas>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Evodia_rutaecarpa>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Nardostachys_jatamansi>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba>
 <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa>
```

## Find all the effect information about the tcm medicines that can treat Alzheimer's disease ##
```
 PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
 PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
 select distinct ?medicine ?effect
 where {?medicine 
    tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> ; 
    tcm:effect ?effect
 }
```
## Find all the gene-herb-disease associations for a particular gene ##
```
 PREFIX tcm:      <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
 PREFIX rdf:      <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
 PREFIX rdfs:     <http://www.w3.org/2000/01/rdf-schema#>
 select distinct *
 where {?gene rdfs:label ?name .
        filter regex(?name, "^CASP") .
        ?disease tcm:medicine ?herb ;
                 tcm:gene ?gene.
 }
```

## side effect queries ##
The top 10 herbs associated with AD as reported in TCMGeneDIT are:
  1. Ginkgo\_biloba
  1. Curcuma\_longa
  1. Polygala\_tenuifolia
  1. Scutellaria\_baicalensis
  1. Panax\_ginseng
  1. Polygonum\_multiflorum
  1. Centella\_asiatica
  1. Panax\_notoginseng
  1. Hypericum\_perforatum
  1. Apis\_mellifera

Among the ingredients of these herbs, we found that:
  * ingredients Estradiol and Isoleucine are active ingredients of 20 and 16 western drugs respectively, as reported in Dailymed. None of these drugs have reported side effects from Sider (before the mapping of drugs(sider->dailymed) is produced). It could be interesting to find out more about these western drugs, whether they are used for treating the same type of diseases or similar type of diseases as AD.
    * Estradiol is an ingredient of 5 different herbs, including Ginkgo\_biloba, Curcuma\_longa, Polygonum\_multiflorum, Panax\_notoginseng, and Hypericum\_perforatum.
    * Isoleucine is an ingredient of only one herb Apis\_mellifera.
  * there are 7 different ingredients of these herbs, which are found in 7 different western drugs with reported side-effects. These are

| ingredient   | drug         | herb |
|:-------------|:-------------|:-----|
| adenosine    | Adenosine    | all but Polygonum\_multiflorum and Centella\_asiatica |
| Acetic\_acid  | Acetic Acid  | all but Polygala\_tenuifolia |
| folic\_acid   | folic acid   | Ginkgo\_biloba |
| Mannitol     | Mannitol     | Ginkgo\_biloba |
| Lactulose    | Lactulose    | Panax\_ginseng |
| testosterone | testosterone | Ginkgo\_biloba, Curcuma\_longa, and Panax\_ginseng |
| progesterone | progesterone | Ginkgo\_biloba and Panax\_ginseng |


