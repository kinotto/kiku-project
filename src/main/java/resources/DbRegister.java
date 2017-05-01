package resources;

import java.sql.SQLException;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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

		Connection connection = ConnectionDb.init();


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
