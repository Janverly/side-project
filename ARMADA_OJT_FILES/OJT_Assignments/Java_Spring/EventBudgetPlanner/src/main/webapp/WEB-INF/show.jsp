<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Expense Details</title>
    <link rel="stylesheet" type="text/css" href="/css/all_style.css">
</head>

<body>

<header>
    <h1>Expense Details</h1>
</header>

<main>

    <section>

        <div class="detail-row">
            <span class="label">Expense Name:</span>
            <span class="value">${expense.name}</span>
        </div>

        <div class="detail-row">
            <span class="label">Vendor:</span>
            <span class="value">${expense.vendor}</span>
        </div>

        <div class="detail-row">
            <span class="label">Description:</span>
            <span class="value">${expense.description}</span>
        </div>

        <div class="detail-row">
            <span class="label">Amount:</span>
            <span class="value">
                ₱ <fmt:formatNumber value="${expense.amount}" type="number" minFractionDigits="2"/>
            </span>
        </div>

        <div class="actions">
            <a href="/expenses" class="btn-back">Back</a>
        </div>

    </section>

</main>

</body>
</html>