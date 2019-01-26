import React, { Component } from 'react'
import {Form, Input, Button} from "reactstrap"

class ReminderList extends Component {
  render() {
    return (
        <div className="reminderList">
        
          <Form onSubmit={this.props.addItem}>
            <Input placeholder="Reminder"
            ref={this.props.inputElement}
            value={this.props.currentItem.text}
            onChange={this.props.handleInput} />

            <Button type="submit"> Add Reminder </Button>
          </Form>
        </div>
     
    )
  }
}

export default ReminderList