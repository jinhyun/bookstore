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
  var boardUid = $('#boardUid').val();

  $.ajax({
    url: "/boardComments/" + boardUid,
    method: 'get',
    contentType: "application/json",
    async: false,
    success: function(boardComments) {
      addBoardComment(boardComments);
    },
    error: function() {

    }
  });
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

function showBoardCommentForm(element) {
  var commentRowIdx, commentContentsDivElement, textareaNode, elementId;

  elementId = element.id;
  commentRowIdx = elementId.substring(elementId.lastIndexOf("_") + 1);
  commentContentsDivElement = $("#commentContentsDiv_" + commentRowIdx);

  textareaNode = $("<textarea>");
  textareaNode.attr({
    id: "commentContentsTextarea_" + commentRowIdx,
    className: "fixCommentTextArea",
    cols: 50,
    rows: 4
  });

  textareaNode.val(commentContentsDivElement.text());
  commentContentsDivElement.text("");
  textareaNode.appendTo(commentContentsDivElement);

  $("#commentUpdateDeleteDiv_" + commentRowIdx).hide();
  $("#commentConfirmCancelDiv_" + commentRowIdx).show();
}

function cancelBoardComment(element) {
  var commentRowIdx, commentContentsTextareaElement, commentContentsDivElement, elementId;

  elementId = element.id;
  commentRowIdx = elementId.substring(elementId.lastIndexOf("_") + 1);
  commentContentsTextareaElement = $("#commentContentsTextarea_" + commentRowIdx);
  commentContentsDivElement = $("#commentContentsDiv_" + commentRowIdx);

  commentContentsDivElement.text(commentContentsTextareaElement.val());
  commentContentsTextareaElement.remove();

  $("#commentUpdateDeleteDiv_" + commentRowIdx).show();
  $("#commentConfirmCancelDiv_" + commentRowIdx).hide();
}

function updateBoardComment(element) {
  var commentRowIdx, boardComment, elementId;

  elementId = element.id;
  commentRowIdx = elementId.substring(elementId.lastIndexOf("_") + 1);

  boardComment = {
    boardCommentUid  : $("#boardCommentUid_" + commentRowIdx).val(),
    boardCommentContents: $("#commentContentsTextarea_" + commentRowIdx).val()
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

      commentContentsTextareaElement = $("#commentContentsTextarea_" + commentRowIdx);
      commentContentsDivElement = $("#commentContentsDiv_" + commentRowIdx);

      commentContentsDivElement.text(updatedBoardCommentContents);
      commentContentsTextareaElement.remove();

      $("#commentUpdateDeleteDiv_" + commentRowIdx).show();
      $("#commentConfirmCancelDiv_" + commentRowIdx).hide();
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

function deleteBoardComment(element) {
  if (confirm("댓글을 삭제하시겠습니까?") == false) {
    return;
  }
  var boardComment, commentRowIdx, elementId;

  elementId = element.id;
  commentRowIdx = elementId.substring(elementId.lastIndexOf("_") + 1);

  boardComment = {
    boardCommentUid: $("#boardCommentUid_" + commentRowIdx).val()
  };

  $.ajax({
    url: '/boardComment/delete',
    method: 'post',
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function() {
      $("#commentDiv_" + commentRowIdx).remove();
    },
    error: function() {

    }
  });
}

function commentFuncClass(loginUserUid, boardCommentUserUid) {
  if (loginUserUid == boardCommentUserUid) {
    return "commentFuncDiv";

  } else {
    return "displayNone";
  }
}

function addBoardComment(boardComments) {
  var boardCommentsTemplate, lastCommentRowIdx, boardComment, loginUserUid;

  boardCommentsTemplate = [];
  lastCommentRowIdx = parseInt($("#lastCommentRowIdx").val()) + 1;
  loginUserUid = $("#loginUserUid").val();

  for (var i = 0; i < boardComments.length; i++) {
    boardComment = {
      commentDiv_idx: "commentDiv_" + lastCommentRowIdx,
      commentDiv_class: "commentDiv",

      boardCommentUid_idx: "boardCommentUid_" + lastCommentRowIdx,
      boardCommentUid: boardComments[i].boardCommentUid,

      boardCommentUserUid_idx: "boardCommentUserUid_" + lastCommentRowIdx,
      boardCommentUserUid: boardComments[i].boardCommentUserUid,

      commentUserNameDiv_idx: "commentUserNameDiv_" + lastCommentRowIdx,
      commentUserNameDiv_class: "commentUserNameDiv",
      userName: boardComments[i].boardCommentUserName,

      commentRegDateDiv_idx: "commentRegDateDiv_" + lastCommentRowIdx,
      commentRegDateDiv_class: "commentRegDateDiv",
      regDate: boardComments[i].boardCommentRegDate,

      commentFuncDiv_idx: "commentFuncDiv",
      commentFuncDiv_class: commentFuncClass(loginUserUid, boardComments[i].boardCommentUserUid),

      commentUpdateDeleteDiv_idx: "commentUpdateDeleteDiv_" + lastCommentRowIdx,
      showBoardCommentFormSpan_idx: "showBoardCommentFormSpan_" + lastCommentRowIdx,
      deleteBoardCommentFormSpan_idx: "deleteBoardCommentFormSpan_" + lastCommentRowIdx,

      commentConfirmCancelDiv_idx: "commentConfirmCancelDiv_" + lastCommentRowIdx,
      updateBoardCommentSpan_idx: "updateBoardCommentSpan_" + lastCommentRowIdx,
      cancelBoardCommentSpan_idx: "cancelBoardCommentSpan_" + lastCommentRowIdx,

      commentContentsDiv_idx: "commentContentsDiv_" + lastCommentRowIdx,
      commentContentsDiv_class: "commentContentsDiv",
      contents: boardComments[i].boardCommentContents
    };

    boardCommentsTemplate.push(boardComment);
    lastCommentRowIdx = lastCommentRowIdx + 1;
  }

  $("#lastCommentRowIdx").val(lastCommentRowIdx);
  $("#comment-container").loadTemplate($("#commentTemplate"), boardCommentsTemplate);
}
