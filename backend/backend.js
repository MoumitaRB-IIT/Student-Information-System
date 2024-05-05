// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');

app.use(bodyParser.json());

app.get('/api/students', async (req, res) => {
    try {
        const [rows, fields] = await db.execute('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching students' });
    }
});

app.post('/api/students', async (req, res) => {
    try {
        console.log(req.body);
        const { firstName, lastName, age, grade, phoneNum, stuId } = req.body;
        const [result] = await db.execute(
            'INSERT INTO students (stu_id, first_name, last_name, age, grade, phone_num) VALUES (?, ?, ?, ?, ?, ?)', 
            [stuId, firstName, lastName, age, grade, phoneNum]
        );
        res.status(200).json({ message: 'Student added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the student' });
    }
});

module.exports = app;