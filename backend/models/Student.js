const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [10, "Age must be at least 10"],
      max: [100, "Age must be realistic"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: [
          "Computer Science",
          "Information Technology",
          "Electronics",
          "Electrical",
          "Mechanical",
          "Civil",
          "Business Administration",
          "Other",
        ],
        message: "Please select a valid department",
      },
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      enum: {
        values: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        message: "Please select a valid year",
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [300, "Address cannot exceed 300 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Index for faster search queries on common search fields
studentSchema.index({ name: "text", email: "text", rollNumber: "text" });

module.exports = mongoose.model("Student", studentSchema);
