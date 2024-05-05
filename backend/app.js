document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentList = document.getElementById('studentItems');

    // Fetch and display initial student list
    fetchStudents();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const studentData = {
            name: formData.get('name'),
            age: formData.get('age')
        };

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(studentData)
            });

            if (!response.ok) {
                throw new Error('Failed to add/update student');
            }

            form.reset();
            fetchStudents();
            showSuccessMessage('Student added/updated successfully.');
        } catch (error) {
            console.error('Error:', error.message);
            showErrorMessage('Failed to add/update student.');
        }
    });

    async function fetchStudents() {
        try {
            const response = await fetch('/api/students');
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }

            const students = await response.json();
            displayStudents(students);
        } catch (error) {
            console.error('Error:', error.message);
            showErrorMessage('Failed to fetch student data.');
        }
    }

    function displayStudents(students) {
        studentList.innerHTML = '';
        students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.classList.add('studentItem');
            studentItem.textContent = `${student.name} - Age: ${student.age}`;
            studentList.appendChild(studentItem);
        });
    }

    function showSuccessMessage(message) {
        const successMsg = document.createElement('div');
        successMsg.classList.add('success');
        successMsg.textContent = message;
        form.appendChild(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }

    function showErrorMessage(message) {
        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error');
        errorMsg.textContent = message;
        form.appendChild(errorMsg);

        setTimeout(() => {
            errorMsg.remove();
        }, 3000);
    }
});
