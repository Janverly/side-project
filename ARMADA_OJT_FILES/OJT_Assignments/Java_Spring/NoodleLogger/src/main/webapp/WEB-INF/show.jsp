<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>All Noodles</title>
		<link rel="stylesheet" type="text/css" href="/css/style.css">
	</head>
	<body>
		<h1>All Noodles</h1>
		
		<table>
		    <thead>
		        <tr>
		            <th>Name</th>
		            <th>Restaurant</th>
		            <th>Spice Level</th>
		            <th>Notes</th>
		        </tr>
		    </thead>
		    <tbody>
				<c:forEach var="n" items="${noodles}">
				    <tr>
				        <td>${n.name}</td>
				        <td>${n.restaurant}</td>
				        <td>${n.spiceLevel}</td>
				        <td>${n.notes}</td>
				        <td>
				            <a href="/noodles/edit/${n.id}">Edit</a> |
				            <a href="/noodles/delete/${n.id}" onclick="return confirm('Are you sure?')">Delete</a>
				        </td>
				    </tr>
				</c:forEach>
			    </tbody>
		</table>
		<p><a href="/noodles/deleteAll" onclick="return confirm('Delete all noodles?')">Delete All Noodles</a></p>
		<p><a href="/noodles">Add New Noodle</a></p>
	</body>
</html>