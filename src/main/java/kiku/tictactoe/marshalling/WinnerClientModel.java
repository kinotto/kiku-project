package kiku.tictactoe.marshalling;

public class WinnerClientModel {
	private String team;
	private int[] indexes;
	public WinnerClientModel() {
		// TODO Auto-generated constructor stub
	}
	
	public int[] getIndexes() {
		return indexes;
	}
	public void setIndexes(int[] indexes) {
		this.indexes = indexes;
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
}
