import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";

class Pet extends Component {
  state = {
        name: "",
        image: "",
        type: "",
        birthday:""
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

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    alert(`${this.state.name} added as your pet!`);
    this.setState({
      name: "",
      image: "",
      type: "",
      birthday: ""
    });
  };

  render() {
    return (
      <Container fluid>
      <Col size="md-4">
      <div>
        <p>
          Create Pet Profile 
        </p>
        <form className="form-group">
          <input className="form-control"
            value={this.state.name}
            name="name"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Pet Name"
          />
          <input className="form-control"
            value={this.state.image}
            name="image"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Upload Image"
          />
          <input className="form-control"
            value={this.state.type}
            name="type"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Type"
          />
          <input className="form-control"
            value={this.state.birthday}
            name="password"
            onChange={this.handleInputChange}
            type="birthday"
            placeholder="Birthday"
          />
          <button onClick={this.handleFormSubmit}>Add Pet</button>
        </form>
      </div>
      </Col>
      </Container>
    );
  }
}

export default Pet;
