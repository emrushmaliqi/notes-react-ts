import { Link } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>ERROR 404 - Page Not Found</span>
      <Link to="/" style={{ color: "blue" }}>
        Go to Homepage
      </Link>
    </div>
  );
}
