var boardModule = function() {
  var bind = function() {
    $("#updateBoardFormBtn").bind("click", function() {
      updateBoardForm();
    });

    $("#deleteBoardBtn").bind("click", function() {
      if (confirm("게시글 삭제시 댓글도 모두 삭제됩니다. \n삭제하시겠습니까?") == true) {
        deleteBoard();

      } else {
        return;
      }
    });
  };

  bind();
};

var deleteBoard = function() {
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
};

var updateBoardForm = function() {
  if (!isAuthUpdateDelete) {
    alert('권한이 없습니다.');
    return;
  }

  var form, inputBoardUidElement;
  form = document.getElementById("boardDetailForm");
  form.action = "/board/updateForm";
  form.method = "post";

  inputBoardUidElement = document.createElement("input");
  inputBoardUidElement.name = "boardUid";
  inputBoardUidElement.value = form.dataset.boardUid;
  inputBoardUidElement.type = "hidden";

  form.appendChild(inputBoardUidElement);
  form.submit();
};

// TODO: 수정권한 체크
var isAuthUpdateDelete = function() {
  return true;
};