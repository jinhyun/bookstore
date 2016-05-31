function initBoard() {
  getBoardComments();
}

function getBoardComments() {
  $("#comment-container").load('/boardComments/' + $('#boardUid').val());
}

function deleteBoard() {
  if (confirm("게시글 삭제시 댓글도 모두 삭제됩니다. \n삭제하시겠습니까?") == true) {
    var form = $("#boardDetailForm");
    form.attr({
      action: "/board/delete",
      method: "post"
    });

    form.submit();
  }
}

function gotoUpdateBoardForm() {
  var form = $("#boardDetailForm");
  form.attr({
    action: "/board/updateForm",
    method: "post"
  });

  form.submit();
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
  var boardComment = {
    boardCommentUid  : boardCommentUid,
    boardCommentContents: $("#commentContentsTextarea_" + boardCommentUid).val()
  };

  $.ajax({
    url: "/boardComment/update",
    method: "post",
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function() {
      getBoardComments();
    },
    error: function() {

    }
  });
}

function createBoardComment() {
  var boardComment = {
    boardCommentContents : $("#createCommentTextArea").val(),
    boardUid : $('#boardUid').val()
  };

  $.ajax({
    url: "/boardComment/create",
    method: "post",
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    success: function() {
      getBoardComments();
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
