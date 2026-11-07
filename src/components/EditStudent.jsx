
function EditStudent({
  editingstudent,
  seteditingstudent,
  updateStudent
}) {
  if (!editingstudent) {
    return null;
  }

  function handlesubmit(event) {
    event.preventDefault();
    updateStudent(editingstudent);
  }

  return (
    <form className="edit-student-form" onSubmit={handlesubmit}>

      <div className="form-header">
        <h2>Edit Student</h2>
        <p>Update the student's information.</p>
      </div>

      <div className="form-group">
        <label>Student Name</label>
        <input
          type="text"
          value={editingstudent.name}
          onChange={(event) =>
            seteditingstudent({
              ...editingstudent,
              name: event.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={editingstudent.email}
          onChange={(event) =>
            seteditingstudent({
              ...editingstudent,
              email: event.target.value
            })
          }
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <input
          type="text"
          value={editingstudent.department}
          onChange={(event) =>
            seteditingstudent({
              ...editingstudent,
              department: event.target.value
            })
          }
        />
      </div>

      <div className="edit-actions">
        <button type="submit" className="save-button">
          Save Changes
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={() => seteditingstudent(null)}
        >
          Cancel
        </button>
      </div>

    </form>
  );
}

export default EditStudent;
