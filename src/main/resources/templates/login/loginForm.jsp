<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Login Form</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <form name="loginForm" method="post" action="/login/loginForm">
            Email: <input type="text" id="email" name="email" value="IronMan@bookstore.com"/>
            </br></br>
            Password: <input type="text" id="password" name="password" value="1234"/>
            </br></br>
            <button type="submit">login</button>
        </form>
    </div>
</body>
</html>
