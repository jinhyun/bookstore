<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Board detail</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/layouts.css'/> ">
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/board.css'/> ">

    <%-- JavaScript Library --%>
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/webjars/jquery-template/1.5.7/jquery.loadTemplate.min.js'/>"></script>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/board.js'/>"></script>

    <script>
        $(document).ready(function() {
            initBoard();
        });
    </script>
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1>Board detail</h1>
        <form id="boardDetailForm" name="boardDetailForm">
            <input id="boardUid" name="boardUid" type="hidden" value="<c:out value='${board.boardUid}'/>">
            <input id="boardRegUserUid" name="boardRegUserUid" type="hidden" value="<c:out value='${board.boardRegUserUid}'/>">
            <input id="loginUserUid" name="loginUserUid" type="hidden" value="<c:out value='${loginUser.userUid}'/>">

            <c:if test="${board.boardRegUserUid eq loginUser.userUid}">
            <div id="boardFuncDiv">
                <button type="button" id="updateBoardFormBtn">수정</button>
                <button type="button" id="deleteBoardBtn">삭제</button>
            </div>
            </c:if>
            <div>
                <p>제목: ${board.boardSubject}</p>
                <p>내용: ${board.boardContents}</p>
                <p>저자: ${board.boardAuthor}</p>
            </div>
        </form>

        <div id="viewCommentDiv">
            <input id="lastCommentRowIdx" type="hidden" value="0">
            <h4 class="viewCommentH4">댓글</h4>
            <div id="comment-container"></div>
        </div>

        <div id="createCommentDiv" class="createCommentDiv">
            <textarea id="createCommentTextArea" name="createCommentTextArea" class="fixCommentTextArea" cols="50" rows="4">멋져요</textarea>
            <button id="createCommentBtn">등록</button>
        </div>
    </div>
</body>
</html>
