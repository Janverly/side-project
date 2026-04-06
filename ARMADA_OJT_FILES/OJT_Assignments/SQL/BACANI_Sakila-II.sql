USE sakila;

-- 1
SELECT * FROM customer;

-- 2
SELECT c.first_name, c.last_name, a.address
FROM customer AS c
LEFT JOIN address AS a
ON c.address_id = a.address_id;

-- 3
SELECT c.first_name, c.last_name, a.address, ci.city
FROM customer AS c
LEFT JOIN address AS a
ON c.address_id = a.address_id
LEFT JOIN city AS ci
ON a.city_id = ci.city_id;

-- 4
SELECT c.first_name, c.last_name, a.address, ci.city, co.country
FROM customer AS c
LEFT JOIN address AS a
ON c.address_id = a.address_id
LEFT JOIN city AS ci
ON a.city_id = ci.city_id
LEFT JOIN country AS co
ON ci.country_id = co.country_id;

-- 5
SELECT c.first_name, c.last_name, a.address, ci.city, co.country
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE co.country = "Bolivia";

-- 6
SELECT c.first_name, c.last_name, a.address, ci.city, co.country
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE co.country IN ("Bolivia", "Germany", "Greece");

-- 7
SELECT c.first_name, c.last_name, a.address, ci.city, co.country
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE ci.city = "Baku";

-- 8
SELECT c.first_name, c.last_name, a.address, ci.city, co.country
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE ci.city IN ("Baku", "Beira", "Bergamo");

-- 9
SELECT c.first_name, c.last_name, co.country, LENGTH(co.country) AS country_name_length
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE LENGTH(co.country) < 5
ORDER BY LENGTH(c.last_name) DESC;

-- 10
SELECT c.first_name, c.last_name, co.country, ci.city, LENGTH(ci.city) AS city_name_length
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE LENGTH(ci.city) > 10
ORDER BY co.country ASC;

-- 11
SELECT c.first_name, c.last_name, ci.city
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
WHERE ci.city LIKE '%ba%';

-- 12
SELECT c.first_name, c.last_name, ci.city, LENGTH(ci.city) AS city_name_length
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
WHERE ci.city LIKE '% %'
ORDER BY LENGTH(ci.city) DESC;

-- 13
SELECT c.first_name, c.last_name, ci.city, co.country,
    LENGTH(ci.city) AS city_name_length,
    LENGTH(co.country) AS country_name_length
FROM customer AS c
INNER JOIN address AS a
ON c.address_id = a.address_id
INNER JOIN city AS ci
ON a.city_id = ci.city_id
INNER JOIN country AS co
ON ci.country_id = co.country_id
WHERE LENGTH(co.country) > LENGTH(ci.city);