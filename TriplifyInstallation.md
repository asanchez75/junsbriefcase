# Fix the php-pgsql driver problem #
Run
```
yum update php5
yum install php-pgsql
```

Configure /etc/php.ini, add
```
extension=pgsql.so
```

The pgsql.so file is installed at /usr/lib/php/modules/ together with mysql.so.

Also, I needed to comment out the line of
```
$this->pdo->setAttribute(eval('return PDO::MYSQL_ATTR_USE_BUFFERED_QUERY;'),false); 
```

in the index.php file for Triplify V0.5. Because that line works particularly for MYSQL databases but not required for the PostgreSQL.

Notes:
  * installed in /var/www/html/. It can be installed somewhere else and set up a redirect in /etc/httpd/conf.d/triplify.host
  * created config.flyted.inc.php and config.flybase.inc.php configuration file. they need to be included in the index.php file.
  * the key is to configure the $triplify['LinkedDataDepth']='1'; right
  * to check whether everything works well, we can go to http://localhost/triplify/feature/ and see whether some RDF statements could be returned. The metadata can also be returned as JSON format by configuring index.php file.

# Triplify FlyBase #

http://naxos.zoo.ox.ac.uk/triplify/feature/3101873

rdfs:seeAlso

http://openflydata.org/id/flybase/feature/Drosophila_melanogaster/SO_0000704/FBgn0004372

```
<rdf:Description rdf:about="http://openflydata.org/id/flybase/feature/Drosophila_melanogaster/SO_0000704/FBgn0004372">
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48771"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0200092"/>
<j.0:altLabel>FBgn0004372</j.0:altLabel>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/drsc_FBgn0004372"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/hdri_FBgn0004372"/>
<j.0:altLabel>aly</j.0:altLabel>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48777"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316021"/>
<j.2:organism rdf:resource="http://openflydata.org/id/flybase/organism/Drosophila_melanogaster"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48756"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN6"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0126917"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/flight_FBgn0004372"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316029"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0173441"/>
<j.1:is_expression_analysed_in_mutant rdf:datatype="http://www.w3.org/2001/XMLSchema#string">n</j.1:is_expression_analysed_in_mutant>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN1"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316008"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0107464"/>
<j.0:altLabel>CG2075</j.0:altLabel>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0166452"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316025"/>
<j.0:altLabel>143450_at</j.0:altLabel>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0186918"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0206447"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0146524"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316028"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0154345"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0105828"/>
<rdf:type rdf:resource="http://purl.org/obo/owl/SO#SO_0000704"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBgn0035387"/>
<j.2:name rdf:datatype="http://www.w3.org/2001/XMLSchema#string">aly</j.2:name>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0204563"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_BI161847"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48775"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_AJ277307"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0137936"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48754"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN4"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0180166"/>
−
<j.1:derived_polypeptide_bodypart_expression_cv rdf:datatype="http://www.w3.org/2001/XMLSchema#string">
<as> immunolocalization <t> adult stage <a> spermatocyte <p><s> nucleus <c> NOT meiotic metaphase 
</j.1:derived_polypeptide_bodypart_expression_cv>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0161726"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0200958"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316023"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/unattributed"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48758"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0184338"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0190509"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0131071"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/INTERPRO_IPR010561"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_AAF47702"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0125078"/>
<j.1:is_expression_analysed_in_wildtype rdf:datatype="http://www.w3.org/2001/XMLSchema#string">n</j.1:is_expression_analysed_in_wildtype>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48763"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48755"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0086143"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN0"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316007"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0092725"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0189108"/>
<j.2:seqlen rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">2393</j.2:seqlen>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48767"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48759"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0154587"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0187643"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0151687"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBgn0004372"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316019"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316027"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0135793"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_CAB86720"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0085465"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48761"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0173858"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/dedb_2134"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0133796"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0091733"/>
<j.2:is_obsolete rdf:datatype="http://www.w3.org/2001/XMLSchema#boolean">false</j.2:is_obsolete>
<j.0:altLabel>ms(3)ry2</j.0:altLabel>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0160387"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48765"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48757"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316015"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316009"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0155716"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48769"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0160527"/>
−
<j.1:derived_polypeptide_bodypart_expression_cv rdf:datatype="http://www.w3.org/2001/XMLSchema#string">
<as> immunolocalization <t> adult stage <a> spermatocyte <p><s> spindle <c> meiotic metaphase 
</j.1:derived_polypeptide_bodypart_expression_cv>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0199979"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48762"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP5"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316011"/>
<j.0:altLabel>cg2075</j.0:altLabel>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0038719"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0131360"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0151840"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48766"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP9"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/droid_FBgn0004372"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316018"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/panther_FBgn0004372"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48770"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0195382"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/flyatlas_FBgn0004372"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0174565"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316030"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48760"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316017"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP1"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBan0002075"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0161679"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48764"/>
<j.1:is_expression_analysed_in_wildtype rdf:datatype="http://www.w3.org/2001/XMLSchema#string">y</j.1:is_expression_analysed_in_wildtype>
<j.2:is_analysis rdf:datatype="http://www.w3.org/2001/XMLSchema#boolean">false</j.2:is_analysis>
<j.2:feature_id rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3101873</j.2:feature_id>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP7"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0205885"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316013"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0184335"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0185415"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_Annotation_IDs_CG2075"/>
<j.1:is_expression_analysed_in_mutant rdf:datatype="http://www.w3.org/2001/XMLSchema#string">y</j.1:is_expression_analysed_in_mutant>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNQ2"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0199598"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48768"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0128086"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0054167"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48774"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP4"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316010"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN3"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0104946"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/geo_FBgn0004372"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0132177"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0182670"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316022"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0064778"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0131425"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP8"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0189494"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316014"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP3"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0133762"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0078911"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNM9"/>
<j.0:altLabel>ms(3)2</j.0:altLabel>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBgn0013662"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0100290"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0199667"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/if_%2Fpolycomb%2Falwserly1.htm"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0161748"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0183122"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316026"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0202425"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0200827"/>
<j.0:altLabel>always early</j.0:altLabel>
−
<j.1:derived_polypeptide_bodypart_expression_text rdf:datatype="http://www.w3.org/2001/XMLSchema#string">
@FBgn0004372:aly@ protein is concentrated on the chromatin and distributed in the nucleoplasm in the nuclei of primary spermatocytes.
</j.1:derived_polypeptide_bodypart_expression_text>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0101134"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/ihop_69001"/>
<j.2:uniquename rdf:datatype="http://www.w3.org/2001/XMLSchema#string">FBgn0004372</j.2:uniquename>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0194210"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48772"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBgn0014354"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316016"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP0"/>
<rdf:type rdf:resource="http://purl.org/net/chado/schema/Feature"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q9VZW3"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0102749"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0180108"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0123016"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48776"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316020"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0161038"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316012"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNP6"/>
<j.2:dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/FlyBase_FBgn0004372"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0087570"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/flymine_FBgn0004372"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0184224"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN5"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0067919"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0200327"/>
<j.0:altLabel>fbgn0004372</j.0:altLabel>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0111078"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNQ1"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_DQ316024"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0197660"/>
−
<j.1:derived_polypeptide_bodypart_expression_cv rdf:datatype="http://www.w3.org/2001/XMLSchema#string">
<as> immunolocalization <t> adult stage <a> spermatid <p><s> nucleus <c>
</j.1:derived_polypeptide_bodypart_expression_cv>
<j.0:altLabel>Aly</j.0:altLabel>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB_AE003476"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/GB%5Fprotein_ABC48773"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0194011"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q2PNN2"/>
<j.2:feature_pub rdf:resource="http://openflydata.org/id/flybase/pub/FBrf0066324"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/flygrid_70019"/>
<j.2:feature_dbxref rdf:resource="http://openflydata.org/id/flybase/dbxref/UniProt%2FTrEMBL_Q9NFM3"/>
</rdf:Description>
```