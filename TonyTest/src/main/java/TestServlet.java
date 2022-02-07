

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class TestServlet
 */
@WebServlet("/login/callback")
public class TestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public TestServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//response.getWriter().append("Served at: ").append(request.getContextPath());
		
		//how to pull okta data from request??
		JsonObject json = new JsonObject();
		JsonArray todos = new JsonArray();
		
		//json.addProperty("firstName", request.getParameter("user[profile][firstName]"));
		
		request.setAttribute("test", "tony");
		
		//response.setContentType("application/json");
		//response.setCharacterEncoding("UTF-8");
		//response.getWriter().print(json);
		//response.getWriter().flush();
		//response.getWriter().close();
		return;
		//request.getRequestDispatcher("main.html").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//doGet(request, response);
		
		JsonObject json = new JsonObject();
		JsonArray todos = new JsonArray();
		
		json.addProperty("firstName", request.getParameter("user[profile][firstName]"));
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().print(json);
		response.getWriter().flush();
		response.getWriter().close();
		//request.getRequestDispatcher("/index.html").forward(request, response);
	}
	
	/*
	 * private JsonArray getTodoList(String userID) {
	 * 
	 * 
	 * 
	 * 
	 * }
	 */

}