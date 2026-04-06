<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html>
<head>
    <title>Visit Page</title>
    <link rel="stylesheet" href="css/visit.css">
</head>
<body>

<div class="container">
    <h2>Visit Page</h2>
    <p>Click to increase visits:</p>

    <div class="visit-count">
        Visits this session: <span id="count" class="count-pop">${sessionScope.visitCount}</span>
    </div>

    <a href="/visit" class="button">+1 Visit</a><br>
    <a href="/visit-fast" class="button">+3 Visit</a><br>
    <a href="/summary" class="button">Summary</a><br>
    <a href="/reset" class="button reset" id="resetButton">Reset Counter</a>

</div>

<script src="js/all.js"> </script>

</body>
</html>