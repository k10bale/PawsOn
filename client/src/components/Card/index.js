import React from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import "./style.css";

function PetCard(props) {
  return (
    <div>
    <Card>
      <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> 
      <CardBody>
        <CardTitle>{props.petName}</CardTitle>
        {/* <CardSubtitle>{company}</CardSubtitle>
        <CardText>{description}</CardText> */}
        <Button color="danger"href= "/addreminders/">Reminders</Button>
        {/* <Button color="danger">Delete</Button> */}
      </CardBody>
    </Card>
  </div>
)
}


export default PetCard;

// onClick={() => this.props.removePets(id)}