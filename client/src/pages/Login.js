
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
import ReminderList from '../components/Reminders';


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



  // handleFormSubmit = event => {
  //   // Preventing the default behavior of the form submit (which is to refresh the page)
  //   event.preventDefault();

  //   if (!this.state.email || !this.state.password) {
  //     alert("Fill out your first and last name please!");
  //   } else if (this.state.password.length < 6) {
  //     alert(
  //       `Choose a more secure password ${this.state.firstName} ${this.state
  //         .lastName}`
  //     );
  //   } else {
  //     alert(`Hello ${this.state.email}`);
  //   }

  //   this.setState({
  //     email: "",
  //     password: ""
  //   });
  // };

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
}
          
				//   <button
				//       type="button"
				//       className="btn btn-outline-success btn-sm">
				//       Register
		    // </button>
		   
     
        // <div>
        // <Modal>
        
        // </Modal>
        // </div>
      
     

 
    
  


export default Login;
