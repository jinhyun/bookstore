<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Create a new Board</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">

    <%-- JavaScript Library --%>
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1 id="menuNameH1">Create a new Board</h1>
        <form id="boardCreateForm" name="boardCreateForm" action="/board/create" method="post" data-board-uid="<c:out value="${board.boardUid}"/> ">
            <div>
                <p>도서명: <input id="boardSubject" name="boardSubject" type="text" value="${board.boardSubject}"></p>
                <p>소개글: <textarea id="boardContents" name="boardContents" cols="40" rows="3">${board.boardContents}</textarea></p>
                <p>저자: <input id="boardAuthor" name="boardAuthor" type="text" value="${board.boardAuthor}"></p>

                <p><button type="submit">submit</button></p>
            </div>
        </form>
    </div>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/boardCreate.js'/>"></script>
    <script>
        (function() {
            boardCreateModule();
        })();
    </script>
</body>
</html>
