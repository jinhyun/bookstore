var boardCreateModule = function() {
  if (isUpdateForm) {
    var form, inputBoardUidElement;
    form = document.getElementById("boardCreateForm");
    form.action = "/board/update";
    form.method = "post";

    inputBoardUidElement = document.createElement("input");
    inputBoardUidElement.name = "boardUid";
    inputBoardUidElement.value = form.dataset.boardUid;
    inputBoardUidElement.type = "hidden";
    form.appendChild(inputBoardUidElement);

  } else {
    // for Dev
    $("#boardSubject").val("new Subject");
    $("#boardContents").val("new Contents");
    $("#boardAuthor").val("new Author");
  }
};

var isUpdateForm = function() {
  if ($("#boardCreateForm").data("boardUid") > 0) {
    return true;

  } else {
    return false;
  }
};