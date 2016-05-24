<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Board detail</title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/board.css'/> ">
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>
</head>
<body>
    <h1>Board detail</h1>
    <form id="boardDetailForm" name="boardDetailForm">
        <div>
            <p>제목: ${board.boardSubject}</p>
            <p>내용: ${board.boardContents}</p>
            <p>저자: ${board.boardAuthor}</p>
        </div>
    </form>

    <div id="createCommentDiv">
        <textarea id="createCommentTextArea" name="createCommentTextArea" cols="50" rows="4">멋져요</textarea>
        <button id="createCommentBtn">등록</button>
    </div>

    <script type="text/javascript" src="<c:url value='/static/js/boardComment.js'/>"></script>
    <script>
        (function() {
            boardCommentModule();
        })();
    </script>
</body>
</html>