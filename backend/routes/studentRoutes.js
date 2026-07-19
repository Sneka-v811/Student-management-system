const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
} = require("../controllers/studentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All student routes are protected (require a valid JWT)
router.use(protect);

// @route   GET /api/students/stats/dashboard
// NOTE: defined before "/:id" so "stats" isn't treated as an ID
router.get("/stats/dashboard", getDashboardStats);

// @route   GET /api/students | POST /api/students
router.route("/").get(getStudents).post(createStudent);

// @route   GET/PUT/DELETE /api/students/:id
router
  .route("/:id")
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
