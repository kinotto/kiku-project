package resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import kiku.tictactoe.marshalling.TboardClientModel;
import kiku.tictactoe.marshalling.TboardMarshaller;
import kiku.tictactoe.marshalling.TboardServerModel;
import kiku.tictactoe.model.TicTacToeAIPlayer;
import kiku.tictactoe.model.TicTacToeBoard;
import kiku.tictactoe.model.TicTacToeBoard.Cell;
import kiku.tictactoe.model.TicTacToeBoard.Location;
import kiku.tictactoe.model.TicTacToeException;



@Path("game")
public class GameResource {

	TicTacToeAIPlayer aiPlayer;

	@POST
	@Produces(MediaType.APPLICATION_JSON) 
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes("text/plain")
	public TboardClientModel sayhello(TboardClientModel tBoardClient) {

	   System.out.println(tBoardClient);
	   TboardServerModel tBoardServer = null;
	   TicTacToeBoard gameBoard = null;

	   try {
		   tBoardServer = TboardMarshaller.unmarshalling(tBoardClient);
		   gameBoard = new TicTacToeBoard(tBoardServer.getState());
		   Cell aiTeam = gameBoard.oppositePlayer(tBoardServer.getTeam());
		   aiPlayer = new TicTacToeAIPlayer();
		   aiPlayer.initialize(aiTeam, gameBoard);
		   Location move = aiPlayer.makeMove();
		   if(move != null){
			   gameBoard.makeMove(aiTeam, move);
		   }
		   TboardMarshaller.marshalling(gameBoard, tBoardServer, tBoardClient);

	   } catch (TicTacToeException e) {
			e.printStackTrace();
	   }


	   return tBoardClient;
	}

}
