import React from "react";
import {
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

import { withRouter } from "react-router-dom";
import { getById, update, post, del } from "./server";
import "./CustomerForm.css";

// this component is for adding and updating a record
class CustomerForm extends React.Component {
  state = {
    firstName: "firstname",
    lastName: "lastname",
    email: "example@gmail.com",
    ipAddress: "189.82.42.133"
  };

  // show CustomerForm in update/add record mode
  componentDidMount() {
    if (this.props.id) {
      // if id===true then do ajax GET
      getById(this.props.id) // do ajax GET to update this record
        .then(response => {
          // store response data to state to populate form fields
          this.setState({
            id: response.data[0].id,
            firstName: response.data[0].firstName,
            lastName: response.data[0].lastName,
            email: response.data[0].email,
            ipAddress: response.data[0].ip,
            longitude: response.data[0].longitude,
            latitude: response.data[0].latitude
          });
        })
        .catch(error => console.log("Error in customer form"));
    } else {
      // do ajax POST to add new record
      // do post here to add new record
      // SHOULD I DELETE THIS PART
    }
  }

  handleChange = evt => {
    const name = evt.target.name;
    this.setState({ [name]: evt.target.value });
  };

  updateClicked = () => {
    console.log("updateClicked firing");

    const payload = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      ipAddress: this.state.ipAddress,
      longitude: this.state.longitude,
      latitude: this.state.latitude
    };
    // call update() to do ajax PUT to update record
    update(payload)
      .then(response => {
        console.log("RESPONSE", response);
        this.props.toggleFlag();
      })
      .catch(error => console.log("Error in customer form"));
  };

  // this function will add a new record
  addClicked = () => {
    console.log("addClicked firing");
    const payload = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      ipAddress: this.state.ipAddress,
      longitude: -118.243683, // hard code longitude for Los Angeles
      latitude: 34.052235 // hard code latitude for Los Angeles
    };

    post(payload)
      .then(response => {
        console.log("RESPONSE", response);
        this.props.toggleFlag();
      })
      .catch(error => console.log("ERROR IN CUSTOMERFORM"));
  };

  // this function will delete a record
  deleteClicked = () => {
    console.log("deleteClicked firing ID", this.state.id);
    del(this.state.id)
      .then(response => {
        console.log("RESPONSE", response);
        // this.props.history.push("./customerslist");
        this.props.toggleFlag(); // toggle flag to show CustomersList
      })
      .catch(error => console.log("ERROR IN DELETE"));
  };

  cancelClicked = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "@gmail.com",
      ipAddress: ""
    });
    this.props.toggleFlag(); // toggle flag to show CustomersList
  };

  render() {
    console.log("STATE", this.state);
    return (
      <Row className="CustomerForm">
        <Col className="marginZeroAuto" lg="6">
          <Card className="myCard">
            <h2 className="marginZeroAuto">Customer Form</h2>
            <hr />
            <Form>
              <FormGroup>
                <Label>First Name:</Label>
                <Input
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  type="text"
                  name="firstName"
                />
              </FormGroup>

              <FormGroup>
                <Label>Last Name:</Label>
                <Input
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  type="text"
                  name="lastName"
                />
              </FormGroup>

              <FormGroup>
                <Label>Email:</Label>
                <Input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                />
              </FormGroup>
              <FormGroup>
                <Label>IP Address:</Label>
                <Input
                  value={this.state.ipAddress}
                  onChange={this.handleChange}
                  type="text"
                  name="ipAddress"
                />
              </FormGroup>

              {this.props.id ? (
                <Row className="myRow">
                  <Col>
                    <Button
                      className="myBtn"
                      color="primary"
                      onClick={this.updateClicked}
                    >
                      Update
                    </Button>
                  </Col>
                  <Col lg="4">
                    <Button
                      className="myBtn"
                      color="primary"
                      onClick={this.deleteClicked}
                    >
                      Delete
                    </Button>
                  </Col>
                  <Col lg="4">
                    <Button
                      className="myBtn"
                      color="primary"
                      onClick={this.cancelClicked}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row className="myRow">
                  <Col lg="6">
                    <Button
                      className="myBtn"
                      color="primary"
                      onClick={this.addClicked}
                    >
                      Add New
                    </Button>
                  </Col>
                  <Col lg="6">
                    <Button
                      className="myBtn"
                      color="primary"
                      onClick={this.cancelClicked}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

// export default CustomerForm;
export default withRouter(CustomerForm);
