<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="true" %>

<!DOCTYPE html>
<html>
<head>
    <title>Counter Reset</title>
    <link rel="stylesheet" href="css/visit.css">
</head>
<body>

<div class="container">
    <h2>Counter Reset</h2>

    <p>
        Your visit counter has been reset to 
        <span id="count" class="count-pop"><strong>0</strong></span>.
    </p>

    <a href="/visit" class="button">Go to Visit Page</a><br>
    <a href="/summary" class="button">Go to Summary</a>
</div>

<script src="js/all.js"> </script>

</body>
</html>