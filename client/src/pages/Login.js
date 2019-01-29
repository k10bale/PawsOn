
import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, FormText, FormFeedback,
} from 'reactstrap';
import OwnerModal from "../components/OwnerModal";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Owner from "../components/Owner";
// import ReminderList from '../components/Reminders';
import {
  Link
} from "react-router-dom";
// import "./style.css";
import axios from 'axios';
import API from "../utils/API";
import {ReminderList, Reminder} from "./Reminders"
// import Modal from "../components/Modal";
// import Link from "../components/Link";

library.add(faEnvelope, faKey);



class Login extends Component {
  constructor(props) {
    super(props);
  // Setting the component's initial state
  this.state = { 
    email: "",
    password: "",
    validate: {
      emailState: '',
    },
  }
  this.handleChange = this.handleChange.bind(this);
    };
  // state = {
  //   username: "",
  //   password: ""
  // }
  // };

  validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
        if (emailRex.test(e.target.value)) {
          validate.emailState = 'has-success'
        } else {
          validate.emailState = 'has-danger'
        }
        this.setState({ validate })
      }

  // handleInputChange = event => {
  //   // Getting the value and name of the input which triggered the chang

  //   let value = event.target.value;
    
  //   const name = event.target.name;

  //   if (name === "password") {
  //     value = value.substring(0, 15);
  //   }
  //   // Updating the input's state
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

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


 
  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${ this.state.email }`)
  }

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    const { email, password } = this.state;
    return (
      <Container>
      
        {/* <p>
          Hello {this.state.email} 
        </p> */}
              <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
            <FormGroup>
              <Label>Username
              <FontAwesomeIcon
                icon="envelope"
                color="#6DB65B"
                size="sm"
                  />
              </Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
          <FormFeedback valid>
                That's a tasty looking email you've got there.
              </FormFeedback>
              <FormFeedback>
                Uh oh! Looks like there is an issue with your email. Please input a correct email.
              </FormFeedback>
              <FormText>Your username is most likely your email.</FormText>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password
              <FontAwesomeIcon
                icon="key"
                color="#6DB65B"
                size="sm"
                  /></Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
                value={ password }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
          {/* <Link to="/signup/"> */}
          <Button href= "/signup/">Sign Up</Button> 
          {/* </Link> */}
          <OwnerModal> {Owner} </OwnerModal>
      </Form>
  
      </Container>
    
    );
  }
};

export default Login;