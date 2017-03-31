package kiku.tictactoe.marshalling;

import kiku.tictactoe.model.TicTacToeBoard.Cell;

public class TboardServerModel {
	private Cell[] state;
	private Cell team;
	public TboardServerModel() {
		// TODO Auto-generated constructor stub
	}
	
	public TboardServerModel(Cell team, Cell[] state) {
		setTeam(team);
		setState(state);
	}
	
	public Cell[] getState() {
		return state;
	}
	public Cell getTeam() {
		return team;
	}
	public void setState(Cell[] state) {
		this.state = state;
	}
	public void setTeam(Cell team) {
		this.team = team;
	}
}
