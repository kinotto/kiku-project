package kiku.tictactoe.marshalling;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class TboardMatrix {
	public String[] state;
	public TboardMatrix() {
		
	}
	public String[] getState() {
		return state;
	}
	public void setState(String[] state) {
		this.state = state;
	}

}
