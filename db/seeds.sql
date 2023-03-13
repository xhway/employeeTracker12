    USE employees_db;

    INSERT INTO department (department_name)
    VALUES
    ('IT'),
    ('Finance'),
    ('Legal'),
    ('Engineering'),
    ('Sales');

    INSERT INTO roles (title, salary, department_id)
    VALUES
    ('Database Admin', 95000, 1),
    ('Budget Analyst', 85000, 2),
    ('Lawyer', 90000, 3),
    ('Engineer', 80000, 4),
    ('Sales Leader', 68000, 5);


    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    ('Bruce', 'Wayne', 1, NULL),
    ('Richard', 'Grayson', 2, 1),
    ('Tim', 'Drake', 3, NULL),
    ('Barbara', 'Gordon', 4, 3),
    ('Luke', 'Fox', 5, NULL),
    ('Terry', 'McGinnis', 6, 5),
    ('Kat', 'Kane', 7, NULL),
    ('Damian', 'Wayne', 8, 7);