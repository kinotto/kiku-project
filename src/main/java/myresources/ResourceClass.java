package myresources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.json.JSONWithPadding;

import bean.Test;



@Path("hello")
public class ResourceClass { 

	@GET
	//@Produces(MediaType.APPLICATION_JSON)
	@Produces({"application/javascript"})
	public JSONWithPadding sayhello(@QueryParam("callback") String callback) {
	   Test t = new Test();
	   t.setName("pippo");
	   t.setSurname("pluto");
	   //return t;
	   return new JSONWithPadding(t, callback);
	}
	
}