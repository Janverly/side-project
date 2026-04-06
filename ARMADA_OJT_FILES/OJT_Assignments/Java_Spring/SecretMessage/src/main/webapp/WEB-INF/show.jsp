<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="true" %>
<!DOCTYPE html>
<html>
<head>
    <title>Secret Revealed</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/show.css">
</head>
	<body>
		<div class="container">
		    <h2>Secret Message</h2>
		
		    <c:set var="recipient" value="${sessionScope.recipient}" />
		    <c:set var="message" value="${sessionScope.message}" />
		    <c:set var="code" value="${sessionScope.code}" />
		    <c:set var="unlocked" value="${sessionScope.unlocked}" />
		
		    <c:if test="${empty message}">
		        <p class="error">
		            No secret message found.
		            <a href="${pageContext.request.contextPath}/secret">Go back</a>
		        </p>
		    </c:if>
		
		    <c:if test="${not empty message}">
		        <c:choose>
		            <c:when test="${code != null && unlocked == false}">
		                <p class="warning">This message is locked</p>
		
		                <c:if test="${not empty error}">
		                    <div class="error">${error}</div>
		                </c:if>
		
		                <form action="${pageContext.request.contextPath}/secret/unlock" method="post">
		                    <input type="text" name="inputCode" placeholder="Enter secret code" required>
		                    <button>Unlock</button>
		                </form>
		            </c:when>
		
		            <c:otherwise>
		                <p>Hi <strong>${recipient}</strong>!</p>
		                <p>Your secret message:</p>
		                <blockquote>"${message}"</blockquote>
		
		                <c:if test="${code != null}">
		                    <p class="success">Code accepted! </p>
		                </c:if>
		            </c:otherwise>
		        </c:choose>
		    </c:if>
		
		    <a href="${pageContext.request.contextPath}/secret">Send Another</a>
		</div>
	</body>
</html>