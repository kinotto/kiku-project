package kiku.tictactoe.marshalling;

import javax.xml.bind.annotation.XmlRootElement;



@XmlRootElement
public class TboardClientModel {
	private String[] state;
	private String team;
	private WinnerClientModel winner;
	public TboardClientModel() {
		
	}
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String[] getState() {
		return state;
	}
	public void setState(String[] state) {
		this.state = state;
	}
	public WinnerClientModel getWinner() {
		return winner;
	}
	public void setWinner(WinnerClientModel winner) {
		this.winner = winner;
	}
	
}
