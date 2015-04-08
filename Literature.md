# Biology use case for integrating dataset #

## within a single organisam, with different types of data ##

  * [A relationship between gene expression and protein interactions on the proteome scale: analysis of the bacteriophage T7 and the yeast Saccharomyces cerevisiae.](http://www.ncbi.nlm.nih.gov/pubmed/11522820)

Grigoriev A.

GPC Biotech, Fraunhoferstrasse 20, Martinsried 82152, Germany. andrei.grigoriev@gpc-biotech.com

The relationship between the similarity of expression patterns for a pair of genes and interaction of the proteins they encode is demonstrated both for the simple genome of the bacteriophage T7 and the considerably more complex genome of the yeast Saccharomyces cerevisiae. Statistical analysis of large-scale gene expression and protein interaction data shows that protein pairs encoded by co-expressed genes interact with each other more frequently than with random proteins. Furthermore, the mean similarity of expression profiles is significantly higher for respective interacting protein pairs than for random ones. Such coupled analysis of gene expression and protein interaction data may allow evaluation of the results of large-scale gene expression and protein interaction screens as demonstrated for several publicly available datasets. The role of this link between expression and interaction in the evolution from monomeric to oligomeric protein structures is also discussed.

  * [Relating whole-genome expression data with protein-protein interactions.](http://www.ncbi.nlm.nih.gov/pubmed/11779829)
  * [Protein interaction verification and functional annotation by integrated analysis of genome-scale data.](http://www.ncbi.nlm.nih.gov/pubmed/12049748)
  * [Probabilistic model of the human protein-protein interaction network](http://genomebiology.com/pubmed/16082366)

## Cross Organism ##
  * [Identification of potential interaction networks using sequence-based searches for conserved protein-protein interactions or "interologs"](http://genomebiology.com/pubmed/11731503)

# Informatique #
## Datawarehousing ##
  * [K2/Kleisli and GUS: experiments in Integrated Access to Genomic Data Sources](http://www.cis.upenn.edu/~db/sue/IBMSystemsJournal.pdf)
  * [EnsMart: a generic system for fast and flexible access to biological data](http://genomebiology.com/pubmed/14707178)
  * [BioZon:a system for unification, management and analysis of heterogeneous biological data](http://genomebiology.com/pubmed/16480510)
  * [BioWarehouse: a bioinformatics database warehouse toolkit](http://dx.doi.org/10.1186/1471-2105-7-170)
  * [GIMS: an integrated data storage and analysis environment for genomic and functional data (N. Paton)](http://genomebiology.com/pubmed/14618567)
  * [Atlas – a data warehouse for integrative bioinformatics](http://dx.doi.org/10.1186/1471-2105-6-34)

# Background #
  * [The Sequence Ontology: a tool for the unification of genome annotations](http://genomebiology.com/2005/6/5/R44)

# System Evaluation #
## FlyMine ##
### Search for FlyAtlas gene expression for a batch of genes ###

A list of Template queries can be found at http://www.flymine.org/release-16.0/templates.do.

Template http://www.flymine.org/release-16.0/template.do?name=Gene_FlyAtlas&scope=all can be used to search for flyatlas gene expression data for a given gene or a given set of genes. However, the presentation of the query results is rather crude.

Other interesting templates related to search for FlyAtlas include:
  * search for gene expression data for a given gene and adjacent genes/upstream/downstream genes
  * search for gene expression data for a given gene and GO annotations about that gene

The performance is really good. However, the query results are presented in a very crude format. To visualize the query results, we need to save the results as a List. On the list details page, you can find different widgets that visualize the results.

> [TODO](TODO.md) how the external software systems are embedded as widget.

### Programmatic access of these template queries ###
Click on the link of "Embed" in each Template page will lead you to the URL of the web service  (Restful style). The results are returned as tab-delimited data.

### Interesting templates for querying the life cycle expression data ###
> [TODO](TODO.md) still need to figure out how the query results can be visualized

