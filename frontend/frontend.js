// index.js
async function fetchStudents() {
    try {
        const response = await fetch('/api/students');
        const students = await response.json();
        console.log(students);

        // Get the container element
        const container = document.getElementById('studentsContainer');

        // Remove any existing children of the container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Create a new table
        const table = document.createElement('table');

        // Create a new table row for the header
        const headerRow = document.createElement('tr');
        ['STU_ID', 'FIRST_NAME', 'LAST_NAME', 'AGE', 'GRADE', 'PHONE_NUM'].forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Create a new table row for each student and append it to the table
        students.forEach(student => {
            const studentRow = document.createElement('tr');
            ['STU_ID', 'FIRST_NAME', 'LAST_NAME', 'AGE', 'GRADE', 'PHONE_NUM'].forEach(property => {
                const td = document.createElement('td');
                td.textContent = student[property] || '';  // Use an empty string if the property is null
                studentRow.appendChild(td);
            });
            table.appendChild(studentRow);
        });

        // Append the table to the container
        container.appendChild(table);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Attach the fetchStudents function to the click event of the "Load Students" button
document.getElementById('fetchStudents').addEventListener('click', fetchStudents);

async function addStudent(student) {
    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('An error occurred while adding the student:', error);
    }
}

document.getElementById('studentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const phoneNum = document.getElementById('phoneNum').value;
    const stuId = document.getElementById('stuId').value;

    const student = { firstName, lastName, age, grade, phoneNum, stuId };

    await addStudent(student);
});