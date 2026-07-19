import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import StudentForm from "../components/StudentForm";
import studentService from "../services/studentService";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      toast.error("Failed to load student details");
      navigate("/students");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await studentService.updateStudent(id, formData);
      toast.success("Student updated successfully!");
      navigate("/students");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update student";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-4">
        <h2 className="fw-bold mb-0">Edit Student</h2>
        <p className="text-muted small mb-0">
          Update the details for {student?.name}.
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <StudentForm
            initialData={student}
            onSubmit={handleSubmit}
            submitLabel="Update Student"
            submitting={submitting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditStudent;
