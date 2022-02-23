import React, { Component } from "react";
import '../style/App.css';

import Introduction from "./introduction";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./Navbar/navbar";
import Home from "./pages/Home";
import { Account } from "./pages/account";
import { Community } from "./pages/community";
import { Contact } from "./pages/Contact";
import { AI_face } from "./pages/AI_face";
import { AI_vedio } from "./pages/AI_vedio";
import { AI_text } from "./pages/AI_text";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <NavBar />
          <div className="pages">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/account" component={Account} />
              <Route path="/community" component={Community} />
              <Route path="/contact" component={Contact} />
              <Route path="/AI_face" component={AI_face} />
              <Route path="/AI_vedio" component={AI_vedio} />
              <Route path="/AI_text" component={AI_text} />
            </Switch>
          </div>
        </Router>
      </>
    )
  }
}
export default App;