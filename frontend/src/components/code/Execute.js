import React, { Component, Fragment } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
// import { runCode } from "../../actions/Execute";

import "./css/Execute.css";
const languages = ["javascript", "java", "python"];
const themes = ["dracula", "monokai"];
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

export default class Execute extends Component {
  // handleSubmit(event) {
  //   var data = new FormData(document.getElementById("code-form"));
  //   var content = new FormData();
  //   content.append("text", data.get("text"));
  //   content.append("language", "python");
  //   event.preventDefault();
  //   runCode(content);
  // }

  state = {
    placeHolder: `function helloWorld() {
    console.log("Hello World!");
  }`,
    theme: "monokai",
    language: "javascript",
  };

  onChange = (values) => {
    console.log(values);
  };

  render() {
    return (
      <Fragment>
        <header>
          <p>Hello there</p>
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
            value={this.state.placeHolder}
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
              fontSize={17}
              showPrintMargin={false}
              showGutter={false}
              highlightActiveLine={false}
              readOnly={true}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
