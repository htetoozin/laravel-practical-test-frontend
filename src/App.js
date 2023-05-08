import { useState } from "react";
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
import "./App.css";

function App() {
  const [selectType, setSelectType] = useState("text");
  const [formFields, setFormFields] = useState([
    { type: selectType, title: "", required: false },
  ]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  return (
    <Container>
      <div className="mt-10 col-sm-12 col-md-12">
        <Card>
          <Card.Header className="card_header">
            <h4>React Dynamic Form</h4>
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
              <Button variant="primary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
                <span className="ml-10">Submit</span>
              </Button>
            </form>
          </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      </div>
    </Container>
  );
}

export default App;
