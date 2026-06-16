let editMode = false;

function showMessage(text, type) {
    const messageDiv = document.getElementById("message");

    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = "block";

    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 5000);
}

function resetForm() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";

    document.getElementById("formTitle").textContent =
        "Add New Student";

    document.getElementById("submitBtn").textContent =
        "Add Student";

    document.getElementById("submitBtn").className =
        "btn btn-primary";

    document.getElementById("cancelBtn").style.display =
        "none";

    editMode = false;
}

function populateForm(student) {
    document.getElementById("studentId").value = student.id;
    document.getElementById("firstName").value = student.firstName;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("email").value = student.email;
    document.getElementById("age").value = student.age || "";
    document.getElementById("course").value = student.course || "";

    document.getElementById("formTitle").textContent =
        "Update Student";

    document.getElementById("submitBtn").textContent =
        "Update Student";

    document.getElementById("submitBtn").className =
        "btn btn-success";

    document.getElementById("cancelBtn").style.display =
        "inline-block";

    editMode = true;
}

function renderStudents(students) {

    const tbody =
        document.getElementById("studentTableBody");

    if (students.length === 0) {
        tbody.innerHTML = `
        <tr>
            <td colspan="7" class="empty-state">
                <p>No students found. Add your first student above!</p>
            </td>
        </tr>
        `;
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.age || "-"}</td>
            <td>${student.course || "-"}</td>
            <td>
                <div class="actions">
                    <button
                        class="btn btn-warning"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join("");
}