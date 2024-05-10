// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');

app.use(bodyParser.json());

// Fetch all students
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching students' });
    }
});

// Add a new student
app.post('/api/students', async (req, res) => {
    try {
        
        const { FIRST_NAME: firstName, LAST_NAME: lastName, AGE: age, GRADE: grade, PHONE_NUM: phoneNum } = req.body;
        
        // Basic validation 
        if (!firstName || !lastName || !age || !grade || !phoneNum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await db.execute(
            'INSERT INTO students (first_name, last_name, age, grade, phone_num) VALUES (?, ?, ?, ?, ?)', 
            [firstName, lastName, age, grade, phoneNum]
        );        
        res.status(200).json({ message: 'Student added successfully.', studentId: result.insertId });   
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the student' });
    }
});

// Search for students by name
app.get('/api/students/search', async (req, res) => {
    try {
        // Define allowed columns to search
        const allowedColumns = ['stu_id', 'phone_num'];
        
        // Collect all query parameters
        const queryParams = req.query;
        
        // Filter query parameters against allowed columns
        const validParams = Object.keys(queryParams)
            .filter(key => allowedColumns.includes(key))
            .reduce((obj, key) => {
                obj[key] = queryParams[key];
                return obj;
            }, {});

        // Start constructing the SQL query
        let query = 'SELECT * FROM students';
        const values = [];

        if (Object.keys(validParams).length) {
            query += ' WHERE ';
            const conditions = Object.keys(validParams).map((key) => {
                // Use the validParams to ensure only allowed columns are included
                values.push(`%${validParams[key]}%`);
                return `${key} LIKE ?`;
            });
            query += conditions.join(' AND ');
        }

        // Execute the query
        const [rows] = await db.execute(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while searching for students' });
    }
});


// Update a student
app.put('/api/students/:id', async (req, res) => {
    try {
        
        const { FIRST_NAME: firstName, LAST_NAME: lastName, AGE: age, GRADE: grade, PHONE_NUM: phoneNum } = req.body;
        const studentId = req.params.id;
        const [result] = await db.execute(
            'UPDATE students SET first_name = ?, last_name = ?, age = ?, grade = ?, phone_num = ? WHERE stu_id = ?', 
            [firstName, lastName, age, grade, phoneNum, studentId]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Student updated successfully.' });
        } else {
            res.status(404).json({ error: 'Student not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating the student' });
    }
});

// Delete a student
app.delete('/api/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const [result] = await db.execute('DELETE FROM students WHERE stu_id = ?', [studentId]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Student deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Student not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the student' });
    }
});

module.exports = app;