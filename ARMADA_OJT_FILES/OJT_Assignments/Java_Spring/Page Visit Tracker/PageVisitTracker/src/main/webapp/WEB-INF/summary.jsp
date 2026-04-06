<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html>
<head>
    <title>Visit Summary</title>
    <link rel="stylesheet" href="css/visit.css">
</head>
<body>

<div class="container">
    <h2>Visit Summary</h2>

    <p>
        You have visited the visit page 
        <span id="count" class="count-pop"><strong>${sessionScope.visitCount}</strong></span>
        times during this session.
    </p>

    <a href="/visit" class="button">Back to Visit Page</a><br>
    <a href="/reset" class="button reset" id="resetButton">Reset Counter</a>
	
</div>

<script src="js/all.js"> </script>

</body>
</html>