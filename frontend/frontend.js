document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = '/api/students'; 

    // Fetch and display students
    async function fetchStudents() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const students = await response.json();
            console.log(students);

            const container = document.getElementById('studentsContainer');
            if (!container) {
                console.error('Container element not found');
                return;
            }

            // Clear existing content
            container.innerHTML = '';

            // Create and populate table with students data
            const table = document.createElement('table');
            table.style.width = '100%';
            table.setAttribute('border', '1');

            // Table header
            const headerRow = document.createElement('tr');
            ['STU_ID', 'FIRST_NAME', 'LAST_NAME', 'AGE', 'GRADE', 'PHONE_NUM'].forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);

            // Table body
            students.forEach(student => {
                const studentRow = document.createElement('tr');
                ['STU_ID', 'FIRST_NAME', 'LAST_NAME', 'AGE', 'GRADE', 'PHONE_NUM'].forEach(property => {
                    const td = document.createElement('td');
                    td.textContent = student[property] || '';
                    studentRow.appendChild(td);
                });
                table.appendChild(studentRow);
            });

            container.appendChild(table);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Attach event listener to fetch students button
    const fetchStudentsBtn = document.getElementById('fetchStudents');
    if (fetchStudentsBtn) {
        fetchStudentsBtn.addEventListener('click', fetchStudents);
    } else {
        console.error('Fetch Students button not found');
    }

    // Add a new student
    async function addStudent(student) {
        try {
            event.preventDefault();
            const response = await fetch(apiUrl, {
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
            
            alert("Student added successfully"); // Display success message
            fetchStudents(); // Refresh the list after adding
        } catch (error) {
            console.error('An error occurred while adding the student:', error);
        }
    }

    // Handle student form submission
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        studentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const student = {                
                FIRST_NAME: document.getElementById('firstName').value,
                LAST_NAME: document.getElementById('lastName').value,
                AGE: document.getElementById('age').value,
                GRADE: document.getElementById('grade').value,
                PHONE_NUM: document.getElementById('phoneNum').value,
            };
            
            await addStudent(student);
        });
    } else {
        console.error('Student form not found');
    }

    // Search and display student details for updating
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', async function() {
            const searchInputs = {            
                stu_id: document.getElementById('searchStudentId').value,
                phone_num: document.getElementById('searchPhoneNum').value 
            };

            const searchParams = new URLSearchParams();
            Object.keys(searchInputs).forEach(key => {
                if (searchInputs[key].trim() !== '') {
                    searchParams.append(key, searchInputs[key]);
                }
            });

            try {
                const response = await fetch(`${apiUrl}/search?${searchParams.toString()}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const students = await response.json();
                if (students.length > 0) {
                    const student = students[0]; 
                    document.getElementById('updateFirstName').value = student.FIRST_NAME;
                    document.getElementById('updateLastName').value = student.LAST_NAME;
                    document.getElementById('updateAge').value = student.AGE;
                    document.getElementById('updateGrade').value = student.GRADE;
                    document.getElementById('updatePhoneNum').value = student.PHONE_NUM;
                    document.getElementById('updatingStudentId').value = student.STU_ID;
                    document.getElementById('deletingStudentId').value = student.STU_ID;

                    document.getElementById('updateStudentSection').style.display = 'block';
                    document.getElementById('deleteStudentSection').style.display = 'block';
                } else {
                    console.log('No students found');
                }
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        });
    } else {
        console.error('Search button not found');
    }

    // Update student details
    const updateStudentForm = document.getElementById('updateStudentForm');
    if (updateStudentForm) {
        updateStudentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const studentId = document.getElementById('updatingStudentId').value;
            const updatedStudent = {
                FIRST_NAME: document.getElementById('updateFirstName').value,
                LAST_NAME: document.getElementById('updateLastName').value,
                AGE: document.getElementById('updateAge').value,
                GRADE: document.getElementById('updateGrade').value,
                PHONE_NUM: document.getElementById('updatePhoneNum').value,
            };
            console.log(updatedStudent);
            try {
                const response = await fetch(`${apiUrl}/${studentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedStudent),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                alert('Student updated successfully');
                fetchStudents(); 
            } catch (error) {
                console.error('Error updating student:', error);
            }
        });
    } else {
        console.error('Update student form not found');
    }

    // Delete a student
    const deleteButton = document.getElementById('deleteButton');
    if (deleteButton) {
        deleteButton.addEventListener('click', async function() {
            event.preventDefault(); 
            const studentId = document.getElementById('deletingStudentId').value;
            console.log(studentId);
            try {
                const response = await fetch(`${apiUrl}/${studentId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                alert('Student deleted successfully');
                fetchStudents(); 
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        });
    } else {
        console.error('Delete button not found');
    }
});