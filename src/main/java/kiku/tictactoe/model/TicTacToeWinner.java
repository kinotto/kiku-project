package kiku.tictactoe.model;

import kiku.tictactoe.model.TicTacToeBoard.Cell;



public class TicTacToeWinner {
	private Cell cell;
	private int[] indexes;
	
	public TicTacToeWinner() {
		// TODO Auto-generated constructor stub
	}
	public TicTacToeWinner(Cell cell, int[] indexes) {
		setCell(cell);
		setIndexes(indexes);
	}
	public Cell getCell() {
		return cell;
	}
	
	public void setCell(Cell cell) {
		this.cell = cell;
	}
	public int[] getIndexes() {
		return indexes;
	}
	public void setIndexes(int[] indexes) {
		this.indexes = indexes;
	}
	
}
