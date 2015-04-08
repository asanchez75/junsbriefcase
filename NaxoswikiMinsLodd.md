## Load DBPedia information ##
All information are loaded using the name of the graph: http://naxos/dbpedia/zh/20081121

  * Load inforbox\_zh
```
 ./bin/isql 1111 dba dba verbose=on banner=off echo=ON errors=stdout exec="ttlp_mt(file_to_string_output('/root/Desktop/infobox_zh.nt'), '', 'http://naxos/dbpedia/zh/20081121',0);checkpoint;"
```

  * Load articles\_label\_zh.nt, longabstract\_zh.nt

### Test queries ###
```
 select *
 where {<http://dbpedia.org/resource/Ginkgo> ?p ?o .}


 select *
 where {?s <http://dbpedia.org/property/name> ?name .
   filter regex(str(?name), "\u9280\u674F").}
```

## Ginkgo ##
  * "Medlineplus" (http://medlineplus.gov/) developed by the National Library of Medicine in US, which contains information including drug and supplements (e.g., herbs). For example, one of the supplements that I found is Ginkgo (http://www.nlm.nih.gov/medlineplus/druginfo/natural/patient-ginkgo.html) that is used for the treatment of numerous conditions (e.g., Alzheimer's Disease), many of which are under scientific investigation (there is a section listing related scientific studies). In addition, there is section on drug interactions.

  * In Chinese/English Wikipedia, there are pages describing Ginkgo (see the URL's below).
    * http://en.wikipedia.org/wiki/Ginkgo_biloba
    * http://dbpedia.org/page/Ginkgo_biloba
    * http://zh.wikipedia.org/wiki/%E9%93%B6%E6%9D%8F

  * In clinicaltrials.gov, one can find quite a number of clinical trials involving Ginkgo (see http://clinicaltrials.gov/ct2/results?term=ginkgo).

## Huang Lian Jie Du Wan ##
  * In Wikipedia, I found the following page containing a table listing a number of herbal formulas. http://en.wikipedia.org/wiki/Chinese_classic_herbal_formula. One of the formulas called "Huang Lian Jie Du Wan" has been used for treating diseases such as Alzheimer's.
  * PubMED: For example, the following PubMed article describes a study involving the use of Huang Lian Jie Du Wan decoction in Alzheimer's (http://www.ncbi.nlm.nih.gov/pubmed/18524483). I just wonder if any of Huajun's TCM databases contain information (e.g., ingredient herbs) about "Huang Lian Jie Du Wan".