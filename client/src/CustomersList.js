import React, { Component } from "react";
import { Button, Card, Row, Col, Input, Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./CustomerList.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { getAll, search } from "./server";
import CustomerForm from "./CustomerForm";

const btnStyle = {
  margin: ".5em .5em",
  width: "150px"
};
const colStyle = {
  textAlign: "center",
  padding: "0 .5em"
};

class CustomersList extends Component {
  state = {
    id: null,
    flag: false,
    customers: [],
    firstName: "",
    lastName: "",
    email: "",
    ipAddress: ""
  };

  requery = () => {
    getAll()
      .then(response => {
        console.log("RESPONSE", response);
        this.setState({ customers: response.data });
      })
      .catch(error => console.log("Error in getAll"));
  };

  componentDidMount() {
    this.requery();
  }

  handleChange = evt => {
    const name = evt.target.name;
    this.setState({ [name]: evt.target.value });
  };

  searchClicked = () => {
    const { firstName, lastName, email, ipAddress } = this.state;

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      ipAddress: ipAddress
    };

    search(payload)
      .then(response => {
        console.log("RESPONSE", response);
        this.setState({ customers: response.data || [] });
      })
      .catch(error => console.log("ERROR IN CUSTOMERLIST SEARCH", error));
  };

  addRecordClicked = () => {
    console.log("addClicked firing");
    // set state to toggle flag
    this.setState({
      flag: !this.state.flag
    });
  };

  // this function toggles the flag which causes the CustomerForm to show in update mode
  rowItemClicked = rowInfo => {
    console.log("Inside rowItemClicked", rowInfo);
    // pass data
    this.setState({
      id: rowInfo.id,
      flag: !this.state.flag
    });
  };

  toggleFlag = () => {
    this.requery();
    this.setState({
      id: null,
      flag: !this.state.flag
    });
  };

  requeryClicked = () => {
    this.requery();
    window.location.reload(); // reload the page at current URL
  };

  render() {
    // console.log("STATE", this.state);
    const columns = [
      {
        Header: "First Name",
        accessor: "firstName" // String-based value accessors!
      },
      {
        Header: "Last Name",
        accessor: "lastName"
        // Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: "Email",
        accessor: "email" // String-based value accessors!
      },
      {
        Header: "IP Address",
        accessor: "ip" // String-based value accessors!
      }
    ];

    return (
      <Container style={{ padding: "1em", margin: "0.5em auto", width: "80%" }}>
        {this.state.flag && (
          <CustomerForm
            key={this.state.id}
            requery={this.props.requery}
            toggleFlag={this.toggleFlag}
            id={this.state.id}
          />
        )}
        {!this.state.flag && (
          <div>
            <Card style={{ padding: ".5em" }}>
              <Row style={{ margin: "0 auto" }}>
                <h2>Enter search criteria below:</h2>
              </Row>
              <Row>
                <Col lg="3">
                  <Input
                    style={{ margin: ".25em" }}
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                  />
                </Col>
                <Col lg="3">
                  <Input
                    style={{ margin: ".25em" }}
                    placeholder="IP Address"
                    value={this.state.ipAddress}
                    onChange={this.handleChange}
                    type="text"
                    name="ipAddress"
                  />
                </Col>
                <Col style={colStyle} lg="2">
                  <Button
                    style={btnStyle}
                    color="primary"
                    size="sm"
                    onClick={this.searchClicked}
                  >
                    Search Database
                  </Button>
                </Col>
                <Col style={colStyle} lg="2">
                  <Button
                    style={btnStyle}
                    color="primary"
                    size="sm"
                    onClick={this.addRecordClicked}
                  >
                    Add New Record
                  </Button>
                </Col>
                <Col style={colStyle} lg="2">
                  <Button
                    style={btnStyle}
                    color="primary"
                    size="sm"
                    onClick={this.requeryClicked}
                  >
                    Refresh
                  </Button>
                </Col>
              </Row>
            </Card>
            <hr style={{ border: "1px solid #61dafb" }} />

            <Card>
              <ReactTable
                // function to add onclick event on any row
                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: (e, handleOriginal) => {
                      this.rowItemClicked(rowInfo.original); // pass row data for updating record
                    }
                  };
                }}
                // function to set pointer cursor on the row
                getTrProps={(state, rowInfo, column) => {
                  return {
                    style: {
                      // background: rowInfo.row.age > 20 ? "green" : "red"
                      cursor: "pointer"
                    }
                  };
                }}
                data={this.state.customers || []}
                className="-striped -highlight"
                columns={columns}
                defaultSorted={[{ id: "lastName", desc: false }]}
                defaultPageSize={10}
                minRows={0}
              />
            </Card>
          </div>
        )}
      </Container>
    );
  }
}

export default CustomersList;
