function initBoardCreate() {
  showByFormType();
}

function showByFormType() {
  if (formType() == 'update') {
    var form, inputBoardUidElement;
    document.getElementById("updateH1").style.display = "block";

    form = document.getElementById("boardCreateForm");
    form.action = "/board/update";
    form.method = "post";

    inputBoardUidElement = document.createElement("input");
    inputBoardUidElement.name = "boardUid";
    inputBoardUidElement.value = form.dataset.boardUid;
    inputBoardUidElement.type = "hidden";
    form.appendChild(inputBoardUidElement);

  } else if (formType() == 'create') {
    document.getElementById("createH1").style.display = "block";

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