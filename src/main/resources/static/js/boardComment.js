var boardCommentModule = function() {
  var bind = function() {
    $("#createCommentBtn").bind("click", function() {
      createBoardComment();
    });
  };

  bind();
  getBoardComments();
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

var getBoardComments = function() {
  var boardUid = $('#boardDetailForm').data("board-uid");

  $.ajax({
    url: "/boardComments/" + boardUid,
    method: 'get',
    contentType: "application/json",
    async: false,
    success: function(boardComments) {
      for (var i = 0; i < boardComments.length;  i++){
        addBoardComment(boardComments[i]);
      }
    },
    error: function() {

    }
  });
};

var addBoardComment = function(boardComment) {
  var commentElement, commentUserNameElement, commentRegDateElement, commentContentsElement,
    commentRegDate, commentsRows, viewCommentDivElement;

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
  commentRegDateElement.innerText =
    commentRegDate.getFullYear() + "." + (commentRegDate.getMonth()+1) + "." + commentRegDate.getDate() + " " +
    commentRegDate.getHours() + ":" + commentRegDate.getMinutes();

  commentContentsElement = document.createElement("div");
  commentContentsElement.id = "commentContentsDiv_" + commentsRows;
  commentContentsElement.name = "commentContentsDiv_" + commentsRows;
  commentContentsElement.innerText = boardComment.boardCommentContents;

  commentElement.appendChild(commentUserNameElement);
  commentElement.appendChild(commentRegDateElement);
  commentElement.appendChild(commentContentsElement);

  viewCommentDivElement.appendChild(commentElement);

  viewCommentDivElement.dataset.boardCommentsRows = commentsRows;
};