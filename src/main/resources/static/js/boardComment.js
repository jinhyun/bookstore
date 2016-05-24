var boardCommentModule = function() {
  var bind = function() {
    $("#createCommentBtn").bind("click", function() {
      createBoardComment();
    });
  };

  bind();
};

var createBoardComment = function() {
  var url, method, data, boardComment;
  url = "/boardComment/create";
  method = 'post';

  boardComment = {
    boardCommentContents : $("#createCommentTextArea").val()
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

var addBoardComment = function(boardComment) {
  var commentElement, commentUserNameElement, commentRegDateElement, commentContentsElement,
    commentRegDate, idx;

  idx = 1;  //TODO: tempIdx
  commentElement = document.createElement("div");
  commentElement.id = "comment_" + idx;
  commentElement.name = "comment_" + idx;
  commentElement.className = "commentDiv";

  commentUserNameElement = document.createElement("div");
  commentUserNameElement.id = "commentName_" + idx;
  commentUserNameElement.name = "commentName_" + idx;
  commentUserNameElement.innerText = boardComment.boardCommentUserName;
  commentUserNameElement.className = "commentNameDiv";

  commentRegDateElement = document.createElement("div");
  commentRegDate = new Date(boardComment.boardCommentRegDate);
  commentRegDateElement.id = "commentRegDate_" + idx;
  commentRegDateElement.name = "commentRegDate_" + idx;
  commentRegDateElement.innerText =
    commentRegDate.getFullYear() + "." + (commentRegDate.getMonth()+1) + "." + commentRegDate.getDate() + " " +
    commentRegDate.getHours() + ":" + commentRegDate.getMinutes();

  commentContentsElement = document.createElement("div");
  commentContentsElement.id = "commentContents_" + idx;
  commentContentsElement.name = "commentContents_" + idx;
  commentContentsElement.innerText = boardComment.boardCommentContents;

  commentElement.appendChild(commentUserNameElement);
  commentElement.appendChild(commentRegDateElement);
  commentElement.appendChild(commentContentsElement);

  $("#viewCommentDiv").append(commentElement);
};