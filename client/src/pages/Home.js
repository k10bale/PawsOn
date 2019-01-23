import React, { Component } from "react";
import API from "../utils/API";
import Pet from "./Pet"
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

class Home extends Component {
    // constructor(props) {
    //     super(props)
    state = {
      owner:{},
      pets: false
    };

addPet = () => {
  this.setState({pets: true})
}

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
          <Col size="md-2">
            <h1>My Pets:
            </h1>
           
              <List>
              {this.state.owner.pets}
              </List>
           
            <button onClick = {this.addPet}>Add Pet</button>
          
          </Col>
        </Row>
        {this.state.pets && <Pet owner ={this.state.owner}/>} 
    </Container>
    );
}
}

export default Home;
