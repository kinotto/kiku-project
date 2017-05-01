package resources;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class ConnectionDb {
	public static Connection init(){
System.out.println("Loading driver...");
		
		try {
		    Class.forName("com.mysql.jdbc.Driver");
		    System.out.println("Driver loaded!");
		} catch (ClassNotFoundException e) {
		    throw new IllegalStateException("Cannot find the driver in the classpath!", e);
		}
		
		String url = "jdbc:mysql://10.0.0.18:3306/trisDb";
		String username = "root";
		String password = "root";
		Connection connection;
		System.out.println("Connecting database...");

		try {
			connection = (Connection) DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
		    throw new IllegalStateException("Cannot connect the database!", e);
		}
		return connection;
	}
}
