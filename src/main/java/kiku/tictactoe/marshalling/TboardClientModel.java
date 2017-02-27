package kiku.tictactoe.marshalling;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class TboardClientModel {
	public String[] state;
	private String team;
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

	
}
