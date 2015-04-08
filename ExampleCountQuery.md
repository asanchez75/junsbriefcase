
```
PREFIX flyted: <http://purl.org/net/flyted/schema/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX chado: <http://purl.org/net/chado/schema/>

select count (distinct ?probe)
where {?probe rdf:type flyted:Probe; flyted:hybridisesTranscriptOf ?flybase.}

```