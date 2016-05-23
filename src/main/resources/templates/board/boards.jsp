<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>List of Boards</title>
    <style type="text/css">
        #boardsTable table {
            border-collapse: collapse;
            border: 1px solid gray;
        }

        #boardsTable table th {
            border: 1px solid gray;
        }

        #boardsTable table tr td {
            border: 1px solid gray;
        }
    </style>
</head>
<body>
<h1>List of Boards</h1>
    <div id="boardsTable">
        <table>
            <thead>
                <th>제목</th>
                <th>저자</th>
            </thead>
            <tbody>
                <c:forEach var="board" items="${boards}" varStatus="status">
                <tr style="border: 1px solid;">
                    <td id="boardSubject_${status.index}" name="boardSubject_${status.index}">
                        <c:out value="${board.boardSubject}"/>
                    </td>
                    <td id="boardAuthor_${status.index}" name="boardAuthor_${status.index}">
                        <c:out value="${board.boardAuthor}"/>
                    </td>
                </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>
