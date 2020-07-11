import React, { Component, Fragment } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { runCode } from "../../actions/Execute";
import "./css/Execute.css";

const languages = ["javascript", "java", "python"];
const themes = ["dracula", "monokai"];
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

export default class Execute extends Component {
  state = {
    text: `print("This code is running remotely!")`,
    theme: "monokai",
    language: "python",
    results: null,
  };

  onChange = (values) => {
    this.setState({ text: values });
  };

  printSucResults = (res) => {
    this.setState({ results: res });
    if (document) {
      var el = document.getElementById("code-results");
      el.style.color = "azure";
    }
  };

  printErrResults = (res) => {
    this.setState({ results: res });
    if (document) {
      var el = document.getElementById("code-results");
      el.style.color = "red";
    }
  };

  handleSubmit = (e) => {
    var data = this.state.text;
    if (data) {
      const printSucResults = (res) => {
        this.setState({ results: res });
        if (document) {
          var el = document.getElementById("code-results");
          el.style.color = "azure";
        }
      };

      const printErrResults = (res) => {
        this.setState({ results: res });
        if (document) {
          var el = document.getElementById("code-results");
          el.style.color = "red";
        }
      };

      this.setState({ text: "" });
      var content = new FormData();
      content.append("text", data);
      content.append("language", this.state.language);
      e.preventDefault();
      runCode(content, function (res, failed) {
        if (failed) {
          if (res) {
            printErrResults(res);
          } else {
            printErrResults(
              "Something went wrong. Please check your code and try again later."
            );
          }
        } else {
          if (res) {
            if (res.ERROR) {
              printErrResults(res.ERROR);
            } else if (res.stdout) {
              printSucResults(res.stdout);
            } else {
              printSucResults("Code executed successfully with no outputs :)");
            }
          } else {
            printSucResults("Code executed successfully with no outputs :)");
          }
        }
      });
    } else {
      // printErrResults("Please write some code.");
    }
  };

  render() {
    return (
      <Fragment>
        <header>
          <p>Hello there</p>
          <button onClick={this.handleSubmit}>Submit</button>
        </header>
        <div className="code-layout">
          <AceEditor
            placeholder="Write Code"
            mode={this.state.language}
            theme={this.state.theme}
            name="text-edit"
            // onLoad={this.onLoad}
            onChange={this.onChange}
            fontSize={15}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={this.state.text}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            editorProps={{ $blockScrolling: true }}
          />
          <div className="code-results">
            <AceEditor
              placeholder="Code results will be shown here"
              mode="text"
              theme={this.state.theme}
              name="code-results"
              fontSize={14}
              showPrintMargin={false}
              showGutter={false}
              highlightActiveLine={false}
              value={this.state.results}
              readOnly={true}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
