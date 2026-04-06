<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Expense</title>
    <link rel="stylesheet" type="text/css" href="/css/all_style.css">
</head>

	<body>
	
		<header>
		    <h1>Edit Expense</h1>
		</header>
	
		<main>
		
		    <section>
		
		        <form:form action="/expenses/update/${expense.id}" method="post" modelAttribute="expense">
		
		            <div class="form-group">
		                <label for="name">Expense Name</label>
		                <form:input path="name" id="name"/>
		                <form:errors path="name" cssClass="error"/>
		            </div>
		
		            <div class="form-group">
		                <label for="vendor">Vendor</label>
		                <form:input path="vendor" id="vendor"/>
		                <form:errors path="vendor" cssClass="error"/>
		            </div>
		
		            <div class="form-group">
		                <label for="amount">Amount</label>
		                <form:input path="amount" id="amount"/>
		                <form:errors path="amount" cssClass="error"/>
		            </div>
		
		            <div class="form-group">
		                <label for="description">Description</label>
		                <form:textarea path="description" id="description"/>
		                <form:errors path="description" cssClass="error"/>
		            </div>
		
		            <div class="form-actions">
		                <input type="submit" value="Update" class="btn-submit"/>
		                <a href="/expenses" class="btn-back">Cancel</a>
		            </div>
		
		        </form:form>
		
		    </section>
		
		</main>
		
	</body>
</html>