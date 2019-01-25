import React, { Component } from "react";
import API from "../utils/API";
import Pet from "./Pet"
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import PetCard from "../components/Card";

class Home extends Component {
    constructor(props) {
        super(props);

    this.state = {
      owner:{
        pets: []
      }
     
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleAddFeature = this.handleAddFeature.bind(this)
  }

  

addPet = (res) => {
  this.setState({pets: res.data.owner.pets})
 
}

getPets = id => {
  API.getPets(id)
    .then(res => this.addPet(res))
    .catch(err => console.log(err));
};

// getPets = petName => {
//   API.getPets(petName)
//     .then(res => this.addPet())
//     .catch(err => console.log(err));
// };

 componentDidMount() {
    API.getOwnerId(this.props.match.params.id)
          .then(res => this.setState({ owner: res.data }))
         
          .catch(err => console.log(err));
      }
      

render() {


    return (
      <Container fluid>
        
            <Jumbotron>
              <h1>
              Welcome {this.state.owner.firstName} 
              </h1>
            </Jumbotron>
            <Row>
          <Col size="md-8">
            <h1>My Pets:
            </h1>
           
              {/* <List> */}
              {/* /* {Object.keys(this.state.owner.pets).map(pet => {
                 */}
                 {this.state.owner.pets.map(pet => (
                  <PetCard petName= {pet.petName }/>
                 )
                 )}
              
              {/* {this.state.owner.map((item, index) => item.pets.map((petName, index) => (<li key={index}> {pets}</li>)))}  */}
              {/* </List> */}
           
            <button onClick = {this.addPet}>Add Pet</button>
          
          </Col>
        </Row>
        {this.state.pets && <Pet owner ={this.state.owner}/>} 
    </Container>
    );
}
}

export default Home;
