function initBoardCreate() {
  showByFormType();
  bindBoard();
}

function bindBoard() {
  $("#boardSubmit").bind("click", function() {
    submitByFormType();
  });
}

function submitByFormType() {
  var form, action;

  if (formType() == 'update') {
    action = "/board/update";

  } else if (formType() == 'create') {
    action = "/board/create";
  }

  form = $("#boardCreateForm");
  form.attr({
    action: action,
    method: "post"
  });

  form.submit();
}

function formType() {
  if ($("#boardUid").val() > 0) {
    return 'update';

  } else {
    return 'create';
  }
}

function showByFormType() {
  if (formType() == 'update') {
    $("#updateH1").show();

  } else if (formType() == 'create') {
    $("#createH1").show();
    $("#boardUid").remove();

    forDev();
  }
}

function forDev() {
  $("#boardSubject").val("new Subject");
  $("#boardContents").val("new Contents");
  $("#boardAuthor").val("new Author");
}
