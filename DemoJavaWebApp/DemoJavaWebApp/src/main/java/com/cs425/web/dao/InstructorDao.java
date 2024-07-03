package com.cs425.web.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.cs425.web.model.Instructor;

public class InstructorDao {

    final String url = "jdbc:postgresql://localhost:5432/university";
	final String user = "postgres";
	final String password = "1234";//"<add your password>";

	public Instructor getInstructor(String iID) {
		
		   
		
        String mySQL = "SELECT id, name, dept_name, salary "
        		+ "FROM instructor "
        		+ "WHERE id = ?";
        
		Instructor ob1 = new Instructor();

		try {
			Class.forName("org.postgresql.Driver");
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		try (Connection conn = DriverManager.getConnection(url, user, password);
	 		    PreparedStatement pStmt = conn.prepareStatement(mySQL)){
	 			
	 		pStmt.setString(1, iID.trim());
	 		
            ResultSet rs = pStmt.executeQuery();
            
            while (rs.next()) {
            	/* Retrieves the value of the designated column in the current row 
            	   of this ResultSet object as a String in the Java programming language.
            	*/
            	ob1.setID(rs.getString("id"));
            	ob1.setName(rs.getString("name")); 
                ob1.setDept_name(rs.getString("dept_name"));
                ob1.setSalary(rs.getDouble("salary"));
            }
       }catch (SQLException e) {
    		 System.out.println(e.getMessage());
       }
		
		return ob1;
	
	}
}
