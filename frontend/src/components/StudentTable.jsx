import { useNavigate } from "react-router-dom";

/**
 * Renders a responsive table of students with view/edit/delete actions
 * and clickable column headers for sorting.
 */
const StudentTable = ({ students, sortBy, order, onSort, onDeleteClick }) => {
  const navigate = useNavigate();

  const columns = [
    { key: "rollNumber", label: "Roll No." },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
    { key: "year", label: "Year" },
    { key: "phone", label: "Phone" },
  ];

  const renderSortIcon = (key) => {
    if (sortBy !== key) return <i className="bi bi-arrow-down-up text-muted small ms-1"></i>;
    return order === "asc" ? (
      <i className="bi bi-sort-alpha-down ms-1"></i>
    ) : (
      <i className="bi bi-sort-alpha-up-alt ms-1"></i>
    );
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-inbox fs-1 d-block mb-2"></i>
        No students found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                role="button"
                onClick={() => onSort(col.key)}
                className="user-select-none"
              >
                {col.label}
                {renderSortIcon(col.key)}
              </th>
            ))}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="fw-semibold">{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <span className="badge bg-primary-subtle text-primary">
                  {student.department}
                </span>
              </td>
              <td>{student.year}</td>
              <td>{student.phone}</td>
              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-outline-secondary"
                    title="View Details"
                    onClick={() => navigate(`/students/${student._id}`)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    title="Edit Student"
                    onClick={() => navigate(`/students/edit/${student._id}`)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    title="Delete Student"
                    onClick={() => onDeleteClick(student)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
