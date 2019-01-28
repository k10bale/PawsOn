import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import NoMatch from "./pages/NoMatch";
// import Wrapper from "./components/Wrapper"
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Pet from "./pages/Pet";
import "./App.css";

function App() {
  return (
   
    <Router>
      
      <div>
        <Nav />
        <Switch>
          <Route exact path="/user/:id" component={Home} />
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/owner/:id" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Owner} />
          <Route exact path="/addpet" component={Pet} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      
    </Router>
    
  );
}

export default App;
