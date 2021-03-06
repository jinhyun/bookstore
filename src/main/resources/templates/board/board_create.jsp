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
        <form id="boardCreateForm" name="boardCreateForm">
            <c:choose>
                <c:when test="${empty board.boardUid || board.boardUid < 1}">
                    <h1 id="createH1">Create a new Board</h1>
                    <input type="hidden" id="formType" value="create">
                </c:when>
                <c:otherwise>
                    <h1 id="updateH1">Update a Board</h1>
                    <input type="hidden" id="boardUid" name="boardUid" value="${board.boardUid}">
                    <input type="hidden" id="formType" value="update">
                </c:otherwise>
            </c:choose>

            <div>
                <p>도서명: <input id="boardSubject" name="boardSubject" type="text" value="<c:out value="${board.boardSubject}"/>"></p>
                <p>소개글: <textarea id="boardContents" name="boardContents" cols="40" rows="3"><c:out value="${board.boardContents}"/></textarea></p>
                <p>저자: <input id="boardAuthor" name="boardAuthor" type="text" value="<c:out value="${board.boardAuthor}"/>"></p>

                <p><button type="submit" id="boardSubmit">저장</button></p>
            </div>
        </form>
    </div>
</body>
</html>
