import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import { Link } from "react-router-dom";
// import { Col, Container } from "../components/Grid";

import API from "../../utils/API";
import ImageUpload from "../ImageUpload/image_uplaod";
// import DeleteBtn from "../components/DeleteBtn";
// import { List, ListItem } from "../components/List";

class Pet extends Component {
  state = {
        pets: [],
        petName: "",
        image: "",
        species: "",
        birthday:"",
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

  addPet = event => {
    API.getPets()
      .then(res =>
        this.setState({ pets: res.data, petName: "", image: "", species: "", birthday:""})
      )
      .catch(err => console.log(err));
  };

getPets = id => {
  API.getPets(id)
    .then(res => this.addPet())
    .catch(err => console.log(err));
};



  handleFormSubmit = event => {
    console.log(this.props.owner._id);
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (this.state.petName && this.state.image) {
      API.savePet({
        petName: this.state.petName,
        image: this.state.image,
        species: this.state.species,
        birthday: this.state.birthday
        
      },this.props.owner._id )
        .then(res => this.addPet())
        .then (()=> this.props.toggle() )
        .catch(err => console.log(err));
    }
  };



  render() {
    return (
     
     
     
  // <Form>
  <div>
    <FormGroup>
        
          <Input className="form-control"
            value={this.state.petName}
            name="petName"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Pet Name"
          />
        </FormGroup>
        <ImageUpload/>
        <FormGroup>
          <Input className="form-control"
            value={this.state.image}
            name="image"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Upload Image"
          />
          </FormGroup>
          <FormGroup>
          <Input className="form-control"
            value={this.state.species}
            name="species"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Species"
          />
         {/* <FormGroup>
          <Label for="exampleSelect">Select Species</Label>
          <Input type="select" name="select" id="exampleSelect">
            <option>Dog</option>
            <option>Cat</option>
            <option>Bird</option>
            <option>Reptile</option>
            <option>Rodent</option>
          </Input>
        </FormGroup> */}
          </FormGroup>
          <FormGroup>
          <Input className="form-control"
            value={this.state.birthday}
            name="birthday"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Birthday"
          />
          </FormGroup>
          <Button color="primary" onClick={this.handleFormSubmit}>Submit</Button>
      {/* </Form> */}
      </div>
    
  
    

          
           
          //     <List>
          //       {this.state.pets.map(pet => (
          //         <ListItem key={pet._id}>
          //           <Link to={"/owners/" + pet._id}>
          //             <strong>
          //               {pet.petName} {pet.image} 
                           
                      
          //             </strong>
          //           </Link>
                  
          //         </ListItem>
          //       ))}
          //     </List>
          //   ) : (
          //     <h3>No Results to Display</h3>
          //   )}
          // </Col>
        
    )
  }
}
export default Pet;
