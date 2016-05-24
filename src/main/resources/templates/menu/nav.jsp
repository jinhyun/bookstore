<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>nav</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">
</head>
<body>
    <div class="nav">
        <div><a href="/home">Home</a></div>
        <div><a href="/boards">게시글 목록</a></div>
        <div><a href="/board/create">게시글 생성</a></div>
        <div id="login"><a href="/login/loginForm">로그인</a></div>
        <div id="logout"><a href="/logout">로그아웃</a></div>
        <div id="userName"></div>
    </div>
    <script>
        var userEmail, userName, welcome;
        userEmail = "${pageContext.request.userPrincipal.name}";

        if (userEmail != "") {
            if (userEmail.indexOf("@") > 0) {
                userName = userEmail.substring(0, userEmail.indexOf("@"));

            } else {
                userName = userEmail;
            }

            welcome = userName + " 님 <br/> 환영합니다.";
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";

        } else {
            welcome = "로그인후 <br/> 이용바랍니다.";
            document.getElementById("login").style.display = "block";
            document.getElementById("logout").style.display = "none";
        }

        document.getElementById("userName").innerHTML = welcome;
    </script>
</body>
</html>
