<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <title>Weather dDashboard</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboard.css">
</head>
<body>
    <h1>Weather dDashboard</h1>
    <div class="nav-container">
        <a href="${pageContext.request.contextPath}/weather/temperature" class="nav-btn">Temperature</a>
        <a href="${pageContext.request.contextPath}/weather/condition" class="nav-btn">Condition</a>
    </div>
</body>
</html>