<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
	<head>
	    <title>Send Secret Message</title>
	    <link rel="stylesheet" href="css/secret.css">
	</head>
	<body>
		<div class="container">
		    <h2>Send a Secret Message</h2>
		
		    <c:if test="${not empty success}">
		        <div class="success">${success}</div>
		    </c:if>
		
		    <form action="${pageContext.request.contextPath}/secret/submit" method="post">
		        <label>Recipient Name</label>
		        <input type="text" name="recipient" required>
		
		        <label>Message</label>
		        <textarea name="message" required></textarea>
		
		        <label>Secret Code (Optional)</label>
		        <input type="text" name="code" placeholder="Leave empty if none">
		
		        <button type="submit">Save Secret</button>
		    </form>
		
		    <form action="${pageContext.request.contextPath}/secret/show" method="get">
		        <button type="submit" class="view-btn">View Secret Message</button>
		    </form>
		</div>
	</body>
</html>