<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Create a new Board</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">

    <%-- JavaScript Library --%>
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/boardCreate.js'/>"></script>
    <script>
        $(document).ready(function() {
            initBoardCreate();
        });
    </script>
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1 id="createH1" style="display: none">Create a new Board</h1>
        <h1 id="updateH1" style="display: none">Update a Board</h1>
        <form id="boardCreateForm" name="boardCreateForm">
            <input type="text" id="boardUid" name="boardUid" value="<c:out value="${board.boardUid}"/>">

            <div>
                <p>도서명: <input id="boardSubject" name="boardSubject" type="text" value="<c:out value="${board.boardSubject}"/>"></p>
                <p>소개글: <textarea id="boardContents" name="boardContents" cols="40" rows="3"><c:out value="${board.boardContents}"/></textarea></p>
                <p>저자: <input id="boardAuthor" name="boardAuthor" type="text" value="<c:out value="${board.boardAuthor}"/>"></p>

                <p><button type="submit" id="boardSubmit">submit</button></p>
            </div>
        </form>
    </div>
</body>
</html>
