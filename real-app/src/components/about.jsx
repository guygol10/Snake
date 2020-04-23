import React, { Component } from "react";
import PageHeader from "./common/pageHeader";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader titleText="About Real App" />
        <div className="row">
          <div className="col-12">
            <p>Content example text for about page here.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
