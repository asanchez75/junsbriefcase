# Introduction #

There are five datasets from TCMGeneDIT (http://tcm.lifescience.ntu.edu.tw/):
  * TCM\_disease\_associations.tab (text mining)
  * TCM\_effect\_associations.tab (text mining)
  * TCM\_gene\_associations.tab (text mining)
  * TCM\_gene\_disease\_associations.tab (text mining and PharmGKB)
  * TCM\_ingredient\_associations.tab (text mining and http://www.spec-g.com.tw/newherb/)

Othe data sources available on the web site but not as dump are:
  * protein-protein interaction data, from HPRD and IntAct
  * pathway information, from HPRD, KEGG and CCAP

All of them are available as tab delimited data files.

# Data Structure #
## Disease association ##
| TCM\_Name | Disease\_Name | t-value |
|:----------|:--------------|:--------|

## Effect association ##
| TCM\_Name | Effect\_Name | t-value |
|:----------|:-------------|:--------|

## Gene association ##
| TCM\_Name | Gene\_Symbol | t-value |
|:----------|:-------------|:--------|

## Ingredient association ##
| TCM\_Name | Ingredient\_Name	| t-value |
|:----------|:-----------------|:--------|

## Gene-Disease association ##
| TCM\_Name | Gene\_Symbol | Disease\_Name | t-value |
|:----------|:-------------|:--------------|:--------|

# Example data #
For "alzheimer's disease",
| **TCM\_name** | **Gene\_Symbol** | **Disease\_Name** | **t-value** |
|:--------------|:-----------------|:------------------|:------------|
| Angelica gigas  |      APLP2 |  Alzheimer Disease  |     1.414 |
| Cannabis sativa |      APLP2 |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      NFKB1 |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      CCND1 |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      TNF   |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      IL6   |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      ERBB2 |  Alzheimer Disease  |     1.414 |
| Curcuma longa   |      IL1B  |  Alzheimer Disease  |     1.414 |
| Ginkgo biloba   |      MAPT  |  Alzheimer Disease  |     2.000 |
| Ginkgo biloba   |      ADAMTS2 | Alzheimer Disease |      1.414 |
| Ginkgo biloba   |      AGPS |   Alzheimer Disease  |     2.236 |
| Ginkgo biloba   |      TTR  |   Alzheimer Disease  |     1.414 |
| Ginkgo biloba   |      APLP2 |  Alzheimer Disease  |     5.000 |
| Ginkgo biloba   |      APP   |  Alzheimer Disease  |     1.732 |
| Ginkgo biloba   |      ACHE  |  Alzheimer Disease  |     2.828 |
| Ginkgo biloba   |      APOE  |  Alzheimer Disease  |     1.732 |
| Ginkgo biloba   |      CASP3 |  Alzheimer Disease  |     1.732 |
| Ginkgo biloba   |      MAPK1 |  Alzheimer Disease  |     1.414 |
| Ginkgo biloba   |      CREB1 |  Alzheimer Disease  |     1.414 |
| Hypericum perforatum | APLP2 |  Alzheimer Disease  |     1.414 |
| Polygala tenuifolia  | APLP2 |  Alzheimer Disease  |     1.414 |
| Polygala tenuifolia  | APP   |  Alzheimer Disease  |     1.414 |
| Prunus persica       |  ACHE |   Alzheimer Disease |      1.414 |

There are further information about the effect of a TCM ingredient, which might be interesting. For example, for "Ginkgo\_biloba", one can find information from the TCM\_ingredient\_associations.tab. Some example data are copied below.

| **TCM\_name** | **Effect** | **t-value** |
|:--------------|:-----------|:------------|
|Ginkgo biloba	|ginkgolide |	12.910 |
|Ginkgo biloba	|bilobalide |	10.944 |
|Ginkgo biloba	|flavonoid |	10.762 |
|Ginkgo biloba	|quercetin |	9.512 |
|Ginkgo biloba	|terpene |	9.102 |
|Ginkgo biloba	|glycoside |	7.495 |
|Ginkgo biloba	|kaempferol |	7.397 |
|Ginkgo biloba	|vitamin e |	6.314 |
|Ginkgo biloba	|glucose |	6.283 |
|Ginkgo biloba	|calcium |	6.180 |
|Ginkgo biloba	|flavone |	6.063 |
|Ginkgo biloba	|lactone |	6.059 |
|Ginkgo biloba	|terpenoid |	5.817|

# RDFizing TCMGeneDIT #
This can be found at http://code.google.com/p/junsbriefcase/wiki/RDFTCMData