import React, { Component } from "react";
import API from "../utils/API";

import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";


class Home extends Component {
    constructor(props) {
        super(props)
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
              Welcome {this.props.firstName} 
              </h1>
            </Jumbotron>
            <Row>
          <Col size="md-2">
            <Link to="/addpet"> Add a Pet</Link>
          </Col>
        </Row>

        </Container>
    );
}
}

export default Home;
