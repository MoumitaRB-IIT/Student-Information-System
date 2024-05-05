# Student Management System

This is a simple Student Management System built with Node.js and Express. It allows you to add students to a database and retrieve them.

## Features

- Add a student with details like first name, last name, age, grade, phone number, and student ID.
- Retrieve all students from the database.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/student-management-system.git`
2. Navigate to the project directory: `cd student-management-system`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

## Usage

### Add a Student

Send a `POST` request to `/api/students` with the student details in the request body.

Example:

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 20,
    "grade": "A",
    "phoneNum": "1234567890",
    "stuId": "s123"
}