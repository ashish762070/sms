const API_URL = "http://localhost:9090/api/students";

async function getAllStudents() {
    const response = await fetch(API_URL);
    return await response.json();
}

async function getStudent(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
}

async function createStudentApi(student) {
    return await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });
}

async function updateStudentApi(id, student) {
    return await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });
}

async function deleteStudentApi(id) {
    return await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}