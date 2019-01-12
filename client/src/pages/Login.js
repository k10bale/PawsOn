import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./style.css";

class Login extends Component {
  // Setting the component's initial state
  state = {
    username: "",
    password: ""
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

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Hello ${this.state.username}`);
    this.setState({
      username: "",
      password: ""
    });
  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <p>
          Hello {this.state.username} 
        </p>
        <form className="form">
          <input
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Username"
          />
          <input
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}
            type="text"
            placeholder="password"
          />
          <button onClick={this.handleFormSubmit}>Submit</button>
          <Link to="/signup/">
				  <button
				      type="button"
				      className="btn btn-outline-success btn-sm">
				      Register
		    </button>
		    </Link>
        </form>
      </div>
    );
  }
}

export default Login;
