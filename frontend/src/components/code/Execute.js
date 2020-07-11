import React, { Component } from "react";
import "./Execute.css";
import { runCode } from "../../actions/Execute";

export default class Execute extends Component {
  handleSubmit(event) {
    var data = new FormData(document.getElementById("code-form"));
    var content = new FormData();
    content.append("text", data.get("text"));
    content.append("language", "python");
    event.preventDefault();
    runCode(content);
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
