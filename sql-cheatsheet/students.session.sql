-- ====================================
-- STUDENT DATABASE
-- ====================================
--@block
CREATE DATABASE student;
USE student;USE student;

-- =====================================
-- SECTION: CREATING TABLES
-- =====================================

--@block
CREATE TABLE student (
    student_id INT PRIMARY KEY,
    name VARCHAR(20),
    major VARCHAR(20)
);

--@block
DESCRIBE student;

--@block
DROP TABLE student;

--@block
ALTER TABLE student ADD COLUMN gpa DECIMAL(3,2);

--@block
ALTER TABLE student DROP COLUMN gpa;

-- =====================================
-- SECTION: INSERTING TABLES
-- =====================================
--@block
INSERT INTO student VALUES
("1", "Jack", "Biology"),
("2", "Jill", "Math"),
("3", "John", "Physics"),
("4", "Jane", "Chemistry");

--@block
INSERT INTO student (student_id, name) VALUES
("5", "Jim"),
("6", "Jenny");

--@block
SELECT * FROM student;


-- =====================================
-- SECTION: CONSTRAINTS
-- =====================================
--@block
DROP TABLE student;

--@block
CREATE TABLE student (
    student_id INT,
    name VARCHAR(20) NOT NULL,
    major VARCHAR(20) UNIQUE,
    PRIMARY KEY (student_id)
);

--@block
INSERT INTO student VALUES("1", "Jack", "Biology");
INSERT INTO student VALUES("2", "Kate", "Sociology");

--@block
INSERT INTO student VALUES("3", "", "Chemistry");
--@block
INSERT INTO student VALUES("3", NULL, "Chemistry");

--@block
INSERT INTO student VALUES("4", "Jack", "Biology");

--@block
INSERT INTO student VALUES("5", "MIKE", "Computer Science");

--@block
SELECT * FROM student;


--@block
DROP TABLE student;

--@block
CREATE TABLE student (
    student_id INT,
    name VARCHAR(20) NOT NULL,
    major VARCHAR(20) DEFAULT 'Undecided',
    PRIMARY KEY (student_id)
);


--@block
INSERT INTO student VALUES("1", "Jack", "");
--@block
INSERT INTO student( student_id, name)
VALUES("2", "Jack");

--@block
SELECT * FROM student;

--@block
DROP TABLE student;

--@block
CREATE TABLE student (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    major VARCHAR(20) DEFAULT 'Undecided',
    PRIMARY KEY (student_id)
);

--@block
INSERT INTO student(name)
VALUES("Jack");
--@block
INSERT INTO student(name)
VALUES("Kate");


--@block
SELECT * FROM student;


-- =====================================
-- SECTION: UPDATING AND DELETING
-- =====================================
--@block
DROP TABLE student;

--@block
CREATE TABLE student (
    student_id INT,
    name VARCHAR(20),
    major VARCHAR(20) DEFAULT 'Undecided',
    PRIMARY KEY (student_id)
);
--@block
INSERT INTO student VALUES("1", "Jack", "Biology"),
("2", "Kate", "Sociology"),
("3", "Claire", "Chemistry"),
("4", "Jack", "Biology"),
("5", "MIKE", "Computer Science");
--@block
SELECT * FROM student;

--@block
UPDATE student
SET major = 'Bio'
WHERE major = 'Biology';

--@block
UPDATE student
SET major = 'Comp Sci'
WHERE student_id = 4;

--@block
SELECT * FROM student;

--@block
UPDATE student
SET major = 'Bio Chem'
WHERE major = 'Bio' OR major = 'Chemistry';
--@block
SELECT * FROM student;

--@block
UPDATE student
SET name = 'Tom', major = 'Undecided'
WHERE student_id = 1;

--@block
SELECT * FROM student;

--@block
DELETE FROM student
WHERE student_id = 5;

--@block
SELECT * FROM student;

--@block
DELETE FROM student
WHERE name = 'Tom' AND major = 'Undecided';
--@block
SELECT * FROM student;


-- =====================================
-- SECTION: BASIC QUERIES
-- =====================================
--@block
DROP TABLE student;
CREATE TABLE student (
    student_id INT,
    name VARCHAR(20),
    major VARCHAR(20) DEFAULT 'Undecided',
    PRIMARY KEY (student_id)
);
INSERT INTO student VALUES("1", "Jack", "Biology"),
("2", "Kate", "Sociology"),
("3", "Claire", "Chemistry"),
("4", "Jack", "Biology"),
("5", "Mike", "Computer Science");


--@block
SELECT student.name, student.major
FROM student
ORDER BY name;

---@block
SELECT *
FROM student
ORDER BY major DESC, student_id ASC;
LIMIT 5;

--@block
SELECT name, major
FROM student
WHERE major = 'Biology' OR name = 'Kate';

-- <, >, <=, >=, =, <>, AND, OR

--@block
SELECT *
FROM student
WHERE major <> 'Biology';

--@block
SELECT *
FROM student
WHERE student_id >= 2;

--@block
SELECT *
FROM student
WHERE student_id BETWEEN 2 AND 4;

--@block
SELECT *
FROM student
WHERE name IN ('Jack', 'Kate');