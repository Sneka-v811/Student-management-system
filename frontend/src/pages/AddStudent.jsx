import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import StudentForm from "../components/StudentForm";
import studentService from "../services/studentService";

const AddStudent = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await studentService.createStudent(formData);
      toast.success("Student added successfully!");
      navigate("/students");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add student";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-4">
        <h2 className="fw-bold mb-0">Add New Student</h2>
        <p className="text-muted small mb-0">
          Fill in the details below to register a new student.
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <StudentForm
            onSubmit={handleSubmit}
            submitLabel="Add Student"
            submitting={submitting}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddStudent;
