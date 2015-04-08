# Bio2RDF endpoints #
Query for pubmed publication http://bio2rdf.org/pubmed:11910129

1. http://sparql.neurocommons.org/sparql/ Search for information from Prosite2Go graph
```
CONSTRUCT { 
	<http://bio2rdf.org/pubmed:11910129> 
           <http://bio2rdf.org/ns/go#has_prosite_pattern> ?prositeReference .  
} 
WHERE {   
GRAPH <http://purl.org/science/graph/obo/PROSITE2GO> {   
   <http://bio2rdf.org/pubmed:11910129> 
            <http://www.geneontology.org/formats/oboInOwl#hasDbXref> ?o .
   ?o http://www.geneontology.org/formats/oboInOwl#hasURI> ?prositeReference .  
} } LIMIT 2000
```


2. http://sparql.neurocommons.org/sparql/ Search for information from Prosite2Go graph
```
CONSTRUCT { 
    <http://bio2rdf.org/pubmed:11910129> 
       <http://bio2rdf.org/ns/bio2rdf#has_go_annotation> ?goAnnotation .  
} 
WHERE {  
    GRAPH <http://purl.org/science/graph/obo/PROSITE2GO> {   
	?goAnnotation <http://www.geneontology.org/formats/oboInOwl#hasDbXref> ?o . 
	?o <http://www.geneontology.org/formats/oboInOwl#hasURI> 'http://bio2rdf.org/pubmed:11910129'^^xsd:anyURI .  
}   } LIMIT 2000
```

3. http://bio2rdf.mquter.qut.edu.au:8890/sparql
```
PREFIX tags: <http://www.holygoat.co.uk/owl/redwood/0.1/tags/> 
PREFIX terms: <http://purl.org/net/terms#> 
CONSTRUCT { 
    ?taggingInstance rdf:type terms:TermInstance . 
    ?taggingInstance terms:subject <http://bio2rdf.org/pubmed:11910129> . 
    ?taggingInstance terms:term ?tagLabelUri . 
    ?tagLabelUri tags:name ?tagLabelName . 
} 
WHERE {  
   GRAPH <http://purl.org/net/terms#TermsSparqlGraph> {  
	?taggingInstance rdf:type terms:TermInstance . 
	?taggingInstance terms:taggedBy ?foafUser . 
	?taggingInstance terms:taggedOn ?taggedOn .         
	?taggingInstance terms:subject <http://bio2rdf.org/pubmed:11910129> . 
	OPTIONAL{ 
	    ?taggingInstance terms:predicate ?termPredicate .
	} 
	OPTIONAL{
	    ?taggingInstance terms:object ?termObject .
	} 
	?taggingInstance terms:term ?tagLabelUri . 
	?tagLabelUri tags:name ?tagLabelName . 
	FILTER(sameTerm(?foafUser, <http://purl.org/net/terms#AnonymousUser>))  
	}  
} LIMIT 2000
```

4. http://sparql.neurocommons.org/sparql/  search in medline
```
CONSTRUCT { 
    <http://bio2rdf.org/pubmed:11910129> ?p ?o . 
} 
WHERE {  
    GRAPH <http://purl.org/science/graph/medline/titles-years> {  
	<http://purl.org/commons/record/pmid/11910129> ?p ?o .  
}   } LIMIT 2000
```

5. http://sparql.neurocommons.org/sparql/  search by mesh headers
```
CONSTRUCT { 
   <http://bio2rdf.org/pubmed:11910129> ?p ?o . 
} 
WHERE {  
   GRAPH <http://purl.org/science/graph/medline/subject-headings> {  
       <http://purl.org/commons/record/pmid/11910129> ?p ?o .  
}   } 
```
http://hcls.deri.org:8080/page/science/article/pmid/11910129
6. http://pubmed.bio2rdf.org/sparql  search in pubmed sparql endpoint
```
CONSTRUCT { 
    <http://bio2rdf.org/pubmed:11910129> ?p ?o . 
} 
WHERE {  <http://pubmed.bio2rdf.org/pubmed:11910129> ?p ?o .   } LIMIT 2000
```

7. http://sparql.neurocommons.org/sparql/
```
CONSTRUCT { <http://bio2rdf.org/pubmed:11910129> ?p ?o . } 
WHERE {  
    GRAPH <http://purl.org/science/graph/ncbi/gene-pubmed> {  
        <http://purl.org/science/article/pmid/11910129> ?p ?o .  }   } LIMIT 2000
```

## HCLS KB @ DERI ##
**http://hcls.deri.org:8080/** http://hcls.deri.org:8080/page/science/article/pmid/11910129

Documentations:
**http://neurocommons.org/page/RDF_distribution** http://neurocommons.org/page/Bundles

see also:
**http://www.w3.org/TR/hcls-kb/** http://www.w3.org/TR/hcls-senselab


```
### this works

prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
where 
 {
   <http://purl.org/commons/record/ncbi_gene/3772180> ?p ?o
 }

```

```
## search for genes info from a specific graph

prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
from <http://purl.org/science/graph/ncbi/goa>
from <http://purl.org/science/graph/ncbi/homologene>
from <http://purl.org/science/graph/ncbi/gene-info>
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
   <http://purl.org/commons/record/ncbi_gene/3772180> ?p ?o
 }
```


```
## search for publications about a specific gene

prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
   <http://purl.org/commons/record/ncbi_gene/3772180> ?p ?o
 }
```

```
{ "head": { "link": [], "vars": ["p", "o"] },
  "results": { "distinct": false, "ordered": true, "bindings": [
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7789765" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/14704182" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1900493" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7569915" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7823955" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8370520" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8982468" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1703632" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8331337" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11237461" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/15927177" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9892668" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8275850" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/16511567" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9487384" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10790394" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10879541" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/3089868" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9748152" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12479803" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12506004" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11526072" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10445033" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8253214" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/105964" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/6790338" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1398052" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8984640" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8246990" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9398148" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/116894" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/2473007" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1748277" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/2124516" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11105896" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/2109831" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7651341" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8178152" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9524128" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10996811" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/14668388" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8417324" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11131529" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7707963" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10692016" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1743482" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12672493" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7883789" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9988773" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11092827" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1509513" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8816800" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9144292" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9622612" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10199951" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10801462" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11396999" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/17276344" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8119121" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/3145197" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11245569" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11222155" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8878676" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9592147" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12645926" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/16122416" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10525352" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9649497" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12350340" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10191049" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/17363251" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10581276" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12086596" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10556072" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1511868" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12537572" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1485963" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/2193131" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/6402396" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11483574" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11840322" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7567454" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7867511" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8001118" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8062457" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/9017901" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11238895" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/11581160" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/14972680" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12091311" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/1781021" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10916158" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7779680" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10831834" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/10652276" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/12429692" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/2015624" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/7588059" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8441386" }},
    { "p": { "type": "uri", "value": "http://purl.org/science/owl/sciencecommons/describes_gene_or_gene_product_mentioned_by" }	, "o": { "type": "uri", "value": "http://purl.org/science/article/pmid/8791531" }} ] } }
```


### Search for the ncbi gene id for a gene
```
select *
from <http://purl.org/science/graph/ncbi/gene-info>
where {
 ?gene <http://purl.org/science/owl/sciencecommons/ggp_has_symbol> ?symbol .
 filter regex (?symbol, "CG18350")
```

```
  { "head": { "link": [], "vars": ["gene", "symbol"] },  
    "results": { "distinct": false, "ordered": true, "bindings": [  
      { "gene": { "type": "uri", "value": "http://purl.org/commons/record/ncbi_gene/3772180" }    , "symbol": { "type": "literal", "value": "CG18350" }} ] } }  
```

```
### search for genes mentioned in a publication
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
from <http://purl.org/science/graph/ncbi/goa>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
  ?s ?p1 <http://purl.org/science/article/pmid/14704182> .
 }
```

### search for information about a publication
```
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX sc: <http://purl.org/science/owl/sciencecommons/>
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>

select *
from <http://purl.org/science/graph/ncbi/goa>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where 
 {
  ?pub  sc:identified_by_pmid ?pmid ;
        dc:date ?pubdate ;
        dc:title ?title .
 }
```

## Neurocommons at neurocommons ##
http://sparql.neurocommons.org/

```
# All the mesh terms for a given pubmed paper
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>
prefix mesh: <http://purl.org/commons/record/mesh/>
prefix skos: <http://www.w3.org/2004/02/skos/core#>
prefix sc: <http://purl.org/science/owl/sciencecommons/>

select distinct ?p ?o
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
where
{   
    <http://purl.org/commons/record/pmid/836189> ?p ?term. 
    { ?term skos:prefLabel ?name. }
      union
    { ?term skos:narrower ?uterm. 
      ?uterm skos:prefLabel ?name. 
      ?term sc:is_qualified_by ?qterm.
      ?qterm skos:prefLabel ?qualifier
    }
}
```

Not very successful

```
# All the descriptions for a given pubmed paper
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>
prefix mesh: <http://purl.org/commons/record/mesh/>
prefix skos: <http://www.w3.org/2004/02/skos/core#>
prefix sc: <http://purl.org/science/owl/sciencecommons/>

select distinct *
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where
{   
    <http://purl.org/commons/record/pmid/836189> ?p ?o .
    ?s ?p1 <http://purl.org/commons/record/pmid/836189> .
}
```



```
### find out what identifiers are used for this pubmed record
prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
prefix owl: <http://www.w3.org/2002/07/owl#>
prefix mesh: <http://purl.org/commons/record/mesh/>
prefix skos: <http://www.w3.org/2004/02/skos/core#>
prefix sc: <http://purl.org/science/owl/sciencecommons/>

select distinct *
from <http://purl.org/science/graph/medline/subject-headings>
from <http://purl.org/science/graph/mesh/mesh-skos>
from <http://purl.org/science/graph/mesh/qualified-headings>
from <http://purl.org/science/graph/medline/titles-years>
from <http://purl.org/science/graph/ncbi/gene-pubmed>
where
{   
 ?s ?p ?term. 
 filter (regex(?s,".*11910129*")
}
```