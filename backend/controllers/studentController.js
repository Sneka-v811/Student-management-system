const Student = require("../models/Student");

/**
 * @desc    Get all students (supports search, sort, filter, pagination)
 * @route   GET /api/students
 * @access  Private
 *
 * Query params supported:
 *  - search: text to search across name, email, rollNumber
 *  - department: filter by exact department
 *  - year: filter by exact year
 *  - sortBy: field to sort by (default: createdAt)
 *  - order: "asc" | "desc" (default: desc)
 *  - page, limit: pagination
 */
const getStudents = async (req, res) => {
  try {
    const {
      search,
      department,
      year,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search across multiple fields (case-insensitive)
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ name: regex }, { email: regex }, { rollNumber: regex }];
    }

    // Filter by department
    if (department && department !== "All") {
      query.department = department;
    }

    // Filter by year
    if (year && year !== "All") {
      query.year = year;
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [students, total] = await Promise.all([
      Student.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limitNum),
      Student.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: students,
    });
  } catch (error) {
    console.error("Get Students Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching students",
    });
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Private
 */
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Get Student Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching student",
    });
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Private
 */
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    console.error("Create Student Error:", error.message);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `A student with this ${field} already exists`,
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error creating student",
    });
  }
};

/**
 * @desc    Update an existing student
 * @route   PUT /api/students/:id
 * @access  Private
 */
const updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true, // run schema validators on update
    });

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Update Student Error:", error.message);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        success: false,
        message: `A student with this ${field} already exists`,
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error updating student",
    });
  }
};

/**
 * @desc    Delete a student
 * @route   DELETE /api/students/:id
 * @access  Private
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error deleting student",
    });
  }
};

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/students/stats/dashboard
 * @access  Private
 */
const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();

    // Group students by department
    const byDepartment = await Student.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Group students by year
    const byYear = await Student.aggregate([
      { $group: { _id: "$year", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // Most recently added students
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        byDepartment,
        byYear,
        recentStudents,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error fetching dashboard statistics",
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
};
