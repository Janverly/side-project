<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE>
<html>
	<head>
	    <title>Pirate Treasure Hunt</title>
	    <link rel="stylesheet" href="/css/index.css">
	</head>
	<body>
	
		<h1>Pirate Treasure Hunt</h1>
		<h2>Gold: ${coins}</h2>
		
		<div class="locations-container">
		
		    <!-- ISLAND -->
		    <form action="/play" method="post" class="location-form">
		        <input type="hidden" name="location" value="island">
		        <img src="/img/island.png" alt="Island">
		        <button type="submit">Island (10-20)</button>
		    </form>
		
		    <!-- CAVE -->
		    <form action="/play" method="post" class="location-form">
		        <input type="hidden" name="location" value="cave">
		        <img src="/img/cave.png" alt="Cave">
		        <button type="submit">Cave (5-10)</button>
		    </form>
		
		    <!-- TAVERN -->
		    <form action="/play" method="post" class="location-form">
		        <input type="hidden" name="location" value="tavern">
		        <img src="/img/tavern.png" alt="Tavern">
		        <button type="submit">Tavern (2-5)</button>
		    </form>
		
		    <!-- HIGH SEAS -->
		    <form action="/play" method="post" class="location-form">
		        <input type="hidden" name="location" value="seas">
		        <img src="/img/high.png" alt="High Seas">
		        <button type="submit">High Seas (+/- 0-50)</button>
		    </form>
		
		    <!-- HAUNTED REEF -->
		    <form action="/play" method="post" class="location-form">
		        <input type="hidden" name="location" value="reef">
		        <img src="/img/reef.png" alt="Haunted Reef">
		        <button type="submit">Haunted Reef (-5 to -20)</button>
		    </form>
		
		</div>
		
			<form action="/play" method="post">
			    <input type="hidden" name="location" value="reset">
			    <button class="reset-button" type="submit">Reset Game</button>
			</form>
			
			<form action="/play/random" method="post">
			    <button class="random-button" type="submit">Play Random!</button>
			</form>
		
		<hr> <!-- line -->
	
		<h3>Adventure Log:</h3>
		<div>
		    <c:forEach var="log" items="${logs}">
		        <p>${log}</p>
		    </c:forEach>
		</div>
	
	</body>
</html>