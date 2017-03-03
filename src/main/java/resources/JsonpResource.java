package resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import kiku.bean.Test;
import kiku.tictactoe.marshalling.TboardClientModel;
import kiku.tictactoe.marshalling.TboardMarshaller;
import kiku.tictactoe.marshalling.TboardServerModel;
import kiku.tictactoe.model.TicTacToeAIPlayer;
import kiku.tictactoe.model.TicTacToeBoard;
import kiku.tictactoe.model.TicTacToeException;
import kiku.tictactoe.model.TicTacToeBoard.Cell;
import kiku.tictactoe.model.TicTacToeBoard.Location;

import com.sun.jersey.api.json.JSONWithPadding;



@Path("hello")
public class JsonpResource { 

	TicTacToeAIPlayer aiPlayer;
	
	@POST
	@Produces({"application/javascript"})
	@Consumes(MediaType.APPLICATION_JSON)
	public JSONWithPadding sayhello(@QueryParam("callback") String callback,
			TboardClientModel tBoardClient) {
	   /*Test t = new Test();
	   t.setName("pippo");
	   t.setSurname("pluto");
	   return new JSONWithPadding(t, callback);*/
		
	   TboardServerModel tBoardServer = null;
	   TicTacToeBoard gameBoard = null;
	   
	   try {
		   tBoardServer = TboardMarshaller.unmarshalling(tBoardClient);
		   gameBoard = new TicTacToeBoard(tBoardServer.getState());
		   Cell aiTeam = gameBoard.oppositePlayer(tBoardServer.getTeam());
		   aiPlayer = new TicTacToeAIPlayer();
		   aiPlayer.initialize(aiTeam, gameBoard); 
		   Location move = aiPlayer.makeMove();
		   gameBoard.makeMove(aiTeam, move);
		   TboardMarshaller.marshalling(gameBoard, tBoardServer, tBoardClient);
		   
	   } catch (TicTacToeException e) {
			e.printStackTrace();
	   }
	   
	   return new JSONWithPadding(tBoardClient, callback);
	}
	
}