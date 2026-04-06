<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <title>Edit Noodle</title>
	    <link rel="stylesheet" type="text/css" href="/css/style.css">
	</head>
	<body>
		<h1>Edit Noodle</h1>
		
		<form:form action="/noodles/update/${noodle.id}" method="post" modelAttribute="noodle">
		    <p>
		        <label>Name:</label>
		        <form:input path="name"/>
		        <form:errors path="name" cssClass="error"/>
		    </p>
		    <p>
		        <label>Restaurant:</label>
		        <form:input path="restaurant"/>
		        <form:errors path="restaurant" cssClass="error"/>
		    </p>
		    <p>
		        <label>Spice Level:</label>
		        <form:input path="spiceLevel"/>
		        <form:errors path="spiceLevel" cssClass="error"/>
		    </p>
		    <p>
		        <label>Notes:</label>
		        <form:textarea path="notes"/>
		        <form:errors path="notes" cssClass="error"/>
		    </p>
		    <button type="submit">Update Noodle</button>
		</form:form>
		
		<p><a href="/noodles/show">Back to All Noodles</a></p>
	</body>
</html>