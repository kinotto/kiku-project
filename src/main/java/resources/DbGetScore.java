package resources;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;



@Path("getScore")
public class DbGetScore {
	

	@GET
	@Produces(MediaType.APPLICATION_JSON) 

	//@Consumes("text/plain")
	public int[] getScore(@DefaultValue("All") @QueryParam(value = "Nome_Utente")  String username) {
		
		 Connection connection = ConnectionDb.init();
		 
		 PreparedStatement stmt;
		 int[] punteggiOttenuti = new int[3];
		 String query = "SELECT Punteggi.Vittorie,Punteggi.Pareggi,Punteggi.Sconfitte FROM Punteggi,Utenti WHERE Utenti.Id_Utente=Punteggi.Id_Utente AND Utenti.Nome_Utente=?";
		 try {
			stmt = (PreparedStatement) connection.prepareStatement(query) ;
			stmt.setString(1, username);
			ResultSet rs = stmt.executeQuery();
			
			while (rs.next()) {
				punteggiOttenuti[0] = rs.getInt(1);
				punteggiOttenuti[1] = rs.getInt(2);
				punteggiOttenuti[2] = rs.getInt(3);
		    }
			rs.close();
			connection.close();
		} 
		 catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		 
	return punteggiOttenuti;
	}

}