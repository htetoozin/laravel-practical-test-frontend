import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import API from "../network/API";
import axios from "axios";
import { API_HOST, API_VERSION } from "../network/domain";

const Register = () => {
  let navigate = useNavigate();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setPayload({ ...payload, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payload.password !== payload.confirm_password) {
      setErrors({
        confirm_password: "Your confirmation password doesn't match",
      });
      return;
    }

    e.preventDefault();

    const url = `${API.register}`;

    try {
      const response = await axios.post(
        `${API_HOST}/api/${API_VERSION}/${url}`,
        payload
      );

      const { data } = response;

      const { user, token } = data;

      localStorage.setItem("token", token);
      setPayload({
        name: "",
        email: "",
        password: "",
      });
      navigate("/form");
    } catch (error) {
      const { response } = error;

      setErrors({
        email: response.data.message,
      });
    }
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
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
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
                        minLength="8"
                        required
                      />
                      {errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
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
                        minLength="8"
                        required
                      />
                      {errors.confirm_password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.confirm_password}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                    <Button type="submit" variant="primary">
                      Register
                    </Button>
                    <p className="register">
                      Already have an account?
                      <Link to="/" className="link_danger">
                        Login
                      </Link>
                    </p>
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
