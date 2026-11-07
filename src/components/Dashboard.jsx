function Dashboard({ students }) {

  const totalstudents = students.length;

  const activestudents = students.filter(
    (student) => student.status === "active"
  ).length;

  const inactivestudents = students.filter(
    (student) => student.status === "inactive"
  ).length;

  return (
    <>
      <div className="dashboard-header">

      <div>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your student overview.</p>
      </div>

      <div className="user-profile">
        <div className="profile-icon">M</div>
        <div>
          <h4>Administrator</h4>
          <span>Admin</span>
        </div>
      </div>

    </div>

    <div className="stats">

      <div className="card total-card">
        <div className="card-info">
          <h3>Total Students</h3>
          <p>{totalstudents}</p>
        </div>
        <div className="card-icon">👨‍🎓</div>
      </div>

      <div className="card active-card">
        <div className="card-info">
          <h3>Active Students</h3>
          <p>{activestudents}</p>
        </div>
        <div className="card-icon">✓</div>
      </div>

      <div className="card inactive-card">
        <div className="card-info">
          <h3>Inactive Students</h3>
          <p>{inactivestudents}</p>
        </div>
        <div className="card-icon">⏸</div>
      </div>

    </div>
    </>
  );
}

export default Dashboard;