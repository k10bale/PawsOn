import React, {
  Component
} from "react";
import {
  Link
} from "react-router-dom";
// import "./style.css";
import axios from 'axios';
import API from "../utils/API";

class Login extends Component {
  // Setting the component's initial state
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the chang

    let value = event.target.value;
    const name = event.target.name;

    if (name === "password") {
      value = value.substring(0, 15);
    }
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  getOwner = id => {
    API.getOwner(id)
      .then(res => this.addUser())
      .catch(err => console.log(err));
  };


  redirectHome = (id) => {

    const path = '/user/' + id;
    // return <Redirect to = {`/user/${id}`}/>
    this.props.history.push(`/user/${id}`);
  }

  

  validateOwner = query => {
    API.getOwnerAuth(query)
      .then(res => {
        console.log("LOGIN: res = " + JSON.stringify(res));
        if (res.data.success) {
          console.log("in success handle");
          this.setState({
            isLoggedIn: false,
          });
          this.setState({
            loginMsg: res.data.message
          });
          window.localStorage.setItem("SMC_authkey", res.data.token);
          // window.location.assign('/authenticated/main');
        } else {
          console.log("in failure handle");
          this.setState({
            isLoggedIn: true
          });
          this.setState({
            loginMsg: res.data.message
          });
          window.localStorage.setItem("SMC_authkey", "");
          // window.location.assign('/login');
        }
        console.log("LOGIN: state = " + JSON.stringify(this.state));
      })
      .catch(err => console.log(err));

  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("state: " + this.state);
    console.log("validateOwner: " + this.validateOwner);
    // this.validateOwner({
    //     email: this.state.username,
    //     password: this.state.password
    //   })
    const query = {
          email: this.state.username,
          password: this.state.password
        }
    API.getOwnerAuth(query)
      // console.log("state = " + JSON.stringify(this.state));
      .then(res => this.redirectHome(res.data._id))
      .catch(err => console.log(err));
  };


  // handleFormSubmit = event => {
  //   // Preventing the default behavior of the form submit (which is to refresh the page)
  //   event.preventDefault();

  //   if (!this.state.username || !this.state.password) {
  //     alert("Fill out your first and last name please!");
  //   } else if (this.state.password.length < 6) {
  //     alert(
  //       `Choose a more secure password ${this.state.firstName} ${this.state
  //         .lastName}`
  //     );
  //   } else {
  //     alert(`Hello ${this.state.username}`);
  //   }

  //   this.setState({
  //     username: "",
  //     password: ""
  //   });
  // };



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
            type="password"
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
};

export default Login;