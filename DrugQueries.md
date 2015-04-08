# Find alternative medicine for AD and their side effects #
```
PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?medicine ?tvalue
where {
    ?medicine tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> ; tcm:medicine_disease_tvalue ?tvalue .
}
order by desc(?tvalue)
```

```
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba  	10.09099960327148
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	10.08199977874756
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	8.920000076293945
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	8.182000160217285
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	6.539000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	5.912000179290771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	5.556000232696533
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	5.38100004196167
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	5.278999805450439
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	5.086999893188477
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	4.664999961853027
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.65500020980835
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	4.467000007629395
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	4.467000007629395
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.453999996185303
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.355999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	4.355000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	4.238999843597412
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	4.23799991607666
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	4.236999988555908
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.223999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	4.120999813079834
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.11899995803833
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	4.113999843597412
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	4
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.986000061035156
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.867000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	3.867000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	3.867000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	3.867000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.864000082015991
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.86299991607666
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.815000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.736999988555908
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	3.736999988555908
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	3.736000061035156
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.719000101089478
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	3.599999904632568
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	3.598000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.588000059127808
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.57699990272522
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	3.463000059127808
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.460999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	3.460999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.460000038146973
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	3.453999996185303
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	3.440000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	3.315000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	3.315000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	3.305000066757202
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	3.305000066757202
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.303999900817871
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	3.161999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	3.16100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	3.154999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.148999929428101
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	3.138000011444092
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.999000072479248
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.996000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.99399995803833
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.992000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.992000102996826
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.989000082015991
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.98799991607666
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.983999967575073
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.976000070571899
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.959000110626221
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.940000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.828000068664551
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	2.82699990272522
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.82699990272522
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.825999975204468
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.825000047683716
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.825000047683716
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	2.823999881744385
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.822000026702881
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	2.822000026702881
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.822000026702881
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.821000099182129
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.819999933242798
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.819999933242798
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.815000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.815000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.809000015258789
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.808000087738037
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.796999931335449
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.644999980926514
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.642999887466431
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.642999887466431
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.642999887466431
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.641999959945679
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.641999959945679
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.641000032424927
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.640000104904175
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.640000104904175
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.640000104904175
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.638000011444092
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.638000011444092
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	2.63700008392334
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	2.621000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.61899995803833
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.448999881744385
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	2.448999881744385
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	2.448999881744385
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	2.448999881744385
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	2.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	2.447999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.446000099182129
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.446000099182129
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	2.446000099182129
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.444999933242798
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	2.444000005722046
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.443000078201294
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.441999912261963
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.441999912261963
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.441999912261963
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	2.441999912261963
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.440999984741211
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.440000057220459
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.438999891281128
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.437999963760376
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	2.437999963760376
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.437000036239624
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.430000066757202
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.407000064849854
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.384999990463257
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.234999895095825
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	2.234999895095825
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.233999967575073
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	2.233999967575073
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	2.233000040054321
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.232000112533569
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	2.232000112533569
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.232000112533569
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	2.232000112533569
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.230999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.230999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	2.230999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.230000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.230000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.230000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	2.230000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.229000091552734
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.229000091552734
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	2.229000091552734
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	2.229000091552734
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	2.229000091552734
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.226000070571899
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.223999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	2.223999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.223999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.223000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.221999883651733
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	2.221999883651733
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.220000028610229
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.214999914169312
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	2.21399998664856
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.213000059127808
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.210999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	2.210999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	2.203999996185303
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	2
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Angelica_gigas 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.998999953269958
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.998000025749207
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.996999979019165
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.996000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.996000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.996000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.996000051498413
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.995000004768372
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.995000004768372
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.995000004768372
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.99399995803833
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.99399995803833
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.993000030517578
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.993000030517578
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.991999983787537
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.991999983787537
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.991999983787537
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.991999983787537
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.991999983787537
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.991000056266785
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.988999962806702
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.988999962806702
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.98800003528595
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.98800003528595
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.986999988555908
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.985999941825867
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.985999941825867
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.985999941825867
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.985000014305115
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.98199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.98199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.980999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.980000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.978000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.976999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.97599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.973000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.967000007629395
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.965999960899353
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.95799994468689
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.947999954223633
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.73199999332428
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.730999946594238
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Evodia_rutaecarpa 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.730000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.728999972343445
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.728000044822693
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.726999998092651
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.72599995136261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.725000023841858
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.723999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.723999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.723999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.723999977111816
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.723000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.723000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.723000049591064
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.722000002861023
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.720999956130981
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.720999956130981
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.720999956130981
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.720999956130981
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.720000028610229
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.720000028610229
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.718999981880188
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Prunus_persica 	1.718999981880188
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.718999981880188
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.718999981880188
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.715999960899353
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.715999960899353
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.715999960899353
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.715000033378601
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.71399998664856
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.71399998664856
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.713000059127808
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.710999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.710999965667725
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.710000038146973
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.708999991416931
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.70799994468689
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.707000017166138
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.702999949455261
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.700999975204468
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.690999984741211
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.680999994277954
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.677999973297119
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.677000045776367
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Angelica_gigas 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.414000034332275
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.412999987602234
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Angelica_gigas 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Prunus_persica 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Nardostachys_jatamansi 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygala_tenuifolia 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Polygonum_multiflorum 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.411999940872192
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Angelica_gigas 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Evodia_rutaecarpa 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Prunus_persica 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.41100001335144
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.409999966621399
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Evodia_rutaecarpa 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.409000039100647
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.407999992370605
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Evodia_rutaecarpa 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.406999945640564
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Lycium_barbarum 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.406000018119812
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.404999971389771
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.404000043869019
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.404000043869019
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.404000043869019
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.404000043869019
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Glycyrrhiza_uralensis 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Papaver_somniferum 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Scutellaria_baicalensis 	1.402999997138977
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.401999950408936
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Prunus_persica 	1.401999950408936
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.401000022888184
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.399999976158142
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.399999976158142
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.39900004863739
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.39900004863739
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.39900004863739
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.39900004863739
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.398000001907349
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.398000001907349
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.398000001907349
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Carica_papaya 	1.398000001907349
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.396999955177307
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.396999955177307
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.396999955177307
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.396999955177307
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Zingiber_officinale 	1.396999955177307
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.396000027656555
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.396000027656555
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa 	1.396000027656555
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.396000027656555
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.394999980926514
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.394999980926514
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng 	1.394999980926514
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.39300000667572
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.39300000667572
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.39300000667572
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis 	1.39300000667572
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.391999959945679
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.391999959945679
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa 	1.391000032424927
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.389999985694885
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.384999990463257
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.384999990463257
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.38100004196167
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.38100004196167
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera 	1.378999948501587
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza 	1.376000046730042
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum 	1.370000004768372
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng 	1.355000019073486
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba 	1.348999977111816
```

So, the top 10 alternative medicine is:
```
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Ginkgo_biloba
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Apis_mellifera
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Salvia_miltiorrhiza
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Curcuma_longa
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Centella_asiatica
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Gastrodia_elata
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Hypericum_perforatum
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_ginseng
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Cannabis_sativa
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Panax_notoginseng
http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/medicine/Camellia_sinensis
```

## Find any side effect information about these herbs ##
```
PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?medicine ?effect ?effect_tvalue
where {
    ?medicine tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> ; tcm:medicine_disease_tvalue ?tvalue ; 
tcm:effect ?effect ; 
tcm:medicine_effect_association_tvalue ?effect_tvalue .
}
order by desc(?effect_tvalue)
```

There are a lot of effect information associated with the medicine, some of which are positive and others are negative. For example, there are 88 different types of effect associated with Ginkgo biloba.

```
PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?medicine count(distinct ?effect)
where {
    ?medicine tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> ; 
   tcm:medicine_disease_tvalue ?tvalue ; 
    tcm:effect ?effect ; 
tcm:medicine_effect_association_tvalue ?effect_tvalue .
}
order by desc(?tvalue)
```

```

```

# Find out the ingredients of these herbal medicine #
```
PREFIX tcm: <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select distinct ?medicine ?ingredient
where {
   ?medicine tcm:treatment <http://purl.org/net/tcm/tcm.lifescience.ntu.edu.tw/id/disease/Alzheimer_Disease> ; 
   tcm:medicine_disease_tvalue ?tvalue ; 
   tcm:ingredient ?ingredient .
}
order by desc(?tvalue)
```

# Find western drugs that possibly target at AD and share the ingredients of an alternative medicine (such as Ginkgo biloba) #

# Find out clinical trial information about the top 10 alternative medicine #

# Find out clinical trial information about the western drugs sharing the ingredients with alternative medicines #

# Find out all the genes associated with the top 10 alternative medicines #

# Find the alternative medicines that are associated with the top 10 AD genes #