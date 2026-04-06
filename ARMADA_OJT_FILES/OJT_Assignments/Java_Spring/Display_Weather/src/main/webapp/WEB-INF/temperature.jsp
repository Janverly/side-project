<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <title>Temperature</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/temperature.css">
    <script src="${pageContext.request.contextPath}/js/alert.js"></script>
</head>
<body onload="showTemperatureAlert('${temperature}')">

    <h1>Current Temperature</h1>

    <div class="temperature-container">
        <img 
            src="${pageContext.request.contextPath}/img/temperature/${fn:trim(temperature)}.png" 
            alt="Temperature" 
            class="temperature-img"
            onerror="this.style.display='none';"
        />
        <p class="temperature-text">${temperature}°C</p>
    </div>

</body>
</html>