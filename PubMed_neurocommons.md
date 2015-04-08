## Search for the NCBI gene ID using a gene symbol ##
```
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select *
from <http://purl.org/science/graph/ncbi/gene-info>
where {
 ?gene sc:ggp_has_symbol ?symbol .
 filter regex (?symbol, "CG18350")
}
```


## Search for publications about a specific ncbi gene ##
```
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select distinct ?pubID
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
   <http://purl.org/commons/record/ncbi_gene/3772180> sc:describes_gene_or_gene_product_mentioned_by ?pubID
 }
```


## Search for other gene names associated with a publication ##

```
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select distinct ?gene
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
   ?gene sc:describes_gene_or_gene_product_mentioned_by <http://purl.org/science/article/pmid/7789765>
 }
```

## Search for Mesh terms associated with a publication ##
```
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
prefix skos: <http://www.w3.org/2004/02/skos/core#>

select distinct *
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/subject-headings>
where 
 {
  <http://purl.org/commons/record/pmid/11665278>  ?p ?term. 
    { ?term skos:prefLabel ?name. }
      union
    { ?term skos:narrower ?uterm. 
      ?uterm skos:prefLabel ?name. 
      ?term sc:is_qualified_by ?qterm.
      ?qterm skos:prefLabel ?qualifier
    }
}
```

I believe there are only two properties associating a publication record with mesh terms, i.e., sc:has-as-minor-mesh and sc:has-as-major-mesh

## Different identifiers for pubmed records/articles ##
|http://purl.org/science/article/pmid/7789765|http://purl.org/science/graph/ncbi/gene-pubmed|
|:-------------------------------------------|:---------------------------------------------|
|http://purl.org/commons/record/pmid/7789765| http://purl.org/science/graph/medline/titles-years and http://purl.org/science/graph/medline/subject-headings|
|http://purl.org/commons/article/pmid/7789765|http://purl.org/science/graph/medline/titles-years and http://purl.org/science/graph/medline/subject-headings|

## Search for bibliographic information associated with a publication ##
```
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/medline/subject-headings>
where 
 {
  <http://purl.org/commons/article/pmid/11665278>  sc:identified_by_pmid ?pmid ;
                                                   dc:date ?pubdate ;
                                                   dc:title ?title .
  optional {?pmid ?p ?term }
 }
```

## The big query: query for publications about a gene and information about these publications ##
```

## this query does not work at the moment until the publication URIs are fixed by Neurocommons

PREFIX sc: <http://purl.org/science/owl/sciencecommons/>

select distinct ?pubID ?pubdate ?title ?mesh ?name ?genes
from <http://purl.org/science/graph/ncbi/gene-pubmed>
from <http://purl.org/science/graph/ncbi/gene-info>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/medline/titles-years>
where 
 {
   <http://purl.org/commons/record/ncbi_gene/3772180>  sc:describes_gene_or_gene_product_mentioned_by ?pubID .
   ?genes sc:escribes_gene_or_gene_product_mentioned_by ?pubID .
 ### not sure which pubID to be used in the following
   ?pub dc:date ?pubdate ; dc:title ?pubtitle; sc:identified_by_pmid ?pmid .
   optional
   {?pmid ?p ?mesh . 
    { ?mesh skos:prefLabel ?name. }
      union
    { ?mesh skos:narrower ?uterm. 
      ?uterm skos:prefLabel ?name. 
      ?mesh sc:is_qualified_by ?qterm.
      ?qterm skos:prefLabel ?qualifier
    }
    } 
 }
```


## Search for publication records about Drosophila melanogaster genes ##
```
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
select ?gene count(distinct ?gene) ?pubID
from <http://purl.org/science/graph/ncbi/gene-pubmed>
from <http://purl.org/science/graph/ncbi/goa>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/ncbi/gene-info>
where 
 {
   ?gene sc:ggp_from_species_described_by <http://purl.org/commons/record/ncbi_taxonomy/7227> .
   ?gene sc:describes_gene_or_gene_product_mentioned_by ?pubID .
 }
```

Class information can be found from the graph of http://purl.org/science/graph/ncbi/goa.


TODO: wait for the pubid problem to be solved.