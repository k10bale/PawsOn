import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
// import Login from "./pages/Login";
import Login from "./containers/Login";
import Pet from "./pages/Pet";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/user/:id" component={Home} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/signup" component={Owner} />
          <Route exact path="/addpet" component={Pet} />
          <Route path="/login" exact component={Login} />
          <Route component={NoMatch} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
