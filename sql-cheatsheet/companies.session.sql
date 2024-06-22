-- ====================================
-- COMPANY DATABASE
-- ====================================
--@block
CREATE DATABASE company;
USE company;USE company;


-- =====================================
-- SECTION: CREATING COMPANY DB
-- =====================================

--@block
CREATE TABLE employee (
    emp_id INT PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    birth_day DATE,
    sex VARCHAR(1),
    salary INT,
    super_id INT,
    branch_id INT
);

--@block
CREATE TABLE branch (
    branch_id INT PRIMARY KEY,
    branch_name VARCHAR(40),
    mgr_id INT,
    mgr_start_date DATE,
    FOREIGN KEY(mgr_id) REFERENCES employee(emp_id)
    ON DELETE SET NULL
);

--@block
ALTER TABLE employee
ADD FOREIGN KEY(branch_id) REFERENCES branch(branch_id)
ON DELETE SET NULL;
ALTER TABLE employee
ADD FOREIGN KEY(super_id) REFERENCES employee(emp_id)
ON DELETE SET NULL;

--@block
CREATE TABLE client (
    client_id INT PRIMARY KEY,
    client_name VARCHAR(40),
    branch_id INT,
    FOREIGN KEY(branch_id) REFERENCES branch(branch_id)
    ON DELETE SET NULL
);

--@block
CREATE TABLE works_with (
    emp_id INT,
    client_id INT,
    total_sales INT,
    PRIMARY KEY(emp_id, client_id),
    FOREIGN KEY(emp_id) REFERENCES employee(emp_id)
    ON DELETE CASCADE,
    FOREIGN KEY(client_id) REFERENCES client(client_id)
    ON DELETE CASCADE
);

--@block
CREATE TABLE branch_supplier (
    branch_id INT,
    supplier_name VARCHAR(40),
    supply_type VARCHAR(40),
    PRIMARY KEY(branch_id, supplier_name),
    FOREIGN KEY(branch_id) REFERENCES branch(branch_id)
    ON DELETE CASCADE
);

--@block
INSERT INTO employee VALUES(100, 'David', 'Wallace', '1967-11-17', 'M', 250000, NULL, NULL);

INSERT INTO branch VALUES(1, 'Corporate', 100, '2006-02-09');

UPDATE employee
SET branch_id = 1
WHERE emp_id = 100;

INSERT INTO employee VALUES(101, 'Jan', 'Levinson', '1961-05-11', 'F', 110000, 100, 1);

--@block
INSERT INTO employee VALUES(102, 'Michael', 'Scott', '1964-03-15', 'M', 75000, 100, 1);

INSERT INTO branch VALUES(2, 'Scranton', 102, '1992-04-06');

UPDATE employee
SET branch_id = 2
WHERE emp_id = 102;

INSERT INTO employee VALUES(103, 'Angela', 'Martin', '1971-06-25', 'F', 63000, 102, 2);
INSERT INTO employee VALUES(104, 'Kelly', 'Kapoor', '1980-02-05', 'F', 55000, 102, 2);
INSERT INTO employee VALUES(105, 'Stanley', 'Hudson', '1958-02-19', 'M', 69000, 102, 2);

--@block
SELECT * FROM employee;
SELECT * FROM branch;

--@block
INSERT INTO employee VALUES(106, 'Josh', 'Porter', '1969-09-05', 'M', 78000, 100, NULL);
INSERT INTO branch VALUES(3, 'Stamford', 106, '1998-02-13');

UPDATE employee
SET branch_id = 3
WHERE emp_id = 106;

INSERT INTO employee VALUES(107, 'Andy', 'Bernard', '1973-07-22', 'M', 65000, 106, 3);
INSERT INTO employee VALUES(108, 'Jim', 'Halpert', '1978-10-01', 'M', 71000, 106, 3);


--@block
INSERT INTO branch_supplier VALUES(2, 'Hammer Mill', 'Paper');
INSERT INTO branch_supplier VALUES(2, 'Uni-ball', 'Writing Utensils');
INSERT INTO branch_supplier VALUES(3, 'Patriot Paper', 'Paper');
INSERT INTO branch_supplier VALUES(2, 'J.T. Forms & Labels', 'Custom Forms');
INSERT INTO branch_supplier VALUES(3, 'Uni-ball', 'Writing Utensils');
INSERT INTO branch_supplier VALUES(3, 'Hammer Mill', 'Paper');
INSERT INTO branch_supplier VALUES(3, 'Stamford Lables', 'Custom Forms');


@block
INSERT INTO client VALUES(400, 'Dunmore Highschool', 2);
INSERT INTO client VALUES(401, 'Lackawana Country', 2);
INSERT INTO client VALUES(402, 'FedEx', 3);
INSERT INTO client VALUES(403, 'John Daly Law, LLC', 3);
INSERT INTO client VALUES(404, 'Scranton Whitepages', 2);
INSERT INTO client VALUES(405, 'Times Newspaper', 3);
INSERT INTO client VALUES(406, 'FedEx', 2);

--@block
INSERT INTO works_with VALUES(105, 400, 55000);
INSERT INTO works_with VALUES(102, 401, 267000);
INSERT INTO works_with VALUES(108, 402, 22500);
INSERT INTO works_with VALUES(107, 403, 5000);
INSERT INTO works_with VALUES(108, 403, 12000);
INSERT INTO works_with VALUES(105, 404, 33000);
INSERT INTO works_with VALUES(107, 405, 26000);
INSERT INTO works_with VALUES(102, 406, 15000);
INSERT INTO works_with VALUES(105, 406, 130000);

-- =====================================
-- SECTION: MORE BASIC QUERIES
-- =====================================
--@block
SELECT * FROM employee;
SELECT * FROM branch;
SELECT * FROM branch_supplier;
SELECT * FROM client;
SELECT * FROM works_with;

--@block
SELECT * FROM employee
ORDER BY salary DESC;

--@block
SELECT * FROM employee
ORDER BY sex, first_name;

--@block
SELECT * FROM employee
LIMIT 5;

--@block
SELECT first_name, last_name FROM employee

--@block
SELECT first_name as forename, last_name as surname
FROM employee;

--@block
SELECT DISTINCT sex FROM employee;

--=====================================
-- SECTION: FUNCTIONS
--=====================================
--@block
SELECT COUNT(emp_id) FROM employee;
--@block
SELECT COUNT(super_id) FROM employee;
--@block
SELECT COUNT(DISTINCT sex) FROM employee;

--@block
SELECT COUNT(emp_id) FROM employee
WHERE sex = 'F' AND birth_day > '1970-01-01';

--@block
SELECT AVG(salary) FROM employee
WHERE sex = 'M';

--@block
SELECT SUM(salary) FROM employee;

--@block
SELECT MAX(salary) FROM employee;

--@block
SELECT COUNT(sex), sex FROM employee
GROUP BY sex;

--@block
SELECT SUM(total_sales), emp_id FROM works_with
GROUP BY emp_id;
--@block
SELECT SUM(total_sales), client_id FROM works_with
GROUP BY client_id;

--=====================================
-- SECTION: WILD CARDS
--=====================================

--@block
SELECT * FROM client
WHERE client_name LIKE '%LLC';

--@block
SELECT * FROM branch_supplier
WHERE supplier_name LIKE '% Label%';

--@block
SELECT * FROM employee
WHERE birth_day LIKE '____-02-%'

--@block
SELECT * FROM client
WHERE client_name LIKE '%school%';

--=====================================
-- SECTION: UNION
--=====================================
--@block
SELECT first_name, emp_id as id FROM employee
UNION
SELECT branch_name, branch_id FROM branch
UNION 
SELECT client_name, client_id FROM client;

--@block
SELECT salary 
FROM employee
UNION 
SELECT total_sales
FROM works_with;


--=====================================
-- SECTION: JOINS
--=====================================

--@block
INSERT INTO branch VALUES(4, 'Buffalo', NULL, NULL);

--@block
SELECT * FROM branch;

--@block
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
JOIN branch
ON employee.emp_id = branch.mgr_id;

--@block
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
RIGHT JOIN branch
ON employee.emp_id = branch.mgr_id;

--@block
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
LEFT JOIN branch
ON employee.emp_id = branch.mgr_id;

--@block
SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
INNER JOIN branch
ON employee.emp_id = branch.mgr_id;

--=====================================
-- SECTION: NESTED QUERIES
--=====================================
--@block
SELECT DISTINCT first_name, last_name
FROM employee
JOIN works_with
ON employee.emp_id = works_with.emp_id
WHERE total_sales > 30000;


--@block
SELECT employee.first_name, employee.last_name
FROM employee

--@block
SELECT works_with.emp_id FROM works_with
WHERE works_with.total_sales > 30000;

--@block
SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN (
    SELECT works_with.emp_id FROM works_with
    WHERE works_with.total_sales > 30000
);

--@block
EXPLAIN SELECT employee.first_name, employee.last_name
FROM employee
WHERE employee.emp_id IN (
    SELECT works_with.emp_id FROM works_with
    WHERE works_with.total_sales > 30000
);

--@block
EXPLAIN SELECT DISTINCT first_name, last_name
FROM employee
JOIN works_with
ON employee.emp_id = works_with.emp_id
WHERE total_sales > 30000;

--@block
SELECT * FROM client

--@block
SELECT branch_id FROM branch
WHERE mgr_id = 102;

--@block
SELECT * FROM client
WHERE client.branch_id = (
    SELECT branch_id FROM branch
    WHERE mgr_id = 102
    LIMIT 1
); 

--@block
SELECT * FROM client
WHERE client.branch_id IN (
    SELECT branch_id FROM branch
    WHERE mgr_id = 102
); 


--=====================================
-- SECTION: ON DELETE
--=====================================
--@block
SELECT * FROM employee;
SELECT * FROM branch;
--@block
DELETE FROM employee
WHERE emp_id = 102;

--@block
SELECT * FROM employee;
SELECT * FROM branch;

--@block
SELECT * FROM branch_supplier;

--@block
DELETE FROM branch
WHERE branch_id = 2;

--@block
SELECT * FROM branch_supplier;

--=====================================
-- SECTION: TRIGGER
--=====================================
--@block
CREATE TABLE trigger_test (
    message VARCHAR(100)
)


--@block
CREATE 
    TRIGGER my_trigger BEFORE INSERT
    ON employee
    FOR EACH ROW BEGIN
        INSERT INTO trigger_test
        VALUES(NEW.first_name);
    END

--@block
INSERT INTO employee VALUES(110, 'Dwight', 'Schrute', '1978-01-20', 'M', 75000, 103, 3);

--@block
SELECT * FROM trigger_test;


--@block
CREATE 
    TRIGGER my_trigger2 AFTER INSERT
    ON employee
    FOR EACH ROW BEGIN
        IF NEW.sex = 'M' THEN
            INSERT INTO trigger_test
            VALUES('added male employee');
        ELSE
            INSERT INTO trigger_test
            VALUES('added female employee');
        END IF;
    END

--@block
INSERT INTO employee VALUES(112, 'Charlot', 'Malone', '1978-01-20', 'F', 75000, 103, 3);

--@block
SELECT * FROM trigger_test;
