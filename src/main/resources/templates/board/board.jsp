<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Board detail</title>
</head>
<body>
    <h1>Board detail</h1>
    <form id="boardDetailForm" name="boardDetailForm">
        <div>
            <p>제목: ${board.boardSubject}</p>
            <p>내용: ${board.boardContents}</p>
            <p>저자: ${board.boardAuthor}</p>
        </div>
    </form>
</body>
</html>
