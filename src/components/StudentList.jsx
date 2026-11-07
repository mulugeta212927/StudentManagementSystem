
function StudentList({
  students,
  searchterm,
  setsearchterm,
  loading,
  editstudent,
  deletestudent,
  togglestatus
}) {
  return (
    <div className="student-section">

      <div className="section-header">
        <div>
          <h2>Student List</h2>
          <p>Manage your registered students</p>
        </div>

        <span className="student-count">
          {students.length} Students
        </span>
      </div>

      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search by name, email..."
          value={searchterm}
          onChange={(event) => setsearchterm(event.target.value)}
        />
      </div>

      {loading && <p className="loading-message">Loading students...</p>}

      {!loading && students.length === 0 && (
        <p className="empty-message">No students found.</p>
      )}

      {!loading && students.length > 0 && (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="student-name">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.department}</td>

                  <td>
                    <span className={`status-badge ${student.status}`}>
                      {student.status}
                    </span>
                  </td>

                  <td className="action-buttons">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => editstudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deletestudent(student.id)}
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      className="status-button"
                      onClick={() => togglestatus(student)}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentList;
