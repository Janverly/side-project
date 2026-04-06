<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Ramennn</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
	</head>
	<body>
		<h1>Add Noodle</h1>
		
		<form:form action="/noodles/add" method="post" modelAttribute="noodle">
		    <p>
		        <label for="name">Name:</label>
		        <form:input path="name" id="name"/>
		        <form:errors path="name" cssClass="error"/>
		    </p>
		    <p>
		        <label for="restaurant">Restaurant:</label>
		        <form:input path="restaurant" id="restaurant"/>
		        <form:errors path="restaurant" cssClass="error"/>
		    </p>
		    <p>
		        <label for="spiceLevel">Spice Level:</label>
		        <form:input path="spiceLevel" id="spiceLevel"/>
		        <form:errors path="spiceLevel" cssClass="error"/>
		    </p>
		    <p>
		        <label for="notes">Notes:</label>
		        <form:textarea path="notes" id="notes"/>
		        <form:errors path="notes" cssClass="error"/>
		    </p>
		    <button type="submit">Add Noodle</button>
		</form:form>
		
		<p><a href="/noodles/show">View All Noodles</a></p>
	</body>
</html>