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
            <input id="loginUserUid" name="loginUserUid" type="hidden" value="<c:out value='${loginUser.loginUserUid}'/>">
            <div>
                <button id="updateBoardFormBtn">수정</button>
                <button id="deleteBoardBtn">삭제</button>
            </div>
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

    <script type="text/html" id="commentTemplate">
        <div data-id="commentDiv_idx" data-class="commentDiv_class">
            <input type="hidden" data-id="boardCommentUid_idx" data-value="boardCommentUid">
            <div data-id="commentUserNameDiv_idx" data-class="commentUserNameDiv_class" data-content="userName"></div>
            <div data-id="commentRegDateDiv_idx"  data-class="commentRegDateDiv_class" data-content="regDate"></div>
            <div data-id="commentFuncDiv_idx" data-class="commentFuncDiv_class">
                <div data-id="commentUpdateDeleteDiv_idx">
                    <span data-id="showBoardCommentFormSpan_idx" onclick="showBoardCommentForm(this)">수정</span>
                    <span> | </span>
                    <span data-id="deleteBoardCommentFormSpan_idx" onclick="deleteBoardComment(this)">삭제</span>
                </div>
                <div data-id="commentConfirmCancelDiv_idx" style="display: none;">
                    <span data-id="updateBoardCommentSpan_idx" onclick="updateBoardComment(this)">확인</span>
                    <span> | </span>
                    <span data-id="cancelBoardCommentSpan_idx" onclick="cancelBoardComment(this)">취소</span>
                </div>
            </div>
            <div data-id="commentContentsDiv_idx" data-class="commentContentsDiv_class" data-content="contents"></div>
        </div>
    </script>
</body>
</html>
