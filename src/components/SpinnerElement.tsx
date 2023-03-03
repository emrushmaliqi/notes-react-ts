import Spinner from "react-bootstrap/Spinner";

export default function SpinnerElement() {
  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
      <Spinner
        style={{
          width: "80px",
          height: "80px",
          fontSize: 40,
        }}
      />
    </div>
  );
}
