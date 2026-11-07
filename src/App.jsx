
import "./App.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import EditStudent from "./components/EditStudent";

import {
  getstudents,
  addstudent as createStudent,
  deletestudent as removeStudent,
  updatestudent as updateStudent,
} from "./services/studentService";


function App() {

  // 1. STATES

  const [editingstudent, seteditingstudent] = useState(null);
  const [students, setstudents] = useState([]);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [department, setdepartment] = useState("");

  const [searchterm, setsearchterm] = useState("");
  const [errors, seterrors] = useState({});
  const [notification, setnotification] = useState({message: "", type: ""});


  const [loading, setloading] = useState(true);
  const [apiError, setapiError] = useState(null);


  // 2. LOGOUT
function showNotification(message, type = "success") {
  setnotification({
    message: message,
    type: type
  });

  setTimeout(() => {
    setnotification({
      message: "",
      type: ""
    });
  }, 3000);
}
  async function logout() {

    const token = localStorage.getItem("token");

    try {

      await fetch("http://127.0.0.1:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
      });

    } catch (error) {

      console.error("Logout error:", error);

    }

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.href = "/login";
  }


  // 3. EDIT STUDENT

  function editstudent(student) {

    seteditingstudent({ ...student });

  }


  // 4. SEARCH STUDENTS

  const filteredstudents = students.filter((student) =>
    (student.name || "")
      .toLowerCase()
      .includes(searchterm.toLowerCase())
  );


  // 5. LOAD STUDENTS FROM DJANGO

  useEffect(() => {

    async function loadstudents() {

      const token = localStorage.getItem("token");

      if (!token) {
        setloading(false);
        return;
      }

      try {

        setloading(true);
        setapiError(null);

        const data = await getstudents();

        setstudents(
          Array.isArray(data)
            ? data
            : Array.isArray(data.results)
              ? data.results
              : []
        );

      } catch (error) {

        console.error("Fetch error:", error);
        setapiError(error.message);

      } finally {

        setloading(false);

      }
    }

    loadstudents();

  }, []);


  // 6. ADD STUDENT
async function addstudent(event) {
  event.preventDefault();

  const newerrors = {};

  if (!name.trim()) {
    newerrors.name = "Name is required";
  }

  if (!email.trim()) {
    newerrors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    newerrors.email = "Please enter a valid email";
  }

  if (!department.trim()) {
    newerrors.department = "Department is required";
  }

  seterrors(newerrors);

  if (Object.keys(newerrors).length > 0) {
    return;
  }

  const newstudent = {
    name: name.trim(),
    email: email.trim(),
    department: department.trim()
  };

  try {
    const savedstudent = await createStudent(newstudent);

    setstudents((previousstudents) => [
      ...previousstudents,
      savedstudent
    ]);

    setname("");
    setemail("");
    setdepartment("");
    seterrors({});

    showNotification(
      "Student added successfully!",
      "success"
    );

  } catch (error) {
    console.error("Add student error:", error);

    showNotification(
      error.message || "Failed to add student!",
      "error"
    );
  }
}


  // 7. DELETE STUDENT

  async function deletestudent(id) {
  const confirmdelete = window.confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmdelete) {
    return;
  }

  try {
    await removeStudent(id);

    setstudents((previousstudents) =>
      previousstudents.filter((student) => student.id !== id)
    );

    showNotification(
      "Student deleted successfully!",
      "success"
    );

  } catch (error) {
    console.error("Delete student error:", error);

    showNotification(
      error.message || "Failed to delete student!",
      "error"
    );
  }
}


  // 8. UPDATE STUDENT

async function updatestudent(student) {
  try {
    await updateStudent(student.id, {
      name: student.name,
      email: student.email,
      department: student.department,
    });

    const data = await getstudents();

    setstudents(
      Array.isArray(data)
        ? data
        : Array.isArray(data.results)
          ? data.results
          : []
    );

    seteditingstudent(null);

    showNotification(
      "Student updated successfully!",
      "success"
    );

  } catch (error) {
    console.error("Update error:", error);

    showNotification(
      error.message || "Unable to update student!",
      "error"
    );
  }
}


  // 9. TOGGLE STUDENT STATUS

async function togglestatus(student) {
  const newstatus =
    student.status === "active" ? "inactive" : "active";

  try {
    const savedstudent = await updateStudent(student.id, {
      status: newstatus,
    });

    setstudents((previousstudents) =>
      previousstudents.map((item) =>
        item.id === student.id ? savedstudent : item
      )
    );

    showNotification(
      `Student status changed to ${newstatus}!`,
      "success"
    );

  } catch (error) {
    console.error("Status error:", error);

    showNotification(
      error.message || "Failed to change student status!",
      "error"
    );
  }
}


  // 10. USER INTERFACE

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* REGISTER PAGE */}

        <Route
          path="/register"
          element={<Register />}
        />


        {/* DASHBOARD PAGE */}


        <Route
          path="/dashboard"
          element={

            <ProtectedRoute>

              <div className="app-layout">

                {/* SIDEBAR - ONLY ONCE */}

                <Sidebar />


                {/* MAIN CONTENT */}

                <main className="main-content">
                          {notification.message && (
  <div className={`notification ${notification.type}`}>
    {notification.message}
  </div>
)}

                  <div className="container">

                    {/* HEADER */}

                    <div className="top-header">

                      <h2>Student Management System</h2>

                      <button
                        type="button"
                        className="logout-button"
                        onClick={logout}
                      >
                        Logout
                      </button>

                    </div>


                    {/* API ERROR */}

                    {apiError && (
                      <p className="error">
                        {apiError}
                      </p>
                    )}


                    {/* DASHBOARD */}

                    <Dashboard students={students} />


                    {/* EDIT STUDENT */}

                    <EditStudent
                      editingstudent={editingstudent}
                      seteditingstudent={seteditingstudent}
                      updateStudent={updatestudent}
                    />


                    {/* ADD STUDENT */}

                    <div id="add-student">

                      <StudentForm
                        name={name}
                        setname={setname}
                        email={email}
                        setemail={setemail}
                        department={department}
                        setdepartment={setdepartment}
                        errors={errors}
                        addstudent={addstudent}
                      />

                    </div>


                    {/* STUDENT LIST */}

                    <div id="students">

                      <StudentList
                        students={filteredstudents}
                        searchterm={searchterm}
                        setsearchterm={setsearchterm}
                        loading={loading}
                        editstudent={editstudent}
                        deletestudent={deletestudent}
                        togglestatus={togglestatus}
                      />

                    </div>

                  </div>

                </main>

              </div>

            </ProtectedRoute>

          }
        />


        {/* DEFAULT PAGE */}

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
