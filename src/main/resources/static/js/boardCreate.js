function initBoardCreate() {
  showByFormType();
}

function showByFormType() {
  if (formType() == 'update') {
    var form, inputBoardUidElement;
    $("#updateH1").show();

    form = document.getElementById("boardCreateForm");
    form.action = "/board/update";
    form.method = "post";

    inputBoardUidElement = document.createElement("input");
    inputBoardUidElement.name = "boardUid";
    inputBoardUidElement.value = form.dataset.boardUid;
    inputBoardUidElement.type = "hidden";
    form.appendChild(inputBoardUidElement);

  } else if (formType() == 'create') {
    $("#createH1").show();

    // for Dev
    $("#boardSubject").val("new Subject");
    $("#boardContents").val("new Contents");
    $("#boardAuthor").val("new Author");
  }
}


function formType() {
  if ($("#boardCreateForm").data("boardUid") > 0) {
    return 'update';

  } else {
    return 'create';
  }
}