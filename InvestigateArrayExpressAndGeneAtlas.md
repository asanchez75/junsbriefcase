## ArrayExpress ##

This investigation was created around 2011-Feb-18. It is based on ArrayExpress (http://www.ebi.ac.uk/arrayexpress/) database accessed primarily on Feb 18, 2011.

  * [A sample experiment record](http://www.ebi.ac.uk/arrayexpress/browse.html?keywords=E-MTAB-27), as published in [Zheng Genome Biology 2010](http://genomebiology.com/2010/11/12/R124/about)


### Access ArrayExpress ###

  * Programmatic access: http://www.ebi.ac.uk/fg/doc/help/programmatic_access.html
  * Database dump: http://www.ebi.ac.uk/fg/doc/software/ae_index.html

### Plan for demo applications ###
  * Recreate application by [Zheng Genome Biology 2010](http://genomebiology.com/2010/11/12/R124/about)
  * Recreate the application by [Lukk Nature BioTech 2010](http://www.nature.com/nbt/journal/v28/n4/full/nbt0410-322.html) ([published app link broken](http://www.ebi.ac.uk/gxa/array/U133A))
    * After selecting a particular sample binning (e.g., by tissue of origin), the user can find all genes up- or downregulated in a particular sample class (such as liver)
    * choosing a gene of interest will produce box plots showing the gene's expression across the samples within each of the groups. The coloring of each box plot indicates the outcome of a statistical test for over- or underexpression.
    * Probe set–level queries are also permitted.

## GeneExpressionAtlas ##
The Gene Expression Atlas is a semantically enriched database of meta-analysis based summary statistics over a curated subset of ArrayExpress Archive, servicing queries for condition-specific gene expression patterns as well as broader exploratory searches for biologically interesting genes/samples.

GEA allows us to query for experiments reporting gene expression information about a given gene, along with some basic information about a gene.
  * It does not provide access to e.g. latest flyatlas, flyted and flybase information.
  * It is difficult to run queries, like genes matching a particular gene expression profile, or search for expressions of a set of homologue/orthologue genes across organisms

### Plan for demo applications ###
  * Search experiments by gene name, mashed-up with the existing open-biomed batch gene search
  * Search for genes and experiments matching a given expression profile (probably requiring a mapping between the EFO ontology and tissue names used by FlyAtlas)
  * Search for expression data of homologue genes for Drosophila and Human
  * Search for expression data of orthologue genes for Drosophila and Human