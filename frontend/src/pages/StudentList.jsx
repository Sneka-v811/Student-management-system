import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import StudentTable from "../components/StudentTable";
import SearchFilterBar from "../components/SearchFilterBar";
import ConfirmDialog from "../components/ConfirmDialog";
import studentService from "../services/studentService";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [studentToDelete, setStudentToDelete] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await studentService.getStudents({
        search: search || undefined,
        department,
        year,
        sortBy,
        order,
        page,
        limit: 10,
      });
      setStudents(res.data);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch (error) {
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  }, [search, department, year, sortBy, order, page]);

  // Debounce search input so we don't fire a request on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchStudents();
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department, year, sortBy, order]);

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    setDeleting(true);
    try {
      await studentService.deleteStudent(studentToDelete._id);
      toast.success(`${studentToDelete.name} has been deleted`);
      setStudentToDelete(null);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete student");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Students</h2>
          <p className="text-muted small mb-0">{total} total student(s)</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            department={department}
            onDepartmentChange={setDepartment}
            year={year}
            onYearChange={setYear}
          />

          {loading ? (
            <Spinner />
          ) : (
            <>
              <StudentTable
                students={students}
                sortBy={sortBy}
                order={order}
                onSort={handleSort}
                onDeleteClick={setStudentToDelete}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center mb-0">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setPage((p) => p - 1)}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <li key={p} className={`page-item ${page === p ? "active" : ""}`}>
                        <button className="page-link" onClick={() => setPage(p)}>
                          {p}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmDialog
        show={!!studentToDelete}
        title="Delete Student"
        message={`Are you sure you want to delete "${studentToDelete?.name}"? This action cannot be undone.`}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setStudentToDelete(null)}
      />
    </Layout>
  );
};

export default StudentList;
