<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%String u=request.getParameter("uname");
        String p=request.getParameter("pwd");
        String param1=config.getInitParameter("un");
        String param2=config.getInitParameter("pwd");
        if(u.equals(param1)&&p.equals(param2))
        {
            %>
            <jsp:forward page="success.html"/>
              
            <%
        }
        else
{
%>
<jsp:forward page="login.html"/>
<%
}
        %>
    </body>
</html>