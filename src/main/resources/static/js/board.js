function initBoard() {
  bindBoard();
  bindBoardComment();
  getBoardComments();
  showBoardFuncBtns();
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
  addBoardCommentJsp();
  return;
  var boardUid = $('#boardUid').val();

  $.ajax({
    url: "/boardComments/" + boardUid,
    method: 'get',
    contentType: "application/json",
    async: false,
    success: function(boardComments) {
      debugger;
      //addBoardComment(boardComments);
      addBoardCommentJsp(boardComments);
    },
    error: function() {

    }
  });
}

function addBoardCommentJsp(boardComments) {
  var boardUid = $('#boardUid').val();
  $("#comment-container").load('/boardComments/' + boardUid);
}

function showBoardFuncBtns() {
  if (isSameTwoParams($("#loginUserUid").val(), $("#boardRegUserUid").val())) {
    $("#boardFuncDiv").show();
  }
}

function isSameTwoParams(a, b){
  if (a.toString().trim() == b.toString().trim()) {
    return true;

  } else {
    return false;
  }
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

function showBoardCommentFuncBtns(loginUserUid, boardCommentUserUid) {
  if (isSameTwoParams(loginUserUid, boardCommentUserUid)) {
    return "commentFuncDiv";

  } else {
    return "displayNone";
  }
}

function addBoardComment(boardComments) {
  if (!$.isArray(boardComments)){
    var boardCommentList = [];
    boardCommentList.push(boardComments);
    boardComments = boardCommentList;
  }
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
      commentFuncDiv_class: showBoardCommentFuncBtns(loginUserUid, boardComments[i].boardCommentUserUid),

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

    if (i < (boardComments.length - 1)) {
      // 마지막 카운트는 제외
      lastCommentRowIdx = lastCommentRowIdx + 1;
    }
  }

  $("#lastCommentRowIdx").val(lastCommentRowIdx);
  $("#comment-container").loadTemplate($("#commentTemplate"), boardCommentsTemplate, {
    append: true
  });
}
