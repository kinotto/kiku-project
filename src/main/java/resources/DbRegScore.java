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
import com.mysql.jdbc.Statement;



@Path("regScore")
public class DbRegScore {


	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes("text/plain")
	public void regScore(Score punteggi) {

		Connection connection = ConnectionDb.init();


		 PreparedStatement stmt;
		 
		 String query1 = "SELECT Id_Utente FROM Utenti WHERE Nome_Utente=?";
		 String query = "INSERT INTO Punteggi(Id,Vittorie,Pareggi,Sconfitte, Id_Utente) VALUES (null,?,?,?, ?) ON DUPLICATE KEY UPDATE Vittorie=VALUES(Vittorie), Pareggi=VALUES(Pareggi), Sconfitte=VALUES(Sconfitte)";
		 
		 int id_utente=0;
		 try {
				stmt = (PreparedStatement) connection.prepareStatement(query1) ;
				stmt.setString(1, punteggi.getUsername());
				ResultSet rs = stmt.executeQuery();
				
				while (rs.next()) {
					id_utente = rs.getInt(1);
			    }
				rs.close();
			} 
			 catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		 try {
			stmt = (PreparedStatement) connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS) ;
			stmt.setInt(1, punteggi.getVittorie());
			stmt.setInt(2, punteggi.getPareggi());
			stmt.setInt(3, punteggi.getSconfitte());
			stmt.setInt(4, id_utente);
			stmt.executeUpdate();



			connection.close();
		}
		 catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
