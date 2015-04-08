# ArrayExpress #
http://www.ebi.ac.uk/microarray-as/ae/

It does not tolerate the gene names very well. Quite a few false positive genes were returned.

Questions:
## The difference between ArrayExpress, FlyAtlas, and 4DExpress ##
  * ArrayExpress contains array data from many different experiments, while FlyAtlas hosts only array data from its own experiment
  * 4DExpress contains in situ gene expression data from different species and it also allows one to compare the expression of genes of similar expression, which is not much too different from our openflydata application. And 4DExpress does not contain in situ expression in drosophila testis.


## Programmatic access to these 3 databases ##
  * ArrayExpress has web services
  * We have a SPARQl endpoint over FlyAtlas but it needs to be updated
  * 4DExpression [very valuable](not.md)

## Goal with using these expression datasets ##
  * Cluster the array expression of drosophila genes in testis in order to identify clusters of genes, which can be downstream analyzed
  * retrieve their GO function annotations, to see whether they share any functions or to identify outstanding genes

## Investigate clustering methods and tools ##
  * We might be able to reuse the clustering result from Parisi et al.
  * [TODO](TODO.md) Take a look at the web services of ArrayExpress

## Hypotheses playground ##
  * How many genes with no staining in wild type but with staining in mutants
  * What kind of expression pattern for genes reported in Dorus and Parisi