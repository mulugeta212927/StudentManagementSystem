
function StudentForm({
  name,
  setname,
  email,
  setemail,
  department,
  setdepartment,
  errors,
  addstudent
}) {
  return (
    <form className="student-form" onSubmit={addstudent}>

      <div className="form-header">
        <h2>Add New Student</h2>
        <p>Enter student information below.</p>
      </div>

      <div className="form-group">
        <label htmlFor="student-name">Student Name</label>

        <input
          id="student-name"
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(event) => setname(event.target.value)}
        />

        {errors.name && (
          <p className="error">{errors.name}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="student-email">Email Address</label>

        <input
          id="student-email"
          type="email"
          placeholder="Enter student email"
          value={email}
          onChange={(event) => setemail(event.target.value)}
        />

        {errors.email && (
          <p className="error">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="student-department">Department</label>

        <input
          id="student-department"
          type="text"
          placeholder="Enter department"
          value={department}
          onChange={(event) => setdepartment(event.target.value)}
        />

        {errors.department && (
          <p className="error">{errors.department}</p>
        )}
      </div>

      <button type="submit" className="submit-button">
        + Add Student
      </button>

    </form>
  );
}

export default StudentForm;
