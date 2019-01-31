import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import "./style.css"

const Example = ({children}) => {
  return (
    <div>
      <Jumbotron>
      {children}
      </Jumbotron>
    </div>
  );
};

export default Example;