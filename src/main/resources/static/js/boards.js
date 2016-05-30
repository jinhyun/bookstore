function initBoards() {
  bindBoards();
}

function bindBoards () {
  var boardSubjectElements, commentRowIdx, thatId;
  boardSubjectElements = $("td[name*=boardSubjectTd]");

  for (var i = 0; i < boardSubjectElements.length; i++) {

    $("#" + boardSubjectElements[i].id).bind("click", function(){
      thatId = this.id;
      commentRowIdx = thatId.substring(thatId.lastIndexOf("_") + 1);

      viewBoard($("#boardUid_" + commentRowIdx).val());
    });
  }
}

function viewBoard(boardUid) {
  var form;

  form = $("<form>");
  form.attr({
    action: "/board/" + boardUid,
    method: "get"
  });

  form.hide();
  form.appendTo($(document.body));
  form.submit();
  form.remove();
}
