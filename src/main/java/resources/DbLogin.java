package resources;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;



@Path("login")
public class DbLogin {
	

	@POST
	@Produces(MediaType.APPLICATION_JSON) 
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes("text/plain")
	public Boolean login(User user) {
		
		Connection connection = ConnectionDb.init();


		 PreparedStatement stmt;
		 Boolean found = false;
		 String query = "SELECT * FROM Utenti  WHERE Nome_Utente=? AND Password=?" ;
		 try {
			stmt = (PreparedStatement) connection.prepareStatement(query) ;
			stmt.setString(1, user.getUserName());
			stmt.setString(2, user.getPassword());
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
		        System.out.println(rs.getString(2));
		        System.out.println(rs.getString(3));
		        found = true;
		    }
			rs.close();
			connection.close();
		} 
		 catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		 
	   return found;
	}

}
