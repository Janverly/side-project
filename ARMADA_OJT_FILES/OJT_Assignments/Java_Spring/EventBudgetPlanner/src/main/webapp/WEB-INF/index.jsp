<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>  <!-- for the peso sign -->
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Event Budget Planner</title>
    <link rel="stylesheet" type="text/css" href="/css/index.css">
	<body>
	
		<header>
		    <h1>Event Budget Planner</h1>
		</header>

		<main>
		
		    <section>
		        <h2>Expenses</h2>
		
		        <table>
		            <thead>
		                <tr>
		                    <th>Expense</th>
		                    <th>Vendor</th>
		                    <th>Amount</th>
		                    <th>Action</th>
		                </tr>
		            </thead>
		
		            <tbody>
		                <c:forEach var="e" items="${expenses}">
		                    <tr>
		                        <td>${e.name}</td>
		                        <td>${e.vendor}</td>
		                        <td><fmt:formatNumber value="${e.amount}" type="currency" currencySymbol="₱ "/></td>  <!-- SEARCH!!! -->
		                       <td>
								    <a href="/expenses/edit/${e.id}">Edit</a> |
								    <a href="/expenses/delete/${e.id}" class="delete-link">Delete</a> |
								    <a href="/expenses/show/${e.id}">View</a>
							   </td>
		                    </tr>
		                </c:forEach>
		            </tbody>
		        </table>
		    </section>
		
		    <!-- ADD FORM -->
		    <section>
		        <h2>Add Expense</h2>
		
		        <form:form action="/expenses/add" method="post" modelAttribute="expense">
		
		            <label>Expense Name</label>
		            <form:input path="name"/>
		            <form:errors path="name" cssClass="error"/>
		
		            <label>Vendor</label>
		            <form:input path="vendor"/>
		            <form:errors path="vendor" cssClass="error"/>
		
		            <label>Amount</label>
		            <form:input path="amount"/>
		            <form:errors path="amount" cssClass="error"/>
		
		            <label>Description</label>
		            <form:textarea path="description"/>
		            <form:errors path="description" cssClass="error"/>
		
		            <input type="submit" value="Add Expense"/>
		        </form:form>
		    </section>
		
		</main>
		<script>
	   /*  Select all delete links */
	    const deleteLinks = document.querySelectorAll('.delete-link');
	
	    deleteLinks.forEach(link => {
	        link.addEventListener('click', function(e) {
	            const confirmed = confirm("Are you sure you want to delete this expense?");
	            if (!confirmed) {
	                e.preventDefault();  /* stop the navigation if canceled */
	            }
	        });
	    });
	</script>
	</body>
</html>