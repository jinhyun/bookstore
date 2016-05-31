function viewBoard(boardUid) {
  var form;

  form = $("<form>");
  form.attr({
    action: "/board/" + boardUid,
    method: "get"
  });

  //form.hide();
  form.appendTo($(document.body));
  form.submit();
  //form.remove();
}
