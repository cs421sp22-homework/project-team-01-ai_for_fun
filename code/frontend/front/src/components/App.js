import React, { Component } from "react";
import '../style/App.css';

import Introduction from "./introduction";
import Header1 from "./Navbar/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <div className="pages">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/blog" component={Blog} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </div>
        </Router>
      </>
    )
  }
}
export default App;