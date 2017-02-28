package kiku.tictactoe.model;

import kiku.tictactoe.model.TicTacToeBoard.Cell;



public class Winner {
	private Cell cell;
	private int[] indexes;
	
	public Winner() {
		// TODO Auto-generated constructor stub
	}
	public Winner(Cell cell, int[] indexes) {
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
