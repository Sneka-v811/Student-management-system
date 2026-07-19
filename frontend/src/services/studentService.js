import api from "./api";

/**
 * Fetches a list of students with optional search/filter/sort/pagination params.
 * @param {Object} params - { search, department, year, sortBy, order, page, limit }
 */
const getStudents = async (params = {}) => {
  const response = await api.get("/students", { params });
  return response.data;
};

const getStudentById = async (id) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

const createStudent = async (studentData) => {
  const response = await api.post("/students", studentData);
  return response.data;
};

const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}`, studentData);
  return response.data;
};

const deleteStudent = async (id) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

const getDashboardStats = async () => {
  const response = await api.get("/students/stats/dashboard");
  return response.data;
};

const studentService = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
};

export default studentService;
