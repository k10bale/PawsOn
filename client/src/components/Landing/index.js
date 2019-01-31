import React, { Component } from 'react';
import { Jumbotron, Button, Col, Row } from 'reactstrap';
import OwnerModal from "../OwnerModal";
import Owner from "../Owner";
import Login from "../../pages/Login";
import "./style.css";





function Landing () {
return (

    <div >
        <div>
      <Jumbotron>
        <Row>
        <Col>
        <h1 className="display-3">Welcome!</h1>
        <p className="lead">A simple way to set reminders for any of your pets needs.</p>
        <hr className="my-2" />
        {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
        <p className="lead">
          {/* <Button color="primary" href= "/signup/">Sign Up</Button> */}
          <OwnerModal> {Owner} </OwnerModal>
        </p>
        </Col>
        <Col>
        <Login></Login>
        </Col>
        </Row>
      </Jumbotron>
    </div>
    </div>
  );
};








export default Landing;