import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import API from "../network/API";
import axios from "axios";
import { API_HOST, API_VERSION } from "../network/domain";
import "../App.css";

const DynamicForm = () => {
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [selectType, setSelectType] = useState("text");
  const [formFields, setFormFields] = useState([
    { type: selectType, title: "", required: false },
  ]);
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  let navigate = useNavigate();

  const token = localStorage.getItem("token");
  // const token = "49|olxMHvnYRy0htTrZHElIkiHaHr7Bh7ce9cOKX5FR";
  // console.log(token, "form token");
  if (!token) {
    console.log("token not found");
    navigate("/");
    return false;
  }

  const addRowHandler = () => {
    const row = {
      type: selectType,
      title: "",
      required: false,
    };

    setFormFields([...formFields, row]);
  };

  const deleteRowHandler = (index) => {
    const fields = formFields.filter((field, key) => key !== index);
    setFormFields(fields);
  };

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = `${API.createForm}`;
    console.log(formTitle, formFields);

    try {
      const response = await axios.post(
        `${API_HOST}/api/${API_VERSION}/${url}`,
        {
          title: formTitle,
          customer_email: email,
          fields: JSON.stringify(formFields),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "Application/json",
          },
        }
      );

      const { data } = response;

      setFormFields([]);
      setFormTitle("");
      setEmail("");
    } catch (error) {
      const { response } = error;

      setError(response.data.error);
    }
  };

  return (
    <Container>
      <div className="mt-10 col-sm-12 col-md-12">
        <Card>
          <Card.Header className="card_header">
            <Col md="3" lg="3">
              <InputGroup>
                <Form.Control
                  placeholder="Untitled form"
                  aria-describedby="basic-addon1"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Card.Header>
          <Card.Body>
            <div className="row mb-3 p-b-10 border-bottom border-color border-info bp-9">
              <Col md="3" lg="3">
                <Form.Select
                  aria-label="Default select box"
                  onChange={(e) => setSelectType(e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date Picker</option>
                </Form.Select>
              </Col>
              <Col md="2" lg="2">
                <Button variant="primary" onClick={addRowHandler}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <span className="ml-9">Add</span>
                </Button>
              </Col>
            </div>
            <form onSubmit={submitHandler}>
              {formFields.map((form, index) => (
                <div className="row" key={index}>
                  <Col md="1" lg="1">
                    <Button variant="secondary">
                      <span className="form_type">{form.type}</span>
                    </Button>
                  </Col>

                  <Col md="5" lg="5" className="mb-3">
                    <InputGroup>
                      <Form.Control
                        placeholder="Title"
                        aria-describedby="basic-addon1"
                        name="title"
                        value={form.title}
                        onChange={(e) => handleFormChange(e, index)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md="3" lg="3" className="mb-3">
                    <Form.Select
                      aria-label="Default select box"
                      name="required"
                      value={form.required}
                      onChange={(e) => handleFormChange(e, index)}
                    >
                      <option value={false}>Optional</option>
                      <option value={true}>Required</option>
                    </Form.Select>
                  </Col>

                  <Col md="2" lg="2">
                    <Button
                      variant="danger"
                      onClick={() => deleteRowHandler(index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Col>
                </div>
              ))}
              <div className="row border-top border-color border-info bt-9">
                <Col md="4" lg="4">
                  <InputGroup>
                    <Form.Control
                      placeholder="jackdoe@laravel.com"
                      aria-describedby="basic-addon1"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md="2" lg="2">
                  <Button variant="primary" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span className="ml-10">Submit</span>
                  </Button>
                </Col>
              </div>
            </form>
          </Card.Body>
          <Card.Footer className="text-muted text-center">
            Developed by HOZ
          </Card.Footer>
        </Card>
      </div>
    </Container>
  );
};

export default DynamicForm;
