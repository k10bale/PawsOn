import React, { Component } from 'react';
import { Jumbotron, Button, Col, Row } from 'reactstrap';
import OwnerModal from "../components/OwnerModal";
import Owner from "../components/Owner";
import Login from "../components/Login";
// import "./style.css";

class Landing extends Component {
  constructor(props) {
    super(props);
  

};


render () {
return (
  
    
      <div className="landingWrapper">
      <Jumbotron>
        <Row>
        <Col>
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">A simple way to set reminders for any of your pets needs.</p>
        <hr className="my-2" />
        {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
        <p className="lead">
          {/* <Button color="primary" href= "/signup/">Sign Up</Button> */}
          <OwnerModal/>  
        </p>
        </Col>
        <Col>
        <Login history={this.props.history}/>
        </Col>
        </Row>
      </Jumbotron>
    </div>
  
  );
};
}







export default Landing;