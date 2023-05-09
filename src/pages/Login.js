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

const Login = () => {
  let navigate = useNavigate();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setPayload({ ...payload, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${API.login}`;

    try {
      const response = await axios.post(
        `${API_HOST}/api/${API_VERSION}/${url}`,
        payload
      );

      const { data } = response;

      const { user, token } = data;

      localStorage.setItem("token", token);
      setPayload({
        email: "",
        password: "",
      });
      navigate("/form");
    } catch (error) {
      const { response } = error;

      setErrors({
        password: response.data.message,
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
                  <Card.Title className="card_title">Login</Card.Title>
                  <Form onSubmit={handleSubmit}>
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
                    <InputGroup className="mb-5">
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
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                    <Button type="submit" variant="primary">
                      Login
                    </Button>
                    <p className="register">
                      Don't have an account?
                      <Link to={`/register`} className="link_danger">
                        Register
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

export default Login;
