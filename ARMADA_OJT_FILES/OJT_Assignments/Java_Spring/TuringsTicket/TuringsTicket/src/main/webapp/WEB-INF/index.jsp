<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.Date"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Turing's Ticket</title>
</head>
<body>

    <h1>Ticket Information</h1>
    
    <p>Passenger: <c:out value="${passenger}" /></p>  
    <p>From: <c:out value="${departure}" /></p>
    <p>To: <c:out value="${destination}" /></p>
    <p>Train: <c:out value="${train}" /></p>
    <p>Fare: <c:out value="${fare}" /></p>
    <p>Provider: <c:out value="${provider}" /></p>

</body>
</html>