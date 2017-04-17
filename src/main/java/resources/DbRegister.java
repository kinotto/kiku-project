package resources;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.mysql.jdbc.Statement;



@Path("register")
public class DbRegister {
	

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes("text/plain")
	public Boolean login(User user) {
		
		System.out.println("Loading driver...");
		
		try {
		    Class.forName("com.mysql.jdbc.Driver");
		    System.out.println("Driver loaded!");
		} catch (ClassNotFoundException e) {
		    throw new IllegalStateException("Cannot find the driver in the classpath!", e);
		}
		
		String url = "jdbc:mysql://localhost:3306/trisDb";
		String username = "root";
		String password = "root";
		Connection connection;
		System.out.println("Connecting database...");

		try {
			connection = (Connection) DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
		    throw new IllegalStateException("Cannot connect the database!", e);
		}


		 PreparedStatement stmt;
		 Boolean found = true;
		 String query = "INSERT INTO Utenti(Id_Utente,Nome_Utente, Password) VALUES (null,?, ?)" ;
		 try {
			stmt = (PreparedStatement) connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS) ;
			stmt.setString(1, user.getUserName());
			stmt.setString(2, user.getPassword());
			stmt.executeUpdate();
			
			
			
			connection.close();
		} 
		 catch (SQLException e) {
			 found = false;
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		 
	   return found;
	}

}
