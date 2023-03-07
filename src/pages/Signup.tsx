import { SyntheticEvent, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useAuthContext, useSignup } from "../hooks/authHooks";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { error, isLoading, signup } = useSignup();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    signup({
      email: emailRef.current?.value ? emailRef.current.value : "",
      password: passwordRef.current?.value ? passwordRef.current.value : "",
    });
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [isLoading]);

  return (
    <div
      className="container d-flex flex-column align-items-center"
      style={{ gap: "150px" }}
    >
      <h1 className="text-center mt-5">Signup</h1>
      <Form className="justify-self-center" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
          />
          <Form.Text className="text-muted">{error}</Form.Text>
        </Form.Group>
        <Button disabled={isLoading} variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
  );
}
