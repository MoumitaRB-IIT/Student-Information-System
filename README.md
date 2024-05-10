# Student Management System

This Student Management System is a robust web application built using Node.js and Express. It facilitates the management of student records by allowing users to add, search, update, and delete student information in a database. This system is designed to streamline the process of managing student details for educational institutions.

## Features

- **Add a Student**: Insert new student records into the database with comprehensive details.
- **Search All Students**: Retrieve a list of all students currently stored in the database.
- **Search for a Specific Student**: Look up a student using their unique student ID or phone number.
- **Update a Student**: Modify the details of an existing student record.
- **Delete a Student**: Remove a student's record from the database.

## Installation

To get the Student Management System up and running on your local machine, follow these steps:

1. **Clone the Repository**
   ```
   git clone https://github.com/yourusername/student-management-system.git
   ```
2. **Navigate to the Project Directory**
   ```
   cd student-management-system
   ```
3. **Install Dependencies**
   ```
   npm install
   ```
4. **Start the Server**
   ```
   npm start
   ```

## Usage

### Web Interface

Navigate to `http://localhost:3000` in your web browser to access the Student Management System UI. The interface includes:

The Student Management System features an intuitive web interface accessible at `http://localhost:3000` after starting the server. This interface facilitates seamless interaction with the system's core functionalities without the need for direct API calls. Here's what you can do through the UI:

- **Add Student**: A dedicated section allows for the easy addition of new student records. Simply fill out the form with the student's details and submit.

- **View All Students**: With a single click, users can list all students currently stored in the database. This feature provides a quick overview of all student records.

- **Search for a Student**: Users can search for a specific student using their student ID or phone number. Upon conducting a search, the system displays the relevant student's details.

- **Update/Delete a Student**: After searching for a student, the interface reveals options to either update the student's information or delete their record. These options ensure that managing student data is both straightforward and efficient.

This user-friendly interface is designed to accommodate users of all technical levels, ensuring that student data can be managed with ease and efficiency.

### REST Interface

### Add a Student

To add a new student, send a `POST` request to `/api/students` with the student's details in the request body.

Example request body:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "age": 20,
    "grade": "A",
    "phoneNum": "1234567890",
    "stuId": "s123"
}
```

### Search All Students

To retrieve a list of all students, send a `GET` request to `/api/students`.

### Search for a Specific Student

To find a specific student by their student ID or phone number, send a `GET` request to `/api/students/search` with the appropriate query parameter.

- By Student ID: `/api/students/search?stuId=s123`
- By Phone Number: `/api/students/search?phoneNum=1234567890`

### Update a Student

To update an existing student's details, send a `PUT` request to `/api/students/{stuId}` with the updated information in the request body.

Example URL: `/api/students/s123`

Example request body:
```json
{
    "firstName": "Jane",
    "lastName": "Doe",
    "age": 21,
    "grade": "A+",
    "phoneNum": "0987654321"
}
```

### Delete a Student

To delete a student, send a `DELETE` request to `/api/students/{stuId}`.

Example: `/api/students/s123`

## Contributing

Contributions to the Student Management System are welcome. Please fork the repository, make your changes, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Contact

For any queries or further information, please reach out to [mroy7@hawk.iit.edu].