import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import ConfirmDialog from "../components/ConfirmDialog";
import studentService from "../services/studentService";

const DetailRow = ({ icon, label, value }) => (
  <div className="col-md-6 d-flex align-items-start gap-3 mb-3">
    <div className="detail-icon">
      <i className={`bi ${icon}`}></i>
    </div>
    <div>
      <div className="small text-muted">{label}</div>
      <div className="fw-medium">{value || "—"}</div>
    </div>
  </div>
);

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchStudent = async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudentById(id);
      setStudent(res.data);
    } catch (error) {
      toast.error("Student not found");
      navigate("/students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await studentService.deleteStudent(id);
      toast.success("Student deleted successfully");
      navigate("/students");
    } catch (error) {
      toast.error("Failed to delete student");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (!student) return null;

  const formattedDob = new Date(student.dob).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedCreatedAt = new Date(student.createdAt).toLocaleString("en-IN");

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <Link to="/students" className="text-decoration-none small">
            <i className="bi bi-arrow-left me-1"></i> Back to Students
          </Link>
          <h2 className="fw-bold mb-0 mt-1">{student.name}</h2>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate(`/students/edit/${student._id}`)}
          >
            <i className="bi bi-pencil me-2"></i>Edit
          </button>
          <button className="btn btn-outline-danger" onClick={() => setShowDelete(true)}>
            <i className="bi bi-trash me-2"></i>Delete
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
            <div className="student-avatar">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="mb-0">{student.name}</h4>
              <span className="badge bg-primary-subtle text-primary me-2">
                {student.department}
              </span>
              <span className="badge bg-secondary-subtle text-secondary">
                {student.year}
              </span>
            </div>
          </div>

          <div className="row">
            <DetailRow icon="bi-hash" label="Roll Number" value={student.rollNumber} />
            <DetailRow icon="bi-envelope" label="Email" value={student.email} />
            <DetailRow icon="bi-telephone" label="Phone Number" value={student.phone} />
            <DetailRow icon="bi-gender-ambiguous" label="Gender" value={student.gender} />
            <DetailRow icon="bi-calendar-event" label="Date of Birth" value={formattedDob} />
            <DetailRow icon="bi-person-badge" label="Age" value={student.age} />
            <DetailRow icon="bi-geo-alt" label="Address" value={student.address} />
            <DetailRow
              icon="bi-clock-history"
              label="Registered On"
              value={formattedCreatedAt}
            />
          </div>
        </div>
      </div>

      <ConfirmDialog
        show={showDelete}
        title="Delete Student"
        message={`Are you sure you want to delete "${student.name}"? This action cannot be undone.`}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </Layout>
  );
};

export default StudentDetails;
