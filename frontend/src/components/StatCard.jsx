/**
 * Reusable statistic card for the dashboard (e.g. Total Students, Departments).
 */
const StatCard = ({ icon, label, value, colorClass = "primary" }) => {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={`card stat-card border-0 shadow-sm h-100 border-start border-${colorClass} border-4`}>
        <div className="card-body d-flex align-items-center gap-3">
          <div className={`stat-icon bg-${colorClass}-subtle text-${colorClass}`}>
            <i className={`bi ${icon}`}></i>
          </div>
          <div>
            <h3 className="mb-0 fw-bold">{value}</h3>
            <p className="text-muted mb-0 small">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
