package kiku.tictactoe.marshalling;

import java.util.HashMap;
import java.util.Map;

import kiku.tictactoe.model.TicTacToeBoard;
import kiku.tictactoe.model.TicTacToeBoard.Cell;
import kiku.tictactoe.model.TicTacToeBoard.Location;
import kiku.tictactoe.model.TicTacToeException;
import kiku.tictactoe.model.Winner;

public class TboardMarshaller {
	private static Map<String, Cell> mappingCtoS;
	private static Map<Cell, String> mappingStoC;
	static{
		mappingCtoS = new HashMap<String, Cell>();
		mappingCtoS.put("O", Cell.O);
		mappingCtoS.put("o", Cell.O);
		mappingCtoS.put("X", Cell.X);
		mappingCtoS.put("x", Cell.X);
		mappingCtoS.put(new String(""), Cell.EMPTY);
		
		mappingStoC = new HashMap<>();
		mappingStoC.put(Cell.X, "X");
		mappingStoC.put(Cell.O, "O");
		mappingStoC.put(Cell.EMPTY, new String(""));
	}
	
	public static TboardServerModel unmarshalling(TboardClientModel rawBoard) throws TicTacToeException{

		Cell[] state = new Cell[TicTacToeBoard.WIDTH * TicTacToeBoard.HEIGHT];
		for(int i=0; i<rawBoard.getState().length; i++){
			Cell val = mappingCtoS.get(rawBoard.getState()[i]);
			if(val == null){
				throw new TicTacToeException("mapping map has invalid value");
			}
			state[i] = val;
		}
		
		Cell team = mappingCtoS.get(rawBoard.getTeam());
		if(team == null){
			throw new TicTacToeException("no team provided for the opponent");
		}
		return new TboardServerModel(team, state);
	}
	
	public static void marshalling(TicTacToeBoard gameBoard, 
			TboardServerModel tBoardServer, TboardClientModel tBoardClient) 
					throws TicTacToeException{

		String[] cells = new String[TicTacToeBoard.NUM_CELLS];
		int indexCell = 0;
		for(int y=0; y<TicTacToeBoard.HEIGHT; y++){
			for(int x=0; x<TicTacToeBoard.WIDTH; x++){
				Cell c = gameBoard.cellAt(new Location(x, y));
				if(c == null){
					throw new TicTacToeException("mapping map has invalid value");
				}
				cells[indexCell++] = mappingStoC.get(c);
			}
		}
		String team = mappingStoC.get(tBoardServer.getTeam());
		if(team == null){
			throw new TicTacToeException("mapping map has invalid value");
		}
		
		Winner winner = gameBoard.winner();
		WinnerClientModel w = new WinnerClientModel();

		if(winner != null && winner.getIndexes() != null){
			w.setIndexes(winner.getIndexes());
			w.setTeam(mappingStoC.get(winner.getCell()));
		}
		else{
			w.setIndexes(new int[0]);
			w.setTeam(mappingStoC.get(Cell.EMPTY));
		}
		
		tBoardClient.setWinner(w);
		tBoardClient.setState(cells);
		tBoardClient.setTeam(team);
		
	}
}
