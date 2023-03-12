    USE employees_db;

    INSERT INTO department (department_name)
    VALUES
    ("IT"),
    ("Finance"),
    ("Legal"),
    ("Engineering"),
    ("Sales");

    INSERT INTO roles (title, salary, department_id)
    VALUES
    ("Database Admin", 95000, 1),
    ("Budget Analyst", 85000, 2),
    ("Lawyer", 90000, 3),
    ("Engineer", 80000, 4),
    ("Sales Leader", 68000, 5);

    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    ("Bruce" "Banner", 1, 321),
    ("Tony" "Stark", 2, 309),
    ("Matt", "Murdock", 3, 111),
    ("Miles", "Morales", 4, 404),
    ("Wade" "Wilson", 5, 721);