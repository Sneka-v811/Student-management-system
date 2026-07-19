import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import StatCard from "../components/StatCard";
import studentService from "../services/studentService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await studentService.getDashboardStats();
      setStats(res.data);
    } catch (error) {
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  const topDepartment = stats?.byDepartment?.[0];

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Dashboard</h2>
        <Link to="/students/add" className="btn btn-primary">
          <i className="bi bi-person-plus-fill me-2"></i>
          Add Student
        </Link>
      </div>

      {/* Statistic Cards */}
      <div className="row g-3 mb-4">
        <StatCard
          icon="bi-people-fill"
          label="Total Students"
          value={stats?.totalStudents ?? 0}
          colorClass="primary"
        />
        <StatCard
          icon="bi-building"
          label="Departments"
          value={stats?.byDepartment?.length ?? 0}
          colorClass="success"
        />
        <StatCard
          icon="bi-mortarboard"
          label="Top Department"
          value={topDepartment ? topDepartment._id : "N/A"}
          colorClass="warning"
        />
        <StatCard
          icon="bi-clock-history"
          label="Recently Added"
          value={stats?.recentStudents?.length ?? 0}
          colorClass="info"
        />
      </div>

      <div className="row g-3">
        {/* Students by Department */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-semibold">
              Students by Department
            </div>
            <div className="card-body">
              {stats?.byDepartment?.length ? (
                stats.byDepartment.map((dept) => {
                  const percentage = stats.totalStudents
                    ? Math.round((dept.count / stats.totalStudents) * 100)
                    : 0;
                  return (
                    <div key={dept._id} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="small fw-medium">{dept._id}</span>
                        <span className="small text-muted">
                          {dept.count} student{dept.count !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-primary"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-muted mb-0">No data available yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Students */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white fw-semibold d-flex justify-content-between align-items-center">
              Recently Added Students
              <Link to="/students" className="small text-decoration-none">
                View All
              </Link>
            </div>
            <ul className="list-group list-group-flush">
              {stats?.recentStudents?.length ? (
                stats.recentStudents.map((student) => (
                  <li
                    key={student._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <div className="fw-medium">{student.name}</div>
                      <div className="small text-muted">
                        {student.department} • {student.rollNumber}
                      </div>
                    </div>
                    <Link
                      to={`/students/${student._id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      View
                    </Link>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">
                  No students added yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
