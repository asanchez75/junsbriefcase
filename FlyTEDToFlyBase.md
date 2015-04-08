# Steps #
  * generate the raw mapping of flyted probes to flybase gene names (MapGeneNamesFlyTEDToFlyBase.java)
  * clean up unambiguous flyted probe names manually
  * transform the above mapping into n-triple format (MapFlyTEDProbeNamesToFlyBaseGenes). The output flyted2flytbase.nt file is the LinkData file and should be loaded in a SPARQL endpoint, to facilte flyweb queries.

# Diagnose the mapping #
This is to check whether
  * there is any flyted probes mapped to more than one flybase gene,
  * there is any flyted probes mapped to no flybase genes,
  * there is any flybase gene mapped to more than one flyted probes.

This step should be performed over the mapping file generated at step 1, using the script DiagnoseMappings. The result of this analysis is genenamemapping/analysis.txt.

# Detect any updates #
When Flybase updates, the mapping steps have to be repeated. The DetectNewMappings.java script will analyse difference between two flyted2flybase\_YYYYMMDD.txt files, generated for different versions of flybase database.

# Notes #
  * If FlyTED is updated, then the genenamemapping/flyted.txt file, which stores the list of flyted probes need to be updated.
  * The genenamemapping/flyted-mapping.js file is deprecated.