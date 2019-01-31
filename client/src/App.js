import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import NoMatch from "./pages/NoMatch";
import Reminders from "./pages/Reminders"
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Pet from "./pages/Pet";
import Landing from "./pages/Landing";
import "./App.css";

function App() {
  return (
   
    <Router>
      
      <div>
        <Nav />
        <Switch>
        <Route exact path="/" component={Landing} />
         <Route exact path="/login" component={Login} />
          <Route exact path="/owner/:id" component={Home} /> 
          <Route exact path="/signup" component={Owner} />
          <Route exact path="/addpet" component={Pet} />
          <Route exact path="/addreminders" component={Reminders} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      
    </Router>
    
  );
}

export default App;
