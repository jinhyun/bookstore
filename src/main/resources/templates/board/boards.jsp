<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>List of Boards</title>

    <%-- CSS --%>
    <link type="text/css" rel="stylesheet" href="<c:url value='/static/css/boards.css'/> ">

    <%-- JavaScript Library --%>
    <script type="text/javascript" src="<c:url value='/webjars/jquery/2.1.4/jquery.min.js'/>"></script>

    <%-- JavaScript Module --%>
    <script type="text/javascript" src="<c:url value='/static/js/boards.js'/>"></script>
    <script>
        $(document).ready(function() {
            initBoards();
        });
    </script>
</head>
<body>
    <%@ include file="/templates/menu/nav.jsp" %>
    <div id="section" class="section">
        <h1>List of Boards</h1>
        <table class="boardsTable">
            <thead>
                <th>제목</th>
                <th>저자</th>
            </thead>
            <tbody>
            <c:forEach var="board" items="${boards}" varStatus="status">
                <tr style="border: 1px solid;">
                    <input type="hidden" id="boardUid_${status.index+1}" name="boardUid_${status.index+1}" value="<c:out value='${board.boardUid}'/>">

                    <td id="boardSubjectTd_${status.index+1}" name="boardSubjectTd_${status.index+1}">
                        <span><c:out value="${board.boardSubject}"/></span>
                    </td>
                    <td id="boardAuthorTd_${status.index+1}" name="boardAuthorTd_${status.index+1}">
                        <span><c:out value="${board.boardAuthor}"/></span>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</body>
</html>
