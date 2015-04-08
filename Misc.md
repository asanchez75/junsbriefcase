# Delete data #
```
delete from DB.DBA.RDF_QUAD
where G = DB.DBA.RDF_MAKE_IID_OF_QNAME (
    'http://local.virt/DAV/sparql_demo/data/data-xml/source-simple2/source-data-01.rdf' );
```

# find all the graphs in the store #
In the isql interface

```
create procedure all_graphs ()
{
  declare i any;
  declare g varchar;
  result_names (g);
 i := iri_id_from_num (0);
  while (1)
    {
    i := (select top 1 g from rdf_quad where g > i);
      if (i is  null) return;
      result (id_to_iri (i));
    } 
 done: ;
}
```

Then
```
call all_graphs();
```

# Load data into Virtuoso RDF Store at Rodos #

## Load TCM RDF Release 3 into local virtuoso ##
```
./bin/isql 1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/TCM_*statistics.ttl'), '', 'http://purl.org/net/data/tcm/tcm-20090619',0);checkpoint;"
```

# Load data into Virtuoso RDF Store at Naxos #

## Load FlyBase gene names ##

```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/sequence-vanilla-feature.nt'), '', 'http://openflydata.org/flybasegenes-20090402',0);checkpoint;"
```


## Load TCM RDF Release 2 into local virtuoso ##
```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/TCM_*statistics.ttl'), '', 'http://purl.org/net/data/tcm/tcm-20090428',0);checkpoint;"
```

```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/gene-name-mapping-linkage-run-auto.ttl'), '', 'http://purl.org/net/tcm/id/linkset/1',0);checkpoint;"
```

```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/gene-name-mapping-linkage-run-manual.ttl'), '', 'http://purl.org/net/tcm/id/linkset/2',0);checkpoint;"
```

## Load TCM RDF Release 3 into local virtuoso ##
```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/TCM_*statistics.ttl'), '', 'http://purl.org/net/data/tcm/tcm-20090612',0);checkpoint;"
```

## Load Data Mapping to TCM into loacl virtuoso ##
```
./bin/isql 129.67.24.116:1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/diseases_tcm_dbpedia.owl'), '', 'http://purl.org/net/tcm/id/linkset/3',0);checkpoint;"
```

```
./bin/isql 1111 dba **** verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/genes_tcm_diseasesome.owl'), '', 'http://purl.org/net/tcm/id/linkset/4',0);checkpoint;"
```


# Alzheimer's Disease (Diseasesome) #

```
SELECT DISTINCT ?s WHERE {
  ?s rdfs:label ?label .
  filter regex(?label, "^Alzheimer") 
}
LIMIT 10
```


Result:
```
http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74
```

A query about disease/74 also returns genes associated with the disease (diseasome:associatedGene) and possible drugs (diseasome:possibleDrug).


# Drugs possibly targeting at this disease (DrugBank) #
SELECT DISTINCT **WHERE {
> ?drug drugbank:possibleDiseaseTarget <http://www4.wiwiss.fu-berlin.de/diseasome/resource/diseases/74> .
}
LIMIT 100**

78 drugs were returned.

# Exhibit Drugs associated with AD #
http://rodos.zoo.ox.ac.uk/tcmdata/exhibit_drugs/exhibit_medicine.html