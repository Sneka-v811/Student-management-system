/**
 * Seed script - populates the database with a default admin account
 * and sample student records for testing/demo purposes.
 *
 * Run with: npm run seed
 */
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const Student = require("../models/Student");

dotenv.config();

const sampleStudents = [
  {
    name: "Aarav Sharma",
    rollNumber: "CS2023001",
    age: 20,
    gender: "Male",
    email: "aarav.sharma@example.com",
    phone: "9876543210",
    department: "Computer Science",
    year: "3rd Year",
    address: "12 MG Road, Bengaluru, Karnataka",
    dob: new Date("2004-05-14"),
  },
  {
    name: "Priya Nair",
    rollNumber: "IT2023002",
    age: 19,
    gender: "Female",
    email: "priya.nair@example.com",
    phone: "9876543211",
    department: "Information Technology",
    year: "2nd Year",
    address: "45 Marine Drive, Kochi, Kerala",
    dob: new Date("2005-02-21"),
  },
  {
    name: "Rohan Verma",
    rollNumber: "EC2023003",
    age: 21,
    gender: "Male",
    email: "rohan.verma@example.com",
    phone: "9876543212",
    department: "Electronics",
    year: "4th Year",
    address: "78 Civil Lines, Delhi",
    dob: new Date("2003-11-02"),
  },
  {
    name: "Sneha Iyer",
    rollNumber: "ME2023004",
    age: 20,
    gender: "Female",
    email: "sneha.iyer@example.com",
    phone: "9876543213",
    department: "Mechanical",
    year: "3rd Year",
    address: "23 Anna Nagar, Chennai, Tamil Nadu",
    dob: new Date("2004-08-09"),
  },
  {
    name: "Vikram Singh",
    rollNumber: "CE2023005",
    age: 22,
    gender: "Male",
    email: "vikram.singh@example.com",
    phone: "9876543214",
    department: "Civil",
    year: "4th Year",
    address: "56 Model Town, Ludhiana, Punjab",
    dob: new Date("2002-12-30"),
  },
  {
    name: "Ananya Gupta",
    rollNumber: "BA2023006",
    age: 19,
    gender: "Female",
    email: "ananya.gupta@example.com",
    phone: "9876543215",
    department: "Business Administration",
    year: "1st Year",
    address: "9 Salt Lake, Kolkata, West Bengal",
    dob: new Date("2005-06-18"),
  },
  {
    name: "Karthik Reddy",
    rollNumber: "CS2023007",
    age: 21,
    gender: "Male",
    email: "karthik.reddy@example.com",
    phone: "9876543216",
    department: "Computer Science",
    year: "3rd Year",
    address: "34 Jubilee Hills, Hyderabad, Telangana",
    dob: new Date("2003-09-25"),
  },
  {
    name: "Divya Menon",
    rollNumber: "EE2023008",
    age: 20,
    gender: "Female",
    email: "divya.menon@example.com",
    phone: "9876543217",
    department: "Electrical",
    year: "2nd Year",
    address: "67 Panampilly Nagar, Kochi, Kerala",
    dob: new Date("2004-03-11"),
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // --- Seed Admin ---
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log(`ℹ️  Admin already exists: ${adminEmail}`);
    } else {
      await Admin.create({
        name: "System Admin",
        email: adminEmail,
        password: adminPassword, // hashed automatically via pre-save hook
      });
      console.log(`✅ Admin created -> email: ${adminEmail} | password: ${adminPassword}`);
    }

    // --- Seed Students ---
    const studentCount = await Student.countDocuments();

    if (studentCount > 0) {
      console.log(`ℹ️  Students already exist (${studentCount}). Skipping student seed.`);
    } else {
      await Student.insertMany(sampleStudents);
      console.log(`✅ Seeded ${sampleStudents.length} sample students`);
    }

    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
