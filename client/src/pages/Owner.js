import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Owner extends Component {
  state = {
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  addUser = event => {

    API.saveOwner({
      firstName:this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
 
 }) 
};

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    alert(`Hello ${this.state.username}`);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };



  render() {
    return (
      <Container fluid>
      <Col size="md-4">
      <div>
        <p>
          Create an Account 
        </p>
        <form className="form-group">
          <input className="form-control"
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="First Name"
          />
          <input className="form-control"
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Last Name"
          />
          <input className="form-control"
            value={this.state.email}
            name="email"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Email"
          />
          <input className="form-control"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Password"
          />
          <input className="form-control"
            value={this.state.confirmPassword}
            name="confirmPassword"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Confirm Password"
          />
          <button onClick={this.addUser}>Submit</button>
        </form>
      </div>
      </Col>
      </Container>
    );
  }
}

export default Owner;
