var boardModule = function() {
  var bind = function() {
    $("#updateBoardFormBtn").bind("click", function() {
      updateBoardForm();
    });
  };

  bind();
};

var updateBoardForm = function() {
  if (!isUpdateAuth) {
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
var isUpdateAuth = function() {
  return true;
};