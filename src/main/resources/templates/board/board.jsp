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
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1>Board detail</h1>
        <form id="boardDetailForm" name="boardDetailForm" data-board-uid="<c:out value='${board.boardUid}'/>">
            <div>
                <p>제목: ${board.boardSubject}</p>
                <p>내용: ${board.boardContents}</p>
                <p>저자: ${board.boardAuthor}</p>
            </div>
        </form>

        <div id="viewCommentDiv" data-board-comments-rows="0">
            <h4 class="viewCommentH4">댓글</h4>

            <%--<div id="commentDiv_10" class="commentDiv" data-board-comment-uid="1">
                <div id="commentUserNameDiv_10" class="commentUserNameDiv">Admin</div>
                <div id="commentRegDateDiv_10" class="commentRegDateDiv" >2016.5.24 0:0</div>
                <div id="commentFuncDiv" class="commentFuncDiv">
                    <div id="commentUpdateDeleteDiv_10">
                        <span id="showBoardCommentFormSpan_10" data-board-comment-row="10" onclick="showBoardCommentForm(this)">수정</span>
                        <span> | </span>
                        <span id="deleteBoardCommentSpan_10" data-board-comment-row="10">삭제</span>
                    </div>

                    <div id="commentConfirmCancelDiv_10" style="display: none">
                        <span id="updateBoardCommentSpan_10" data-board-comment-row="10" onclick="updateBoardComment(this)">확인</span>
                        <span> | </span>
                        <span id="cancelBoardCommentSpan_10" data-board-comment-row="10" onclick="cancelBoardComment(this)">취소</span>
                    </div>
                </div>
                <div id="commentContentsDiv_10" class="commentContentsDiv">수정 / 삭제 버튼 추가</div>
            </div>--%>
        </div>

        <div id="createCommentDiv" class="createCommentDiv">
            <textarea id="createCommentTextArea" name="createCommentTextArea" class="fixCommentTextArea" cols="50" rows="4">멋져요</textarea>
            <button id="createCommentBtn">등록</button>
        </div>
    </div>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/boardComment.js'/>"></script>
    <script>
        (function() {
            boardCommentModule();
        })();
    </script>
</body>
</html>
