var boardCommentModule = function() {
  var bind = function() {
    $("#createCommentBtn").bind("click", function() {
      createBoardComment();
    });
  };

  bind();
  getBoardComments();
};

var showBoardCommentForm = function(element) {
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
};

var cancelBoardComment = function(element) {
  var boardCommentRow, commentContentsTextareaElement, commentContentsDivElement;

  boardCommentRow = element.dataset.boardCommentRow;
  commentContentsTextareaElement = document.getElementById("commentContentsTextarea_" + boardCommentRow);
  commentContentsDivElement = document.getElementById("commentContentsDiv_" + boardCommentRow);

  commentContentsDivElement.innerText = commentContentsTextareaElement.value;
  commentContentsTextareaElement.remove();

  document.getElementById("commentUpdateDeleteDiv_" + boardCommentRow).style.display = "block";
  document.getElementById("commentConfirmCancelDiv_" + boardCommentRow).style.display = "none";
};

var updateBoardComment = function(element) {
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
};

var createBoardComment = function() {
  var url, method, data, boardComment;
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
};

var deleteBoardComment = function(element) {
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
};

var getBoardComments = function() {
  var boardUid = $('#boardDetailForm').data("board-uid");

  $.ajax({
    url: "/boardComments/" + boardUid,
    method: 'get',
    contentType: "application/json",
    async: false,
    success: function(boardComments) {
      addBoardCommentTemplate(boardComments);
    },
    error: function() {

    }
  });
};

var addBoardCommentTemplate = function(boardComments) {
  var boardCommentsTemplate, viewCommentDivElement, commentsRows, boardComment;

  boardCommentsTemplate = [];
  viewCommentDivElement = document.getElementById("viewCommentDiv");
  commentsRows = parseInt(viewCommentDivElement.dataset.boardCommentsRows) + 1;

  for (var i = 0; i < boardComments.length; i++) {
    boardComment = {
      boardDataCommentRow: commentsRows,

      commentDiv_id: "commentDiv_" + commentsRows,
      commentDiv_class: "commentDiv",

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
};

// 너무 너무 복잡함
var addBoardComment = function(boardComment) {
  var commentElement, commentUserNameElement, commentRegDateElement, commentContentsElement, commentRegDate,
    commentsRows, viewCommentDivElement, commentFuncElement, commentUpdateDeleteElement, showBoardCommentFormElement,
    deleteBoardCommentElement, commentConfirmCancelElement, updateBoardCommentElement, cancelBoardCommentElement,
    separatorShowDeleteElement, separatorUpdateCancleElement;

  viewCommentDivElement = document.getElementById("viewCommentDiv");
  commentsRows = parseInt(viewCommentDivElement.dataset.boardCommentsRows) + 1;

  commentElement = document.createElement("div");
  commentElement.id = "commentDiv_" + commentsRows;
  commentElement.name = "commentDiv_" + commentsRows;
  commentElement.className = "commentDiv";
  commentElement.dataset.boardCommentUid = boardComment.boardCommentUid;

  commentUserNameElement = document.createElement("div");
  commentUserNameElement.id = "commentUserNameDiv_" + commentsRows;
  commentUserNameElement.name = "commentUserNameDiv_" + commentsRows;
  commentUserNameElement.innerText = boardComment.boardCommentUserName;
  commentUserNameElement.className = "commentUserNameDiv";

  commentRegDateElement = document.createElement("div");
  commentRegDate = new Date(boardComment.boardCommentRegDate);
  commentRegDateElement.id = "commentRegDateDiv_" + commentsRows;
  commentRegDateElement.name = "commentRegDateDiv_" + commentsRows;
  commentRegDateElement.className = "commentRegDateDiv";
  commentRegDateElement.innerText =
    commentRegDate.getFullYear() + "." + (commentRegDate.getMonth()+1) + "." + commentRegDate.getDate() + " " +
    commentRegDate.getHours() + ":" + commentRegDate.getMinutes();

  commentFuncElement = document.createElement("div");
  commentFuncElement.id = "commentFuncDiv";
  commentFuncElement.className = "commentFuncDiv";

    commentUpdateDeleteElement = document.createElement("div");
    commentUpdateDeleteElement.id = "commentUpdateDeleteDiv_" + commentsRows;

      showBoardCommentFormElement = document.createElement("span");
      showBoardCommentFormElement.id = "showBoardCommentFormSpan_" + commentsRows;
      showBoardCommentFormElement.dataset.boardCommentRow = commentsRows;
      showBoardCommentFormElement.innerText = "수정";
      showBoardCommentFormElement.addEventListener("click", function(){
        showBoardCommentForm(this);
      });

      separatorShowDeleteElement = document.createElement("span");
      separatorShowDeleteElement.innerText = " | ";

      deleteBoardCommentElement = document.createElement("span");
      deleteBoardCommentElement.id = "deleteBoardCommentFormSpan_" + commentsRows;
      deleteBoardCommentElement.dataset.boardCommentRow = commentsRows;
      deleteBoardCommentElement.innerText = "삭제";
      deleteBoardCommentElement.addEventListener("click", function(){
        deleteBoardComment(this);
      });

      commentUpdateDeleteElement.appendChild(showBoardCommentFormElement);
      commentUpdateDeleteElement.appendChild(separatorShowDeleteElement);
      commentUpdateDeleteElement.appendChild(deleteBoardCommentElement);

    commentConfirmCancelElement = document.createElement("div");
    commentConfirmCancelElement.id = "commentConfirmCancelDiv_" + commentsRows;
    commentConfirmCancelElement.style.display = "none";

      updateBoardCommentElement = document.createElement("span");
      updateBoardCommentElement.id = "updateBoardCommentSpan_" + commentsRows;
      updateBoardCommentElement.dataset.boardCommentRow = commentsRows;
      updateBoardCommentElement.innerText = "확인";
      updateBoardCommentElement.addEventListener("click", function(){
        updateBoardComment(this);
      });

      separatorUpdateCancleElement = document.createElement("span");
      separatorUpdateCancleElement.innerText = " | ";

      cancelBoardCommentElement = document.createElement("span");
      cancelBoardCommentElement.id = "cancelBoardCommentSpan_" + commentsRows;
      cancelBoardCommentElement.dataset.boardCommentRow = commentsRows;
      cancelBoardCommentElement.innerText = "취소";
      cancelBoardCommentElement.addEventListener("click", function(){
        cancelBoardComment(this);
      });

      commentConfirmCancelElement.appendChild(updateBoardCommentElement);
      commentConfirmCancelElement.appendChild(separatorUpdateCancleElement);
      commentConfirmCancelElement.appendChild(cancelBoardCommentElement);

    commentFuncElement.appendChild(commentUpdateDeleteElement);
    commentFuncElement.appendChild(commentConfirmCancelElement);

  commentContentsElement = document.createElement("div");
  commentContentsElement.id = "commentContentsDiv_" + commentsRows;
  commentContentsElement.name = "commentContentsDiv_" + commentsRows;
  commentContentsElement.innerText = boardComment.boardCommentContents;
  commentContentsElement.className = "commentContentsDiv";

  commentElement.appendChild(commentUserNameElement);
  commentElement.appendChild(commentRegDateElement);
  commentElement.appendChild(commentFuncElement);
  commentElement.appendChild(commentContentsElement);

  viewCommentDivElement.appendChild(commentElement);
  viewCommentDivElement.dataset.boardCommentsRows = commentsRows;
};