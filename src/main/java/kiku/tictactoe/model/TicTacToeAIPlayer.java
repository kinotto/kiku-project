package kiku.tictactoe.model;

import java.util.*;

import kiku.tictactoe.model.TicTacToeBoard.Cell;
import kiku.tictactoe.model.TicTacToeBoard.Location;

public class TicTacToeAIPlayer {

	//private TicTacToeGame game;
	private Cell team;
	private TicTacToeBoard gameBoard;

	public void initialize(Cell team, TicTacToeBoard gameBoard) {
		this.team = team;
		this.gameBoard = gameBoard;
	}
	

	public Location makeMove() throws TicTacToeException {
		List<Location> possibleLocations = gameBoard.emptySlots();
		
		float thisScore;
		float bestScore = -1;
		Location bestMove = null;
		TicTacToeBoard currentBoard;
		
		for(Location l : possibleLocations) {
			currentBoard = gameBoard.copy();
			currentBoard.makeMove(team, l);
			thisScore = minimax(currentBoard, TicTacToeBoard.oppositePlayer(team));
			if(thisScore >= bestScore) {
				bestScore = thisScore;
				bestMove = l;
			}
		}
		
		return bestMove;
	}
	
	/*
	 * Find the best move based on the minimax algorithm
	 * http://en.wikipedia.org/wiki/Minimax
	 * This is the first iteration, where on Max
	 * We implement the first iteration here
	 * so we can find the best move
	 * instead of having min and max 
	 * return both a score and location
	 */	
	private int minimax(TicTacToeBoard board, Cell thisTeam) throws TicTacToeException {
		int maxScore = -1;
		int multiplyer = 1;
		if(thisTeam != team) {
			multiplyer = -1;
		}
		Winner winner = board.winner();
		if(winner != null) {
			return evaluateWinner(winner.getCell());
		}
		
		List<Location> possibleMoves = board.emptySlots();
		int thisScore;
		TicTacToeBoard currentBoard;
		
		for(Location l: possibleMoves) {
			currentBoard = board.copy();
			currentBoard.makeMove(thisTeam, l);
			thisScore = multiplyer*minimax(currentBoard, TicTacToeBoard.oppositePlayer(thisTeam));
			if(thisScore >= maxScore) {
				maxScore = thisScore;
			}
		}
		return multiplyer*maxScore;
	}

	private int evaluateWinner(Cell winner) {
		if((winner == null) || (winner == Cell.EMPTY)) {
			return 0;
		} else if(winner == team) {
			return 1;
		} else {
			return -1;
		}
	}
}
