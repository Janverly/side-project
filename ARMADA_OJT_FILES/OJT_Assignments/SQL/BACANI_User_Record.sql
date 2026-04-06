-- Setup
CREATE SCHEMA hackerhero_practice;
USE hackerhero_practice;

-- 1. Create the Users table
CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    encrypted_password VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME
);

-- 2. Insert three fake records (one query each)
INSERT INTO Users (first_name, last_name, email, encrypted_password, created_at, updated_at)
	VALUES ('Juan', 'Dela Cruz', 'juan.delacruz@email.com', 'abc123hashed', NOW(), NOW());

INSERT INTO Users (first_name, last_name, email, encrypted_password, created_at, updated_at)
	VALUES ('Maria', 'Santos', 'maria.santos@email.com', 'xyz789hashed', NOW(), NOW());

INSERT INTO Users (first_name, last_name, email, encrypted_password, created_at, updated_at)
	VALUES ('Jose', 'Reyes', 'jose.reyes@email.com', 'pass456hashed', NOW(), NOW());

-- 3. Update one user record where id = 1
UPDATE Users
	SET first_name = 'Juanito', updated_at = NOW()
	WHERE id = 1;

-- 4. Update all user records with last_name of 'Choi'
UPDATE Users
	SET last_name = 'Choi'
	WHERE last_name = 'Choi';

-- 5. Update all users where id is 3, 5, 7, 12, or 19
UPDATE Users
	SET updated_at = NOW()
	WHERE id IN (3, 5, 7, 12, 19);

-- 6. Delete a user record where id = 1
DELETE FROM Users
	WHERE id = 1;

-- 7. Delete ALL records in the Users table
DELETE FROM Users;


-- 8. Drop the entire Users table
DROP TABLE Users;
-- Difference: DROP TABLE removes the table structure entirely.
-- DELETE FROM Users only removes the data but keeps the table.

-- 9. Alter the email field to be named email_address
ALTER TABLE Users
	RENAME COLUMN email TO email_address;

-- 10. Alter the id field to be BIGINT
ALTER TABLE Users
	MODIFY COLUMN id BIGINT NOT NULL AUTO_INCREMENT;

-- 11. Add is_active column (Boolean, default 0, NOT NULL)
ALTER TABLE Users
	ADD COLUMN is_active BOOLEAN DEFAULT 0 NOT NULL;