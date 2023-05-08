import { useState } from "react";

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";

const Register = () => {
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setPayload({ ...payload, [event.target.id]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payload.password !== payload.confirm_password) {
      alert("Your confirmation password doesn't match");
      return;
    }
    console.log("payload ", payload);
  };
  return (
    <div className="container">
      <div className="row align-items-center vh-100">
        <div className="col-6 mx-auto">
          <div className="card shadow border">
            <div className="card-body d-flex flex-column align-items-center">
              <Card className="col-md-12 row justify-content-center">
                <Card.Body>
                  <Card.Title className="card_title">Register</Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-4 mt-4">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Name
                      </InputGroup.Text>
                      <Form.Control
                        type="name"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        id="name"
                        onChange={handleChange}
                        required
                      />
                      {errors.name && (
                        <span id="name" className="text-danger">
                          {errors.name}
                        </span>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4 mt-4">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Email
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        id="email"
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <span id="email" className="text-danger">
                          {errors.email}
                        </span>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Password
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        id="password"
                        onChange={handleChange}
                        required
                      />
                      {errors.password && (
                        <span id="password" className="text-danger">
                          {errors.password}
                        </span>
                      )}
                    </InputGroup>
                    <InputGroup className="mb-5">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Confirm Password
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        id="confirm_password"
                        onChange={handleChange}
                        required
                      />
                      {errors.confirm_password && (
                        <span id="confirm_password" className="text-danger">
                          {errors.confirm_password}
                        </span>
                      )}
                    </InputGroup>
                    <Button type="submit" variant="primary">
                      Register
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
