/**
 * Reusable loading spinner.
 * Pass `fullscreen` to center it in the entire viewport (e.g. during auth checks).
 * Otherwise it centers within its parent container (e.g. inside a card or table).
 */
const Spinner = ({ fullscreen = false, label = "Loading..." }) => {
  const wrapperClass = fullscreen
    ? "d-flex flex-column justify-content-center align-items-center vh-100"
    : "d-flex flex-column justify-content-center align-items-center py-5";

  return (
    <div className={wrapperClass}>
      <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">{label}</span>
      </div>
      <p className="mt-3 text-muted">{label}</p>
    </div>
  );
};

export default Spinner;
