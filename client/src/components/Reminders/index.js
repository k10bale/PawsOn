import React, { Component } from 'react'
import {Form, Input, Button} from "reactstrap"

handleFormSubmit = event => {
  console.log(this.props.pet._id);
  // Preventing the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();
  // if (this.state.petName && this.state.image) {
    API.saveReminder({
      reminderName: this.state.reminderName,
      // image: this.state.image,
      // species: this.state.species,
      // birthday: this.state.birthday
      
    },this.props.pet._id )
      .then(res => this.addPet())
      .then (()=> this.props.toggle() )
      .catch(err => console.log(err));
  
};

class ReminderList extends Component {
  render() {
    return (
        <div className="reminderList">
        
          <Form onSubmit={this.props.addItem}>
            <Input placeholder="Reminder"
            ref={this.props.inputElement}
            value={this.props.currentItem.text}
            onChange={this.props.handleInput} />

<Button color="primary" onClick={this.handleFormSubmit}>Add Reminder</Button>
          </Form>
        </div>
     
    )
  }
}

export default ReminderList