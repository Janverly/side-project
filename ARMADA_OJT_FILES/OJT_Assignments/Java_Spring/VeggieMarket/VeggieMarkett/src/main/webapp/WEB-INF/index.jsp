<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Veggie Market Dashboard</title>
    <link rel="stylesheet" href="/css/style.css" />
</head>
<body>
    <main>
        <h1>Veggie Market Dashboard</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Vegetable</th>
                    <th>Price</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="veggie" items="${veggies}">
                    <tr>
                        <td><c:out value="${veggie.getName()}" /></td>
                        <td>$<c:out value="${veggie.getPrice()}" /></td>
                        <td class="${veggie.isOrganic() ? 'organic' : 'non-organic'}">
                            <c:out value="${veggie.isOrganic() ? 'Organic' : 'Non-Organic'}" />
                        </td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </main>
</body>
</html>