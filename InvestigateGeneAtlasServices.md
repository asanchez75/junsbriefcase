http://www.ebi.ac.uk/gxa/help/AtlasApis

## Find information about gene _schuy_ ##

[http://www.ebi.ac.uk/gxa/api?geneIs=schuy&indent](http://www.ebi.ac.uk/gxa/api?geneIs=schuy&indent)

```
{
    "results" : [
        {
            "gene" : {
                "emblIds" : [
                    "AE003760",
                    "AE014297",
                    "AI512428",
                    "AJ276394",
                    "AW943714",
                    "AY058710",
                    "BT015235"
                ],
                "orthologs" : [

                ],
                "enstranscripts" : [
                    "FBtr0074899"
                ],
                "goTerms" : [
                    "DNA binding",
                    "ecdysone biosynthetic process",
                    "euchromatin",
                    "heterochromatin",
                    "polytene chromosome interband",
                    "polytene chromosome, telomeric region",
                    "protein binding",
                    "protein complex",
                    "regulation of transcription, DNA-dependent",
                    "telomere capping",
                    "zinc ion binding"
                ],
                "goIds" : [
                    "GO:0000791",
                    "GO:0000792",
                    "GO:0003677",
                    "GO:0005515",
                    "GO:0005705",
                    "GO:0006355",
                    "GO:0006697",
                    "GO:0008270",
                    "GO:0016233",
                    "GO:0035012",
                    "GO:0043234"
                ],
                "synonyms" : [
                    "CG5965",
                    "Dmel_CG5965",
                    "schuy",
                    "woc"
                ],
                "ensemblProteinIds" : [
                    "FBpp0074668"
                ],
                "ensemblGeneId" : "FBgn0036925",
                "interProIds" : [
                    "IPR010507",
                    "IPR011017",
                    "IPR017956"
                ],
                "uniprotIds" : [
                    "Q6AWL3",
                    "Q95TK6",
                    "Q9N9Z6",
                    "Q9VB55"
                ],
                "organism" : "Drosophila melanogaster",
                "id" : "FBgn0036925",
                "refseqIds" : [
                    "NM_140909"
                ],
                "name" : "schuy",
                "interProTerms" : [
                    "AT hook, DNA-binding motif",
                    "TRASH",
                    "Zinc finger, MYM-type"
                ]
            },
            "expressions" : [
                {
                    "ef" : "cell_line",
                    "efv" : "Kc",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-1505",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        },
                        {
                            "accession" : "E-MEXP-2523",
                            "pvalue" : 0.01899999938905239,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 2,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_line",
                    "efv" : "S2",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-2523",
                            "pvalue" : 0.01899999938905239,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_line",
                    "efv" : "SL-2",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-1505",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_type",
                    "efv" : "germline stem cell",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2783",
                            "pvalue" : 0.028999999165534973,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 1,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_type",
                    "efv" : "Kc cell",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2783",
                            "pvalue" : 0.028999999165534973,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "3rd instar larva",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-3057",
                            "pvalue" : 0.003000000026077032,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 1,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "prepupae",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-3057",
                            "pvalue" : 0.017999999225139618,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "stage 5",
                    "experiments" : [
                        {
                            "accession" : "E-TABM-441",
                            "pvalue" : 0.014999999664723873,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "disease_state",
                    "efv" : "Drosophila C virus",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2828",
                            "pvalue" : 0.0020000000949949026,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "disease_state",
                    "efv" : "reference",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2828",
                            "pvalue" : 0.0020000000949949026,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "Malpighian tubule",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-127",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        },
                        {
                            "accession" : "E-GEOD-1690",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 2,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "subcutaneous fat-body",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-7763",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "whole_organism",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-127",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        },
                        {
                            "accession" : "E-GEOD-7763",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        },
                        {
                            "accession" : "E-GEOD-1690",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 3,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                }
            ]
        }
    ],
    "totalResults" : 1,
    "startingFrom" : 0,
    "numberOfResults" : 1
}
```


## Find information about gene _schuy_ that is from the _Drosophila Melanogaster_ organism ##

http://www.ebi.ac.uk/gxa/api?geneIs=schuy&geneOrganism=Drosophila&melanogaster&indent or http://www.ebi.ac.uk/gxa/api?geneIs=schuy&species=Drosophila&melanogaster&indent

```
{
    "results" : [
        {
            "gene" : {
                "emblIds" : [
                    "AE003760",
                    "AE014297",
                    "AI512428",
                    "AJ276394",
                    "AW943714",
                    "AY058710",
                    "BT015235"
                ],
                "orthologs" : [

                ],
                "enstranscripts" : [
                    "FBtr0074899"
                ],
                "goTerms" : [
                    "DNA binding",
                    "ecdysone biosynthetic process",
                    "euchromatin",
                    "heterochromatin",
                    "polytene chromosome interband",
                    "polytene chromosome, telomeric region",
                    "protein binding",
                    "protein complex",
                    "regulation of transcription, DNA-dependent",
                    "telomere capping",
                    "zinc ion binding"
                ],
                "goIds" : [
                    "GO:0000791",
                    "GO:0000792",
                    "GO:0003677",
                    "GO:0005515",
                    "GO:0005705",
                    "GO:0006355",
                    "GO:0006697",
                    "GO:0008270",
                    "GO:0016233",
                    "GO:0035012",
                    "GO:0043234"
                ],
                "synonyms" : [
                    "CG5965",
                    "Dmel_CG5965",
                    "schuy",
                    "woc"
                ],
                "ensemblProteinIds" : [
                    "FBpp0074668"
                ],
                "ensemblGeneId" : "FBgn0036925",
                "interProIds" : [
                    "IPR010507",
                    "IPR011017",
                    "IPR017956"
                ],
                "uniprotIds" : [
                    "Q6AWL3",
                    "Q95TK6",
                    "Q9N9Z6",
                    "Q9VB55"
                ],
                "organism" : "Drosophila melanogaster",
                "id" : "FBgn0036925",
                "refseqIds" : [
                    "NM_140909"
                ],
                "name" : "schuy",
                "interProTerms" : [
                    "AT hook, DNA-binding motif",
                    "TRASH",
                    "Zinc finger, MYM-type"
                ]
            },
            "expressions" : [
                {
                    "ef" : "cell_line",
                    "efv" : "Kc",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-1505",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        },
                        {
                            "accession" : "E-MEXP-2523",
                            "pvalue" : 0.01899999938905239,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 2,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_line",
                    "efv" : "S2",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-2523",
                            "pvalue" : 0.01899999938905239,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_line",
                    "efv" : "SL-2",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-1505",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_type",
                    "efv" : "germline stem cell",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2783",
                            "pvalue" : 0.028999999165534973,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 1,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "cell_type",
                    "efv" : "Kc cell",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2783",
                            "pvalue" : 0.028999999165534973,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "3rd instar larva",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-3057",
                            "pvalue" : 0.003000000026077032,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 1,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "prepupae",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-3057",
                            "pvalue" : 0.017999999225139618,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "developmental_stage",
                    "efv" : "stage 5",
                    "experiments" : [
                        {
                            "accession" : "E-TABM-441",
                            "pvalue" : 0.014999999664723873,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "disease_state",
                    "efv" : "Drosophila C virus",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2828",
                            "pvalue" : 0.0020000000949949026,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 1,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "disease_state",
                    "efv" : "reference",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-2828",
                            "pvalue" : 0.0020000000949949026,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "Malpighian tubule",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-127",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        },
                        {
                            "accession" : "E-GEOD-1690",
                            "pvalue" : 0.0,
                            "expression" : "DOWN"
                        }
                    ],
                    "upExperiments" : 0,
                    "downExperiments" : 2,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "subcutaneous fat-body",
                    "experiments" : [
                        {
                            "accession" : "E-GEOD-7763",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 1,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                },
                {
                    "ef" : "organism_part",
                    "efv" : "whole_organism",
                    "experiments" : [
                        {
                            "accession" : "E-MEXP-127",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        },
                        {
                            "accession" : "E-GEOD-7763",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        },
                        {
                            "accession" : "E-GEOD-1690",
                            "pvalue" : 0.0,
                            "expression" : "UP"
                        }
                    ],
                    "upExperiments" : 3,
                    "downExperiments" : 0,
                    "nonDEExperiments" : 0,
                    "upPvalue" : 0.0,
                    "downPvalue" : 0.0
                }
            ]
        }
    ],
    "totalResults" : 1,
    "startingFrom" : 0,
    "numberOfResults" : 1
}
```

One can also search for genes from specific organism\*s**, using query URI like http://www.ebi.ac.uk/gxa/api?geneIs=schuy&species=Drosophila&melanogaster&species=Homo+Sapiens&indent**

## Find specific experiments ##

@TODO