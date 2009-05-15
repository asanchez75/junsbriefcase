/**
 * 
 */
package uk.ac.ox.zoo.ibrg.tcmweb;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSetFactory;
import com.hp.hpl.jena.rdf.model.Resource;
import com.hp.hpl.jena.vocabulary.ResultSet;
import com.sun.xml.internal.txw2.output.ResultFactory;

/**
 * @author Jun Zhao
 * 
 */
public class DiagnoseTCMData {
	private JSONObject localQueryResult;
	private JSONObject originalTcmData;

	public DiagnoseTCMData() {
		try {

			System.out.println("== TCM Data Translation Verification ==");
			System.out.println("Analysis run on " + (new Date()).toString()
					+ ".");
			System.out.println();

			readFiles();

			printKeys();

			diagnose();

			System.out.println("\nAll done.");

		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	private void printKeys() {
		// TODO Auto-generated method stub
		Iterator keys = originalTcmData.keys();
		System.out.println("==== The key of the original dataset ====");
		int originalMedicine =0;
		int queryMedicine = 0;
		while (keys.hasNext()) {
			String key = keys.next().toString();
			System.out.println(key);
			originalMedicine ++;
		}
		System.out.println("==== There are " + originalMedicine + " medicines ====");

		keys = localQueryResult.keys();
		System.out.println("==== The key of the query result dataset ====");
		while (keys.hasNext()) {
			String key = keys.next().toString();
			System.out.println(key);
			queryMedicine ++;
		}
		System.out.println("==== There are " + queryMedicine + " medicines ====");
	}

	private void diagnose() throws JSONException {
		// TODO Auto-generated method stub

		// are there any disease names with no mapping genes in the local query
		// result?
		System.out
				.println("=== Are there any disease names with no mapping genes in the local query result? ===\n");
		int missing = 0;
		Iterator keys = originalTcmData.keys();
		while (keys.hasNext()) {
			String key = keys.next().toString();
			if (localQueryResult.has(key)){
				String mappings = (String) localQueryResult.get(key);
			}else{
				System.out.println("* " + key);
				missing++;
			}
		}
		System.out.println("\nFound " + missing + " missing disease names.");

		// are there any disease names not shown in the original data?

		System.out
				.println("\n=== Are there any disease names not shown in the original data? ===\n");
		int newDisease = 0;
		keys = localQueryResult.keys();
		while (keys.hasNext()) {
			String key = keys.next().toString();
			if (originalTcmData.has(key)){
				String mappings = (String) originalTcmData.get(key);
				//System.out.println("\n=== Found " + mappings + " disease names.");
			}else{
				System.out.println("* " + key);
				newDisease++;
			}
		}

		System.out.println("\nFound " + newDisease
				+ " new disease names not shown in the original data.");
	}

	private void readFiles() throws IOException, JSONException {
		// TODO Auto-generated method stub
		localQueryResult = readJson("tcm-data\\medicine_disease.js");
		originalTcmData = readJson("tcm-data\\medicine_disease_from_tcm.js");
	}
	
	private JSONObject readJson (String filename) throws FileNotFoundException, JSONException{
		File f = new File(filename);
		InputStream inFile = new FileInputStream(f);
		com.hp.hpl.jena.query.ResultSet results = ResultSetFactory.fromJSON(inFile);
		
		// read the keys and loop to construct JSON result object
		JSONObject container = new JSONObject();
		for ( ; results.hasNext() ; ){
			QuerySolution soln = results.nextSolution() ;
			String medicine = soln.get("medicine").toString();
			Iterator<String> varNames = soln.varNames();
			String varName = "";
			if (varNames.next().toString().equals("medicine"))
				varName = varNames.next().toString();
//				System.out.println("=== the other variable name " + varName);
			container.put(medicine, soln.get(varName).toString());
		}
		
		return container;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new DiagnoseTCMData();
	}

}
