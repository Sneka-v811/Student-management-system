import { useState, useEffect } from "react";
import { DEPARTMENTS, YEARS } from "./SearchFilterBar";

const initialState = {
  name: "",
  rollNumber: "",
  age: "",
  gender: "",
  email: "",
  phone: "",
  department: "",
  year: "",
  address: "",
  dob: "",
};

/**
 * Shared form for both creating and editing a student.
 * Performs client-side validation before calling onSubmit.
 */
const StudentForm = ({ initialData, onSubmit, submitLabel = "Save Student", submitting }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialState,
        ...initialData,
        dob: initialData.dob ? initialData.dob.substring(0, 10) : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }
    if (!formData.age || formData.age < 10 || formData.age > 100) {
      newErrors.age = "Enter a valid age between 10 and 100";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.department) {
      newErrors.department = "Please select a department";
    }
    if (!formData.year) {
      newErrors.year = "Please select a year";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Aarav Sharma"
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Roll Number */}
        <div className="col-md-6">
          <label className="form-label">
            Roll Number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="rollNumber"
            className={`form-control ${errors.rollNumber ? "is-invalid" : ""}`}
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="e.g. CS2023001"
          />
          {errors.rollNumber && <div className="invalid-feedback">{errors.rollNumber}</div>}
        </div>

        {/* Age */}
        <div className="col-md-4">
          <label className="form-label">
            Age <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            name="age"
            className={`form-control ${errors.age ? "is-invalid" : ""}`}
            value={formData.age}
            onChange={handleChange}
            placeholder="e.g. 20"
          />
          {errors.age && <div className="invalid-feedback">{errors.age}</div>}
        </div>

        {/* Gender */}
        <div className="col-md-4">
          <label className="form-label">
            Gender <span className="text-danger">*</span>
          </label>
          <select
            name="gender"
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>

        {/* Date of Birth */}
        <div className="col-md-4">
          <label className="form-label">
            Date of Birth <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            name="dob"
            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>

        {/* Email */}
        <div className="col-md-6">
          <label className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. aarav@example.com"
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="col-md-6">
          <label className="form-label">
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            maxLength={10}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Department */}
        <div className="col-md-6">
          <label className="form-label">
            Department <span className="text-danger">*</span>
          </label>
          <select
            name="department"
            className={`form-select ${errors.department ? "is-invalid" : ""}`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.filter((d) => d !== "All").map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>

        {/* Year */}
        <div className="col-md-6">
          <label className="form-label">
            Year <span className="text-danger">*</span>
          </label>
          <select
            name="year"
            className={`form-select ${errors.year ? "is-invalid" : ""}`}
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select Year</option>
            {YEARS.filter((y) => y !== "All").map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {errors.year && <div className="invalid-feedback">{errors.year}</div>}
        </div>

        {/* Address */}
        <div className="col-12">
          <label className="form-label">
            Address <span className="text-danger">*</span>
          </label>
          <textarea
            name="address"
            rows="3"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={formData.address}
            onChange={handleChange}
            placeholder="Full residential address"
          ></textarea>
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
      </div>

      <div className="mt-4 d-flex gap-2">
        <button type="submit" className="btn btn-primary px-4" disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
