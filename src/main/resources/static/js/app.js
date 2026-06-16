document.addEventListener("DOMContentLoaded", () => {

    loadStudents();

    document
        .getElementById("studentForm")
        .addEventListener("submit", handleSubmit);

    document
        .getElementById("cancelBtn")
        .addEventListener("click", resetForm);
});

async function handleSubmit(e) {

    e.preventDefault();

    const student = {
        firstName:
            document.getElementById("firstName").value,

        lastName:
            document.getElementById("lastName").value,

        email:
            document.getElementById("email").value,

        age:
            parseInt(
                document.getElementById("age").value
            ) || null,

        course:
            document.getElementById("course").value
    };

    try {

        if (editMode) {

            const id =
                document.getElementById("studentId").value;

            const response =
                await updateStudentApi(id, student);

            if (response.ok) {
                showMessage(
                    "Student updated successfully!",
                    "success"
                );

                resetForm();
                loadStudents();
            }

        } else {

            const response =
                await createStudentApi(student);

            if (response.ok) {
                showMessage(
                    "Student added successfully!",
                    "success"
                );

                resetForm();
                loadStudents();
            }
        }

    } catch (error) {
        showMessage(error.message, "error");
    }
}

async function loadStudents() {

    try {

        const students =
            await getAllStudents();

        renderStudents(students);

    } catch (error) {

        showMessage(
            "Error loading students: " +
            error.message,
            "error"
        );
    }
}

async function editStudent(id) {

    try {

        const student =
            await getStudent(id);

        populateForm(student);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        showMessage(
            "Error loading student: " +
            error.message,
            "error"
        );
    }
}

async function deleteStudent(id) {

    if (
        !confirm(
            "Are you sure you want to delete this student?"
        )
    ) {
        return;
    }

    try {

        const response =
            await deleteStudentApi(id);

        if (response.ok) {

            showMessage(
                "Student deleted successfully!",
                "success"
            );

            loadStudents();
        }

    } catch (error) {

        showMessage(
            error.message,
            "error"
        );
    }
}