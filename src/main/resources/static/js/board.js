var boards = function() {
  var bind = function() {
    var boardSubjects = $("td[name*=boardSubject]");

    for (var i = 0; i < boardSubjects.length; i++) {
      $("#" + boardSubjects[i].id).bind("click", function(){
        viewBoard($(this).data("board-uid"));
      });
    }
  };

  bind();
};

var viewBoard = function(boardUid) {
  var form = document.createElement("form");
  form.action = "/board/" + boardUid;
  form.method = "get";
  form.style.display = "none";
  document.body.appendChild(form);

  form.submit();

  document.body.removeChild(form);
};

