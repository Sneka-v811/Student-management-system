const DEPARTMENTS = [
  "All",
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Electrical",
  "Mechanical",
  "Civil",
  "Business Administration",
  "Other",
];

const YEARS = ["All", "1st Year", "2nd Year", "3rd Year", "4th Year"];

/**
 * Search bar + department/year filter dropdowns used on the Student List page.
 */
const SearchFilterBar = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  year,
  onYearChange,
}) => {
  return (
    <div className="row g-2 mb-3">
      <div className="col-md-6">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, email, or roll number..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
        >
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "All" ? "All Departments" : dept}
            </option>
          ))}
        </select>
      </div>
      <div className="col-6 col-md-3">
        <select
          className="form-select"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y === "All" ? "All Years" : y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { DEPARTMENTS, YEARS };
export default SearchFilterBar;
