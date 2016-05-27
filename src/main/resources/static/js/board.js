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

  var form, inputBoardUidElement;
  form = document.getElementById("boardDetailForm");
  form.action = "/board/delete";
  form.method = "post";

  inputBoardUidElement = document.createElement("input");
  inputBoardUidElement.name = "boardUid";
  inputBoardUidElement.value = form.dataset.boardUid;
  inputBoardUidElement.type = "hidden";

  form.appendChild(inputBoardUidElement);
  form.submit();
}

function gotoUpdateBoardForm() {
  if (!isAuthUpdateDelete) {
    alert('권한이 없습니다.');
    return;
  }

  var form = document.getElementById("boardDetailForm");
  form.action = "/board/updateForm";
  form.method = "post";
  form.submit();
}

// TODO: 수정권한 체크
function isAuthUpdateDelete() {
  return true;
}

function showBoardCommentForm(element) {
  var commentRowIdx, commentContentsDivElement, textareaNode;

  commentRowIdx = element.id.substring(element.id.lastIndexOf("_") + 1);
  commentContentsDivElement = document.getElementById("commentContentsDiv_" + commentRowIdx);

  textareaNode = document.createElement("textarea");
  textareaNode.innerText = commentContentsDivElement.innerText;
  textareaNode.className = "fixCommentTextArea";
  textareaNode.cols = 50;
  textareaNode.rows = 4;
  textareaNode.id = "commentContentsTextarea_" + commentRowIdx;

  commentContentsDivElement.innerText = "";
  commentContentsDivElement.appendChild(textareaNode);

  document.getElementById("commentUpdateDeleteDiv_" + commentRowIdx).style.display = "none";
  document.getElementById("commentConfirmCancelDiv_" + commentRowIdx).style.display = "block";
}

function cancelBoardComment(element) {
  var commentRowIdx, commentContentsTextareaElement, commentContentsDivElement;

  commentRowIdx = element.id.substring(element.id.lastIndexOf("_") + 1);
  commentContentsTextareaElement = document.getElementById("commentContentsTextarea_" + commentRowIdx);
  commentContentsDivElement = document.getElementById("commentContentsDiv_" + commentRowIdx);

  commentContentsDivElement.innerText = commentContentsTextareaElement.value;
  commentContentsTextareaElement.remove();

  document.getElementById("commentUpdateDeleteDiv_" + commentRowIdx).style.display = "block";
  document.getElementById("commentConfirmCancelDiv_" + commentRowIdx).style.display = "none";
}

function updateBoardComment(element) {
  var commentRowIdx, boardComment;

  commentRowIdx = element.id.substring(element.id.lastIndexOf("_") + 1);

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
      // textarea > div

      commentContentsTextareaElement = document.getElementById("commentContentsTextarea_" + commentRowIdx);
      commentContentsDivElement = document.getElementById("commentContentsDiv_" + commentRowIdx);

      commentContentsDivElement.innerText = updatedBoardCommentContents;
      commentContentsTextareaElement.remove();

      document.getElementById("commentUpdateDeleteDiv_" + commentRowIdx).style.display = "block";
      document.getElementById("commentConfirmCancelDiv_" + commentRowIdx).style.display = "none";
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
  var boardComment, commentRowIdx;

  commentRowIdx = element.id.substring(element.id.lastIndexOf("_") + 1);

  boardComment = {
    boardCommentUid: $("#boardCommentUid_" + commentRowIdx).val()
  };

  $.ajax({
    url: '/boardComment/delete',
    method: 'post',
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function(resultBoardComment) {
      document.getElementById("commentDiv_" + commentRowIdx).remove();
    },
    error: function() {

    }
  });
}

function addBoardComment(boardComments) {
  var boardCommentsTemplate, lastCommentRowIdx, boardComment;

  boardCommentsTemplate = [];
  lastCommentRowIdx = parseInt($("#lastCommentRowIdx").val()) + 1;

  for (var i = 0; i < boardComments.length; i++) {
    boardComment = {
      commentDiv_idx: "commentDiv_" + lastCommentRowIdx,
      commentDiv_class: "commentDiv",

      boardCommentUid_idx: "boardCommentUid_" + lastCommentRowIdx,
      boardCommentUid: boardComments[i].boardCommentUid,

      commentUserNameDiv_idx: "commentUserNameDiv_" + lastCommentRowIdx,
      commentUserNameDiv_class: "commentUserNameDiv",
      userName: boardComments[i].boardCommentUserName,

      commentRegDateDiv_idx: "commentRegDateDiv_" + lastCommentRowIdx,
      commentRegDateDiv_class: "commentRegDateDiv",
      regDate: boardComments[i].boardCommentRegDate,

      commentFuncDiv_idx: "commentFuncDiv",
      commentFuncDiv_class: "commentFuncDiv",

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