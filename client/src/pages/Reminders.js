import React, { Component } from 'react'
import {Form, Input, Button} from "reactstrap"
import API from "../utils/API";

class ReminderList extends Component {
  state = {
     reminderName: "",
     time: "",
     petName: ""
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


addReminder = event => {
    API.getReminder()
      .then(res =>
        this.setState({ reminder: res.data, reminderName: ""})
      )
      .catch(err => console.log(err));
  };

getReminder = id => {
  API.getReminder(id)
    .then(res => this.addReminder())
    .catch(err => console.log(err));
};

getPet = id => {
  API.getPet(id)
    .then(res => this.addReminder())
    .catch(err => console.log(err));
};

// handleInput = e => {
//   const itemText = e.target.value
//   // const currentItem = { text: itemText, key: Date.now() }
//   this.setState({
//     // currentItem,
//   })
// }

handleFormSubmit = event => {
  // return console.log(this.state);
  // Preventing the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();
const {
  reminderName, petName, time
} = this.state
  API.saveReminder({reminderName, petName, time})
      .then(res => console.log(res.data))
      // .then (()=> this.props.toggle())
      .catch(err => console.log(err));
  
};


  render() {
    return (
        <div className="reminderList">
        
          <Form onSubmit={this.props.addReminder}>
            {/* <Input placeholder="Reminder"
            ref={this.props.inputElement}
            value={this.props.reminderName.text}
            onChange={this.props.handleInput} /> */}
          
            <Input className="form-control"
            value={this.state.petName}
            name="petName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="pet name"
          />
          <Input className="form-control"
            value={this.state.remindertName}
            name="reminderName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="reminder"
          />
          <Input className="form-control"
            value={this.state.time}
            name="time"
            onChange={this.handleInputChange}
            type="text"
            placeholder="date: 'yyyy-mm-dd"
          />

      <Button color="primary" onClick={this.handleFormSubmit}>Add Reminder</Button>
          </Form>
        </div>
     
    )
  }
}

export default ReminderList