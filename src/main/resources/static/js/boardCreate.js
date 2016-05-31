function initBoardCreate() {
  bindBoard();

  if ($("#formType").val() == 'create') {
    forDev();
  }
}

function bindBoard() {
  $("#boardSubmit").bind("click", function() {
    submitByFormType();
  });
}

function submitByFormType() {
  var form, action;

  if ($("#formType").val() == 'update') {
    action = "/board/update";

  } else if ($("#formType").val() == 'create') {
    action = "/board/create";
  }

  form = $("#boardCreateForm");
  form.attr({
    action: action,
    method: "post"
  });

  form.submit();
}

function forDev() {
  $("#boardSubject").val("new Subject");
  $("#boardContents").val("new Contents");
  $("#boardAuthor").val("new Author");
}
