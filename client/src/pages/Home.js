import React, { Component } from "react";
import API from "../utils/API";
import Pet from "../components/Pet"
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import PetCard from "../components/Card";
import PetModal from "../components/PetModal";
// import Pet from "./Owner";

// import ImageUpload from "../components/ImageUpload/image_uplaod";

class Home extends Component {
    constructor(props) {
        super(props);
    
    this.state = {
      owner:{
        pets: []
      }
    }
    }
  //   // componentDidMount() ;{
  //   //   let readToken = window.localStorage.getItem("SMC_authkey");
  //   //   let query = {
  //   //     token: readToken
  //   //   };
  //     API.checkAuth(query)
  //       .then(res => {
  //         if (res.data.success) {
  //           this.setState({ isLoggedIn: true, });
  //         } else {
  //           this.setState({ isLoggedIn: false });
  //           window.location.assign('/login');
  //         };
  //       })
  //       .catch(err => console.log(err));
  //     }
  //   // this.handleChange = this.handleChange.bind(this)
  //   // this.handleAddFeature = this.handleAddFeature.bind(this)
  // }

  

addPet = () => {
  this.setState({pets: true})
 
};

getPets = id => {
  API.getPets(id)
    .then(res => this.addPet(res))
    .catch(err => console.log(err));
};

getPets = petName => {
  API.getPets(petName)
    .then(res => this.addPet())
    .catch(err => console.log(err));
};

 componentDidMount() {
    API.getOwnerId(this.props.match.params.id)
          .then(res => this.setState({ owner: res.data }))
          .catch(err => console.log(err));
      };
      

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
            </Col>
            </Row>
            <Row>
            <Col size="md-8">
              
                 {this.state.owner.pets.map(pet => (
                  <PetCard petName= {pet.petName }/>
                 )
                 )}
              

           
            {/* <button onClick = {this.addPet}>Add Pet</button> */}
            <PetModal owner={this.state.owner} />
          
          </Col>
        </Row>
        {/* {this.state.pets && <Pet owner ={this.state.owner}/>}  */}
        <div>
          {/* <ImageUpload/> */}
          </div>
    </Container>
    
    );
}
}

export default Home;
