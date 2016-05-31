function initBoard() {
  bindBoard();
  bindBoardComment();
  getBoardComments();
}

function bindBoard() {
  $("#updateBoardFormBtn").bind("click", function() {
    gotoUpdateBoardForm();
  });

  $("#deleteBoardBtn").bind("click", function() {
    if (confirm("게시글 삭제시 댓글도 모두 삭제됩니다. \n삭제하시겠습니까?") == true) {
      deleteBoard();

    } else {
      return;
    }
  });
}

function bindBoardComment() {
  $("#createCommentBtn").bind("click", function() {
    createBoardComment();
  });
}

function getBoardComments() {
  $("#comment-container").load('/boardComments/' + $('#boardUid').val());
}

function deleteBoard() {
  if (!isAuthUpdateDelete) {
    alert('권한이 없습니다.');
    return;
  }

  var form = $("#boardDetailForm");
  form.attr({
    action: "/board/delete",
    method: "post"
  });
  form.submit();
}

function gotoUpdateBoardForm() {
  if (!isAuthUpdateDelete) {
    alert('권한이 없습니다.');
    return;
  }

  var form = $("#boardDetailForm");
  form.attr({
    action: "/board/updateForm",
    method: "post"
  });
  form.submit();
}

// TODO: 수정권한 체크
function isAuthUpdateDelete() {
  return true;
}

function showBoardCommentForm(boardCommentUid) {
  var commentContentsDivElement, textareaNode;

  commentContentsDivElement = $("#commentContentsDiv_" + boardCommentUid);

  textareaNode = $("<textarea>");
  textareaNode.attr({
    id: "commentContentsTextarea_" + boardCommentUid,
    className: "fixCommentTextArea",
    cols: 50,
    rows: 4
  });

  textareaNode.val(commentContentsDivElement.text());
  commentContentsDivElement.text("");
  textareaNode.appendTo(commentContentsDivElement);

  $("#commentUpdateDeleteDiv_" + boardCommentUid).hide();
  $("#commentConfirmCancelDiv_" + boardCommentUid).show();

  $("#showFormDeleteFuncDiv_" + boardCommentUid).hide();
  $("#updateCancelFuncDiv_" + boardCommentUid).show();
}

function cancelBoardComment(boardCommentUid) {
  var commentContentsTextareaElement = $("#commentContentsTextarea_" + boardCommentUid);

  $("#commentContentsDiv_" + boardCommentUid).text(commentContentsTextareaElement.val());
  commentContentsTextareaElement.remove();

  $("#commentUpdateDeleteDiv_" + boardCommentUid).show();
  $("#commentConfirmCancelDiv_" + boardCommentUid).hide();

  $("#showFormDeleteFuncDiv_" + boardCommentUid).show();
  $("#updateCancelFuncDiv_" + boardCommentUid).hide();
}

function updateBoardComment(boardCommentUid) {
  var commentRowIdx, boardComment, elementId;

  boardComment = {
    boardCommentUid  : boardCommentUid,
    boardCommentContents: $("#commentContentsTextarea_" + boardCommentUid).val()
  };

  $.ajax({
    url: "/boardComment/update",
    method: "post",
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function(resultBoardComment) {
      var updatedBoardCommentContents, commentContentsTextareaElement, commentContentsDivElement;

      updatedBoardCommentContents = resultBoardComment.boardCommentContents;

      commentContentsTextareaElement = $("#commentContentsTextarea_" + resultBoardComment.boardCommentUid);
      commentContentsDivElement = $("#commentContentsDiv_" + resultBoardComment.boardCommentUid);

      commentContentsDivElement.text(updatedBoardCommentContents);
      commentContentsTextareaElement.remove();

      $("#commentUpdateDeleteDiv_" + commentRowIdx).show();
      $("#commentConfirmCancelDiv_" + commentRowIdx).hide();

      $("#showFormDeleteFuncDiv_" + boardCommentUid).show();
      $("#updateCancelFuncDiv_" + boardCommentUid).hide();
    },
    error: function() {

    }
  });
}

function createBoardComment() {
  var url, method, boardComment;
  url = "/boardComment/create";
  method = 'post';

  boardComment = {
    boardCommentContents : $("#createCommentTextArea").val(),
    boardUid : $('#boardUid').val()
  };

  $.ajax({
    url: url,
    method: method,
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function(resultBoardComment) {
      addBoardComment(resultBoardComment);
    },
    error: function() {

    }
  });
}

function deleteBoardComment(boardCommentUid) {
  if (confirm("댓글을 삭제하시겠습니까?") == false) {
    return;
  }

  var boardComment = {
    boardCommentUid: boardCommentUid
  };

  $.ajax({
    url: '/boardComment/delete',
    method: 'post',
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function() {
      $("#commentDiv_" + boardCommentUid).remove();
    },
    error: function() {

    }
  });
}
