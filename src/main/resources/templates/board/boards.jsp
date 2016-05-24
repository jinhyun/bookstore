<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>List of Boards</title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/boards.css'/> ">
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
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
                        <td id="boardSubject_${status.index}" name="boardSubject_${status.index}" data-board-uid="<c:out value='${board.boardUid}'/>">
                            <span><c:out value="${board.boardSubject}"/></span>
                        </td>
                        <td id="boardAuthor_${status.index}" name="boardAuthor_${status.index}">
                            <span><c:out value="${board.boardAuthor}"/></span>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </div>
    </div>

    <script type="text/javascript" src="<c:url value='/static/js/boards.js'/>"></script>
    <script type="text/javascript">
        (function() {
            boardsModule();
        })();
    </script>
</body>
</html>
