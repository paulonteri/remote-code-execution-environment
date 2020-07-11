import React, { Component } from "react";
import "./Execute.css";

export default class Execute extends Component {
  handleSubmit(event) {
    var fm = document.getElementById("code-form");
    var data = new FormData(fm);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>Textareas</h2>
        <form onSubmit={this.handleSubmit} id="code-form">
          <textarea
            name="text"
            className="textarea"
            // rows="20"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
