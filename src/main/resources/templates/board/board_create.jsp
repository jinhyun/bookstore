<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Create a new Board</title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1>Create a new Board</h1>
        <form id="boardCreateForm" name="boardCreateForm" action="/board/create" method="post">
            <div>
                <p><input id="boardSubject" name="boardSubject" type="text" value="newSubject"></p>
                <p><input id="boardContents" name="boardContents" type="text" value="newContents"></p>
                <p><input id="boardAuthor" name="boardAuthor" type="text" value="newAuthor"></p>

                <p><button type="submit">submit</button></p>
            </div>
        </form>
    </div>
</body>
</html>
