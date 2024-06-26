### Overview

This project is a backend system for managing student details, attendance, and fees. The system is built using Node.js, Express.js, and PostgreSQL. The project is divided into three main modules:
1. **Student Management**
2. **Attendance Management**
3. **Fees Management**

### Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
    - [Student Management](#student-management)
    - [Attendance Management](#attendance-management)
    - [Fees Management](#fees-management)
5. [Running the Application](#running-the-application)
6. [Collaborators](#collaborators)

### Prerequisites

- Node.js
- Express.js
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/adarshdebata/advStudentManager.git
    ```
2. Navigate to the project directory:
    ```bash
    cd advStudentManager
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Project Structure

```
advStudentManager/
│
├── controllers/
│   ├── attendanceController.js
│   ├── studentController.js
│   └── feesController.js
│
├── routes/
│   ├── attendanceRoutes.js
│   ├── studentRoutes.js
│   └── feesRoutes.js
│
├── services/
│   ├── attendanceService.js
│   ├── studentSevice.js
│   └── feesService.js
│
├── middlewares/
│   └── loggerMiddleware.js
│
├── models/
│   └── db.js
│
└── index.js
```

### API Endpoints

#### Student Management

- **Add Student**
    - **Endpoint:** `POST /students`
    - **Request Body:**
        ```json
        {
            "name": "John Doe"
        }
        ```
    - **Response:**
        ```json
        {
            "message": "Student data created."
        }
        ```

- **Get Student**
    - **Endpoint:** `GET /students/:student_id`
    - **Response:**
        ```json
        {
            "rollno": 1,
            "name": "John Doe"
        }
        ```

- **Get All Students**
    - **Endpoint:** `GET /students`
    - **Response:**
        ```json
        [
            {
                "rollno": 1,
                "name": "John Doe"
            },
        ]
        ```

- **Update Student**
    - **Endpoint:** `PUT /students/:student_id`
    - **Request Body:**
        ```json
        {
            "name": "John Smith"
        }
        ```
    - **Response:**
        ```json
        {
            "message": "Student details updated."
        }
        ```

- **Delete Student**
    - **Endpoint:** `DELETE /students/:student_id`
    - **Response:**
        ```json
        {
            "message": "Student deleted."
        }
        ```

#### Attendance Management

- **Add Attendance**
    - **Endpoint:** `POST /attendance`
    - **Request Body:**
        ```json
        {
            "rollno": 1,
            "entry_time": "09:00",
            "exit_time": "17:00"
        }
        ```
    - **Response:**
        ```json
        {
            "message": "Attendance added successfully"
        }
        ```

- **Get Present Time for a Month**
    - **Endpoint:** `GET /attendance/:rollno?month=6`
    - **Response:**
        ```json
        {
            "present_time_per_day": [                {
                    "date": "2024-06-01",
                    "total_present_hours": "8.00"
                },
            ]
        }
        ```

#### Fees Management

- **Enroll Student in a Course**
    - **Endpoint:** `POST /fees/enroll`
    - **Request Body:**
        ```json
        {
            "rollno": 1,
            "courseId": 101,
            "isPaid": false
        }
        ```
    - **Response:**
        ```json
        {
            "msg": "Student Enrolled to the course successfully"
        }
        ```

- **Get All Fees Structure**
    - **Endpoint:** `GET /fees`
    - **Response:**
        ```json
        [
            {
                "rollno": 1,
                "course_id": 101,
                "ispaid": false
            },
        ]
        ```

- **Update Payment Status**
    - **Endpoint:** `PUT /fees/payment`
    - **Request Body:**
        ```json
        {
            "rollno": 1,
            "course_id": 101
        }
        ```
    - **Response:**
        ```json
        {
            "msg": "Student has paid for this course"
        }
        ```

### Running the Application

1. Start the server:
    ```bash
    npm start
    ```
2. The application will be running on `http://localhost:3000`.

### Collaborators

- **Attendance Management:** [Adarsh Kumar Debata](https://github.com/adarshdebata)
- **Student Management:** [Satyajit Nayak](https://github.com/Synchrotek)
- **Fees Management:** [Diptiranjan Mahakud](https://github.com/diptiranjanmahakud)

### Detailed Explanation of Key Files

#### `attendanceController.js`
Handles input/output operations for the attendance routes. It uses the service layer to interact with the database.

#### `attendanceService.js`
Contains business logic and database queries for attendance. The `addAttendance` function inserts or updates attendance records. The `getPresentTimeForMonth` function retrieves attendance data for a specific month.

#### `loggerMiddleware.js`
A middleware function that logs incoming requests. It logs the request method, URL, and body for each incoming request.

### Middleware Usage
Middleware functions like `loggerMiddleware` are used to perform operations on the request or response objects before they reach the route handlers or after the response has been sent. In this case, `loggerMiddleware` is used to log request details, which helps in monitoring and debugging the application.