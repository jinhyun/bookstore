<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:forEach var="boardComment" items="${boardComments}" varStatus="status">
    <div id="commentDiv_${boardComment.boardCommentUid}" class="commentDiv">
        <input type="hidden" id="boardCommentUid_${boardComment.boardCommentUid}" value="${boardComment.boardCommentUid}">
        <input type="hidden" id="boardCommentUserUid_${boardComment.boardCommentUid}" value="${boardComment.boardCommentUserUid}">

        <div class="commentUserNameDiv">${boardComment.boardCommentUserName}</div>
        <div class="commentRegDateDiv">${boardComment.boardCommentRegDate}</div>
        <div class="commentFuncDiv">
            <div id="showFormDeleteFuncDiv_${boardComment.boardCommentUid}">
                <span onclick="showBoardCommentForm('${boardComment.boardCommentUid}')">수정</span>
                <span> | </span>
                <span onclick="deleteBoardComment('${boardComment.boardCommentUid}')">삭제</span>
            </div>
            <div id="updateCancelFuncDiv_${boardComment.boardCommentUid}" style="display: none;">
                <span onclick="updateBoardComment('${boardComment.boardCommentUid}')">확인</span>
                <span> | </span>
                <span onclick="cancelBoardComment('${boardComment.boardCommentUid}')">취소</span>
            </div>
        </div>
        <div id="commentContentsDiv_${boardComment.boardCommentUid}" class="commentContentsDiv">${boardComment.boardCommentContents}</div>
    </div>
</c:forEach>