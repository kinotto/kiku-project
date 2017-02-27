package kiku.utilities;

import javax.ws.rs.core.Response;



public class CorsResponseFilter{

	public static Response wrapResponse(Object bean){
		return Response.ok()
	            .header("Access-Control-Allow-Origin","*")
	            .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
	            .entity(bean)
	            .build();

	}

}
