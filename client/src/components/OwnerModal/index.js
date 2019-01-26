import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import Owner from '../Owner';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
    // this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // changeBackdrop(e) {
  //   let value = e.target.value;
  //   if (value !== 'static') {
  //     value = JSON.parse(value);
  //   }
  //   this.setState({ backdrop: value });
  // }

  render() {
    return (
      <div>

          {' '}
        <Button color="danger" onClick={this.toggle}>Sign Up</Button>
      
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}title>Sign Up </ModalHeader>
          <ModalBody>
            <Owner path={this.props.history} toggle= {this.toggle}/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;