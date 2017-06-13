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

	//Metodo che interroga il Db per verificare le credenziali utente al login
	public Boolean login(User user) {

		Connection connection = ConnectionDb.init(); //creo connessione con Db
		
		 PreparedStatement stmt;
		 Boolean found = false;
		 String query = "SELECT * FROM Utenti  WHERE Nome_Utente=? AND Password=?" ;
		 try {
			stmt = (PreparedStatement) connection.prepareStatement(query) ;
			stmt.setString(1, user.getUserName()); //imposto username prelevato dal campo di testo
			stmt.setString(2, user.getPassword());
			ResultSet rs = stmt.executeQuery(); //oggetto contenente risultato query

			//ciclo tutto il contenuto del risultato
			while (rs.next()) {
		        System.out.println(rs.getString(2));
		        System.out.println(rs.getString(3));
		        found = true;
		    }
			rs.close();
			connection.close();
		}
		 catch (SQLException e) {
			e.printStackTrace();
		}


	   return found; //se true le credenziali sono corrette
	}

}
