USE sakila;

-- Customer where customer_id is 20
SELECT * FROM customer
WHERE customer_id = 20;

--  Customer where customer_id is BETWEEN 20 and 60
SELECT * FROM customer
WHERE customer_id BETWEEN 20 AND 60;

--  Customer where first_name starts with L
SELECT * FROM customer
WHERE first_name LIKE 'L%';

--  Customer where first_name includes L
SELECT * FROM customer
WHERE first_name LIKE '%L%';

--  Customer where first_name ends with L
SELECT * FROM customer
WHERE first_name LIKE '%L';

--  Customer where last_name starts with C, ordered by most recently created
SELECT * FROM customer
WHERE last_name LIKE 'C%'
ORDER BY create_date DESC;

--  Customer where last_name includes NN, top 5, oldest first
SELECT * FROM customer
WHERE last_name LIKE '%NN%'
ORDER BY create_date ASC
LIMIT 5;

--  Specific fields for specific customer_ids
SELECT customer_id, first_name, last_name, email FROM customer
WHERE customer_id IN (515, 181, 582, 503, 29, 85);

--  Customer where store_id is 2, email aliased as email_address
SELECT first_name, last_name, email AS email_address, store_id FROM customer
WHERE store_id = 2;

--   first_name, last_name, email ordered by email DESC
SELECT first_name, last_name, email FROM customer
ORDER BY email DESC;

--  Active customers created in February, selected fields only
SELECT customer_id, first_name, last_name, email FROM customer
WHERE active = 1
AND MONTH(create_date) = 2;

--  Email and email_length, longest first, ties broken by email ASC
SELECT email, LENGTH(email) AS email_length FROM customer
ORDER BY email_length DESC, email ASC;

--  Top 100 customers with shortest email address
SELECT email, LENGTH(email) AS email_length FROM customer
ORDER BY email_length ASC
LIMIT 100;