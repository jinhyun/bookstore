function initBoards() {
  bindBoards();
}

function bindBoards () {
  var boardSubjectElements = $("td[name*=boardSubjectTd]");

  for (var i = 0; i < boardSubjectElements.length; i++) {
    $("#" + boardSubjectElements[i].id).bind("click", function(){
      viewBoard($(this).data("board-uid"));
    });
  }
}

function viewBoard(boardUid) {
  var form = document.createElement("form");
  form.action = "/board/" + boardUid;
  form.method = "get";
  form.style.display = "none";
  document.body.appendChild(form);

  form.submit();

  document.body.removeChild(form);
}
