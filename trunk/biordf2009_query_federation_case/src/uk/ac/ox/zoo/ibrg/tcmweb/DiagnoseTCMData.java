/**
 * 
 */
package uk.ac.ox.zoo.ibrg.tcmweb;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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

			// diagnose();

			System.out.println("\nAll done.");

		} catch (Exception ex) {
			ex.printStackTrace();
		}

	}

	private void printKeys() {
		// TODO Auto-generated method stub
		Iterator keys = originalTcmData.keys();
		System.out.println("==== The key of the original dataset ====");
		while (keys.hasNext()) {
			String key = keys.next().toString();
			System.out.println(key);
		}

		keys = localQueryResult.keys();
		System.out.println("==== The key of the query result dataset ====");
		while (keys.hasNext()) {
			String key = keys.next().toString();
			System.out.println(key);
		}
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
			JSONArray mappings = (JSONArray) localQueryResult.get(key);
			if (mappings.length() == 0) {
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
			JSONArray mappings = (JSONArray) originalTcmData.get(key);
			if (mappings.length() == 0) {
				System.out.println("* " + key);
				newDisease++;
			}
		}

		System.out.println("\nFound " + newDisease
				+ " new disease names not shown in the original data.");
	}

	private void readFiles() throws IOException, JSONException {
		// TODO Auto-generated method stub
		//localQueryResult = readMap("tcm-data/tcm1.js");
		originalTcmData = readMap("tcm-data/TCM_gene_disease_associations.tab");
	}

	private JSONObject readMap(String filename) throws IOException,
			JSONException {
		// TODO Auto-generated method stub
		File f = new File(filename);
		BufferedReader r = new BufferedReader(new InputStreamReader(
				new FileInputStream(f)));
		StringBuffer buffer = new StringBuffer();

		String line = r.readLine();
		while (line != null) {
			buffer.append(line);
			line = r.readLine();
		}
		return new JSONObject(buffer.toString());
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		new DiagnoseTCMData();
	}

}
