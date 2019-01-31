import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import Pet from '../Pet';

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
    console.log("toggle");
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
      <Button color="danger">
      <Link  to={{ pathname: '/addpet', param: this.props.owner._id  }} >Add Pet</Link> </Button>
      // <div>

      //     {' '}
      //   <Button color="danger" onClick={this.toggle}>Add Pet</Button>
      
      //   <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
      //     <ModalHeader toggle={this.toggle}title>Add Pet</ModalHeader>
      //     <ModalBody>
      //       <Pet owner={this.props.owner} toggle= {this.toggle} />
      //     </ModalBody>
   
      //   </Modal>
      // </div>
    );
  }
}

export default ModalExample;