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
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1>Board detail</h1>
        <form id="boardDetailForm" name="boardDetailForm" data-board-uid="<c:out value='${board.boardUid}'/>" data-login-user-uid="<c:out value='${loginUser.userUid}'/>">
            <input type="hidden" value="kakak">
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

        <div id="viewCommentDiv" data-board-comments-rows="0">
            <h4 class="viewCommentH4">댓글</h4>
            <div id="comment-container"></div>
        </div>

        <div id="createCommentDiv" class="createCommentDiv">
            <textarea id="createCommentTextArea" name="createCommentTextArea" class="fixCommentTextArea" cols="50" rows="4">멋져요</textarea>
            <button id="createCommentBtn">등록</button>
        </div>
    </div>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/board.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/static/js/boardComment.js'/>"></script>

    <script type="text/html" id="commentTemplate">
        <div data-id="commentDiv_id" data-class="commentDiv_class" data-template-bind='[{"attribute": "data-board-comment-uid", "value":"dataBoardCommentUid"}]'>
            <div data-id="commentUserNameDiv_id" data-class="commentUserNameDiv_class" data-content="userName"></div>
            <div data-id="commentRegDateDiv_id"  data-class="commentRegDateDiv_class" data-content="regDate"></div>
            <div data-id="commentFuncDiv_id" data-class="commentFuncDiv_class">
                <div data-id="commentUpdateDeleteDiv_id">
                    <span data-id="showBoardCommentFormSpan_id" data-template-bind='[{"attribute": "data-board-comment-row", "value":"boardDataCommentRow"}]' onclick="showBoardCommentForm(this)">수정</span>
                    <span> | </span>
                    <span data-id="deleteBoardCommentFormSpan_id" data-template-bind='[{"attribute": "data-board-comment-row", "value":"boardDataCommentRow"}]' onclick="deleteBoardComment(this)">삭제</span>
                </div>
                <div data-id="commentConfirmCancelDiv_id" style="display: none;">
                    <span data-id="updateBoardCommentSpan_id" data-template-bind='[{"attribute": "data-board-comment-row", "value":"boardDataCommentRow"}]' onclick="updateBoardComment(this)">확인</span>
                    <span> | </span>
                    <span data-id="cancelBoardCommentSpan_id" data-template-bind='[{"attribute": "data-board-comment-row", "value":"boardDataCommentRow"}]' onclick="cancelBoardComment(this)">취소</span>
                </div>
            </div>
            <div data-id="commentContentsDiv_id" data-class="commentContentsDiv_class" data-content="contents"></div>
        </div>
    </script>

    <script>
        (function() {
            boardModule();
            boardCommentModule();
        })();
    </script>
</body>
</html>
