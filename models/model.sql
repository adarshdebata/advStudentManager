CREATE DATABASE studentsdb;
\c studentsdb;


CREATE TABLE students (
    rollno SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE attendance (
    rollno INT NOT NULL,
    entry_time TIME NOT NULL,
    exit_time TIME NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    present_time INTERVAL GENERATED ALWAYS AS (exit_time - entry_time) STORED,
    PRIMARY KEY (rollno, date),
    FOREIGN KEY (rollno) REFERENCES students (rollno)
);

CREATE TABLE fees (
    rollno INT NOT NULL,
    course_id INT NOT NULL,
    ispaid BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (rollno, course_id),
    FOREIGN KEY (rollno) REFERENCES students (rollno),
    FOREIGN KEY (course_id) REFERENCES course (course_id)
);

CREATE TABLE course (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    total_fees INT NOT NULL
);

-- INSERT INTO course (course_name, total_fees) VALUES
--     ('Mathematics', 5000),
--     ('Computer Science', 6000),
--     ('History', 4500),
--     ('Biology', 5500),
--     ('English Literature', 4800);

-- 
-- Explanation:

-- Database Creation:
-- The CREATE DATABASE studentsdb; command creates a new database named studentsdb.
-- Connecting to the Database:

-- The \c studentsdb; command connects to the studentsdb database.

-- students Table:
-- rollno SERIAL PRIMARY KEY creates an auto-incrementing primary key.
-- name VARCHAR(100) NOT NULL creates a column for student names that cannot be null.

-- attendance Table:
-- rollno INT NOT NULL creates a column for the student's roll number.
-- entry_time TIME NOT NULL and exit_time TIME NOT NULL store the times of entry and exit.
-- date DATE DEFAULT CURRENT_DATE stores the date with a default value of the current date.
-- present_time INTERVAL GENERATED ALWAYS AS (exit_time - entry_time) STORED calculates the present time as the difference between exit and entry times.
-- PRIMARY KEY (rollno, date) ensures each student has a unique entry per day.
-- FOREIGN KEY (rollno) REFERENCES students (rollno) ensures the roll number exists in the students table.

-- fees Table:
-- rollno INT NOT NULL and course_id INT NOT NULL store the student's roll number and course ID.
-- ispaid BOOLEAN DEFAULT FALSE indicates whether the fees are paid.
-- PRIMARY KEY (rollno, course_id) ensures each student has a unique entry per course.
-- FOREIGN KEY (rollno) REFERENCES students (rollno) ensures the roll number exists in the students table.
-- FOREIGN KEY (course_id) REFERENCES course (course_id) ensures the course ID exists in the course table.

-- course Table:
-- course_id SERIAL PRIMARY KEY creates an auto-incrementing primary key.
-- total_fees INT NOT NULL stores the total fees for the course. 