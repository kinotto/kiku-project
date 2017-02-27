package resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import kiku.bean.Test;
import kiku.tictactoe.marshalling.TboardMatrix;
import kiku.utilities.CorsResponseFilter;

 
@Path("hellocors")
public class CorsResource { 

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes("text/plain") 
	public Response sayhello(TboardMatrix tMatrix) {
	
	   System.out.println(tMatrix);
	   Test t = new Test();
	   t.setName("corsname");
	   t.setSurname("corssurname");
	   return CorsResponseFilter.wrapResponse(t);

	}
	
}