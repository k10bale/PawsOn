import React, { Component } from "react";
import "./style.css";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// import { Link } from "react-router-dom";
// import { Col, Container } from "../components/Grid";
import sampleImage from "../../images/Lucy.jpg"
import API from "../../utils/API";
import axios from "axios";
// import ImageUpload from "../ImageUpload/image_uplaod";
// import DeleteBtn from "../components/DeleteBtn";
// import { List, ListItem } from "../components/List";

class Pet extends Component {
  state = {
    petName: "",
    image: sampleImage,
    imageUrl: '',
    species: "",
    birthday: "",
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

imageUplaod = (image) => {
  let formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'y5ewfnvb');
   axios({
    method: 'POST',
    url: 'https://api.cloudinary.com/v1_1/oti4me/image/upload',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  })
  .then((image) => {
    this.setState({
      imageUrl: image.data.url
    })
  }).catch((err)=> {
    console.log(err)
  })
}
handleImageChange = (event) =>{
  event.preventDefault();
  // return console.log(event.target.files, 'files')
  if (event.target.files && event.target.files[0]) {
    this.setState({
      image: event.target.files[0]
    });

  } else {
    this.setState({ image: sampleImage });
  }
}

handleFormSubmit = event => {
  // Preventing the default behavior of the form submit (which is to refresh the page)
  event.preventDefault();
  this.imageUplaod(this.state.image)

    // return console.log(this.state.imageUrl)
  if (this.state.petName && this.state.image) {
    API.savePet({
      petName: this.state.petName,
      image: this.state.imageUrl,
      species: this.state.species,
      birthday: this.state.birthday

    }, this.props.location.param)
    .then(() => {
      console.log(this.props.location.param, 'there')
      const { param } = this.props.location
       this.props.history.push(`/owner/${param}`)
    })
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
        {/* <ImageUpload/> */}
        <FormGroup>
         <Input className="form-control"
           name="image"
           onChange={this.handleImageChange}
           type="file"
            multiple
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
