package myresources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import bean.Test;

 
@Path("hellocors")
public class CorsResource { 

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response sayhello() {
	   Test t = new Test();
	   t.setName("corsname");
	   t.setSurname("corssurname");
	   return Response.ok()
	            .header("Access-Control-Allow-Origin","*")
	            .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
	            .entity(t)
	            .build();
	   //return t;
	   //return new JSONWithPadding(t, callback);
	}
	
}