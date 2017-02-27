package kiku.tictactoe.marshalling;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class TboardMatrix {
	public String pippo;
	public TboardMatrix() {
		// TODO Auto-generated constructor stub
	}
	public String getPippo() {
		return pippo;
	}
	public void setPippo(String pippo) {
		this.pippo = pippo;
	}

}
