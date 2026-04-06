<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <title>Condition</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/condition.css">
    <script src="${pageContext.request.contextPath}/js/alert.js"></script>
</head>
<body onload="showConditionAlert('${condition}')">

    <h1>Current Weather Condition</h1>

    <div class="condition-container">
        <img 
            src="${pageContext.request.contextPath}/img/condition/${fn:trim(condition)}.png" 
            alt="${condition}" 
            class="condition-img"
            onerror="this.style.display='none';"
        />
        <p class="condition-text">${fn:toUpperCase(condition)}</p>
    </div>

</body>
</html>