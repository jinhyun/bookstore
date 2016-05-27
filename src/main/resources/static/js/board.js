function boardInit() {
  boardBind();
  boardCommentBind();
  getBoardComments();
}

function boardBind() {
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

function boardCommentBind() {
  $("#createCommentBtn").bind("click", function() {
    createBoardComment();
  });
}

function getBoardComments() {
  var boardUid = $('#boardDetailForm').data("board-uid");

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

  var form, inputBoardUidElement;
  form = document.getElementById("boardDetailForm");
  form.action = "/board/updateForm";
  form.method = "post";
  form.submit();
}

// TODO: 수정권한 체크
function isAuthUpdateDelete() {
  return true;
}

function showBoardCommentForm(element) {
  var boardCommentRow, commentContentsDivElement, textareaNode;

  boardCommentRow = element.dataset.boardCommentRow;
  commentContentsDivElement = document.getElementById("commentContentsDiv_" + boardCommentRow);

  textareaNode = document.createElement("textarea");
  textareaNode.innerText = commentContentsDivElement.innerText;
  textareaNode.className = "fixCommentTextArea";
  textareaNode.cols = 50;
  textareaNode.rows = 4;
  textareaNode.id = "commentContentsTextarea_" + boardCommentRow;

  commentContentsDivElement.innerText = "";
  commentContentsDivElement.appendChild(textareaNode);

  document.getElementById("commentUpdateDeleteDiv_" + boardCommentRow).style.display = "none";
  document.getElementById("commentConfirmCancelDiv_" + boardCommentRow).style.display = "block";
}

function cancelBoardComment(element) {
  var boardCommentRow, commentContentsTextareaElement, commentContentsDivElement;

  boardCommentRow = element.dataset.boardCommentRow;
  commentContentsTextareaElement = document.getElementById("commentContentsTextarea_" + boardCommentRow);
  commentContentsDivElement = document.getElementById("commentContentsDiv_" + boardCommentRow);

  commentContentsDivElement.innerText = commentContentsTextareaElement.value;
  commentContentsTextareaElement.remove();

  document.getElementById("commentUpdateDeleteDiv_" + boardCommentRow).style.display = "block";
  document.getElementById("commentConfirmCancelDiv_" + boardCommentRow).style.display = "none";
}

function updateBoardComment(element) {
  var boardCommentRow, boardComment;

  boardCommentRow = element.dataset.boardCommentRow;

  boardComment = {
    boardCommentUid  : document.getElementById("commentDiv_" + boardCommentRow).dataset.boardCommentUid,
    boardCommentContents: document.getElementById("commentContentsTextarea_" + boardCommentRow).value
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

      commentContentsTextareaElement = document.getElementById("commentContentsTextarea_" + boardCommentRow);
      commentContentsDivElement = document.getElementById("commentContentsDiv_" + boardCommentRow);

      commentContentsDivElement.innerText = updatedBoardCommentContents;
      commentContentsTextareaElement.remove();

      document.getElementById("commentUpdateDeleteDiv_" + boardCommentRow).style.display = "block";
      document.getElementById("commentConfirmCancelDiv_" + boardCommentRow).style.display = "none";
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
    boardUid : $('#boardDetailForm').data("board-uid")
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
  var boardComment, boardCommentRow;

  boardCommentRow = element.dataset.boardCommentRow;

  boardComment = {
    boardCommentUid : document.getElementById("commentDiv_" + boardCommentRow).dataset.boardCommentUid
  };

  $.ajax({
    url: '/boardComment/delete',
    method: 'post',
    data : JSON.stringify(boardComment),
    contentType: "application/json",
    async: false,
    success: function(resultBoardComment) {
      console.log(resultBoardComment);
      document.getElementById("commentDiv_" + boardCommentRow).remove();
    },
    error: function() {

    }
  });
}

function addBoardComment(boardComments) {
  var boardCommentsTemplate, viewCommentDivElement, commentsRows, boardComment;

  boardCommentsTemplate = [];
  viewCommentDivElement = document.getElementById("viewCommentDiv");
  commentsRows = parseInt(viewCommentDivElement.dataset.boardCommentsRows) + 1;

  for (var i = 0; i < boardComments.length; i++) {
    boardComment = {
      boardDataCommentRow: commentsRows,

      commentDiv_id: "commentDiv_" + commentsRows,
      commentDiv_class: "commentDiv",
      dataBoardCommentUid: boardComments[i].boardCommentUid,

      commentUserNameDiv_id: "commentUserNameDiv_" + commentsRows,
      commentUserNameDiv_class: "commentUserNameDiv",
      userName: boardComments[i].boardCommentUserName,

      commentRegDateDiv_id: "commentRegDateDiv_" + commentsRows,
      commentRegDateDiv_class: "commentRegDateDiv",
      regDate: boardComments[i].boardCommentRegDate,

      commentFuncDiv_id: "commentFuncDiv",
      commentFuncDiv_class: "commentFuncDiv",

      commentUpdateDeleteDiv_id: "commentUpdateDeleteDiv_" + commentsRows,
      showBoardCommentFormSpan_id: "showBoardCommentFormSpan_" + commentsRows,
      deleteBoardCommentFormSpan_id: "deleteBoardCommentFormSpan_" + commentsRows,

      commentConfirmCancelDiv_id: "commentConfirmCancelDiv_" + commentsRows,
      updateBoardCommentSpan_id: "updateBoardCommentSpan_" + commentsRows,
      cancelBoardCommentSpan_id: "cancelBoardCommentSpan_" + commentsRows,

      commentContentsDiv_id: "commentContentsDiv_" + commentsRows,
      commentContentsDiv_class: "commentContentsDiv",
      contents: boardComments[i].boardCommentContents
    };

    boardCommentsTemplate.push(boardComment);
    commentsRows = commentsRows + 1;
  }

  viewCommentDivElement.dataset.boardCommentsRows = commentsRows;
  $("#comment-container").loadTemplate($("#commentTemplate"), boardCommentsTemplate);
}