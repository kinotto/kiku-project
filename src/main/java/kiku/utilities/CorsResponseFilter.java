package kiku.utilities;

import javax.ws.rs.core.Response;



public class CorsResponseFilter{

	public static Response wrapResponse(Object bean){
		return Response.ok()
				.entity(bean)
				/*.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.header("Access-Control-Allow-Headers", "Content-Type")
	            .build();*/
			.header("Access-Control-Allow-Origin", "*")
	      .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
	      .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
		
	}

}
