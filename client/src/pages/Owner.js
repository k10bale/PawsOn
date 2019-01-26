import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";
import { Redirect } from 'react-router-dom'

class Owner extends Component {
  state = {
        owners: [],
        firstName: "",
        lastName: "",
        email: "",
        password:"",
        confirmPassword: "",
        pets: [ ]
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

  componentDidMount() {
    // this.addUser();
  }

  addUser = event => {
    API.getOwner()
      .then(res => {
        this.setState({ owners: res.data, firstName: "", lastName: "", email: "", password:"", confirmPassword: ""});
        this.redirectHome(res.data._id)
      })
      .catch(err => console.log(err));
  }; 

getOwner = id => {
  API.getOwner(id)
    .then(res => this.addUser())
    .catch(err => console.log(err));
};

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (this.state.firstName && this.state.lastName) {
      API.saveOwner({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
        .then(res => this.redirectHome(res.data._id))
        .catch(err => console.log(err));
    }
  };

  redirectHome = (id) => {
    
      const path = '/login/';
      // return <Redirect to = {`/user/${id}`}/>
      this.props.history.push(`/login`);
    }



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
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
      </Col>
      <Col size="md-6 sm-12">
            {/* <Jumbotron>
              <h1>Owner Profile</h1>
            </Jumbotron> */}
            {this.state.owners.length ? (
              <List>
                {this.state.owners.map(owner => (
                  <ListItem key={owner._id}>
                    <Link to={"/" + owner._id}>
                      <strong>
                        {owner.firstName} {owner.lastName} 
                           
                        
                      </strong>
                    </Link>
                  
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        
      </Container>
    );
  }
}
export default Owner;
