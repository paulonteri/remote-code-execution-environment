import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { runCode } from "../../actions/Execute";
import "./css/Execute.css";
import "../header/css/Header.css";

const languages = ["javascript", "java", "python"];
const themes = ["dracula", "monokai"];
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

function Execute(props) {
  const [codeText, setCodeText] = useState(
    `print("This code is running remotely!")`
  );
  // eslint-disable-next-line
  const [theme, setTheme] = useState("dracula");
  // eslint-disable-next-line
  const [language, setLangauge] = useState("python");
  // eslint-disable-next-line
  const [tabs, setTabs] = useState(null);
  const [results, setResults] = useState(null);
  const [handledSucOutput, setHandledSucOutput] = useState(false);
  const [handledFailOutput, setHandledFailOutput] = useState(false);

  const onChange = (values) => {
    setCodeText(values);
  };

  const printSucResults = (res) => {
    setResults(res);
    if (document) {
      var el = document.getElementById("code-results");
      el.style.color = "var(--editer-white)";
    }
  };

  const printErrResults = (res) => {
    setResults(res);
    if (document) {
      var el = document.getElementById("code-results");
      el.style.color = "red";
    }
  };

  const handleSubmit = (e) => {
    var data = codeText;
    setResults("");
    setHandledSucOutput(false);
    setHandledFailOutput(false);
    e.preventDefault();
    if (data) {
      var content = new FormData();
      content.append("text", data);
      content.append("language", language);
      props.runCode(content);
    } else {
      printSucResults("Please write some code first :)");
    }
  };

  const handleSuc = (res) => {
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
  };

  const handleFail = (res) => {
    if (res) {
      printErrResults(res);
    } else {
      printErrResults(
        "Something went wrong. Please check your code and try again later."
      );
    }
  };

  useEffect(() => {
    if (props.runCodeOk && !handledSucOutput) {
      handleSuc(props.output);
      setHandledSucOutput(true);
    } else if (props.runCodeFail && !handledFailOutput) {
      handleFail(props.output);
      setHandledFailOutput(true);
    }
    // eslint-disable-next-line
  }, [props.runCodeOk, props.runCodeFail]);

  return (
    <Fragment>
      <header>
        <p>Hello there</p>
        <button onClick={handleSubmit}>Submit</button>
        <div class="dropdown">
          <button>{language}</button>
          <ul class="dropdown-content">
            {languages.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>
        </div>
      </header>
      <div className="code-layout">
        <AceEditor
          placeholder="Write Code. Change the world. Have fun while doing it :)"
          mode={language}
          theme={theme}
          name="text-edit"
          // onLoad={onLoad}
          onChange={onChange}
          fontSize={17}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={codeText}
          readOnly={props.runCodeLoading}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: tabs,
          }}
          editorProps={{ $blockScrolling: true }}
        />
        <div className="code-results">
          <AceEditor
            placeholder="Output will be shown here."
            mode="text"
            theme={theme}
            name="code-results"
            fontSize={15}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            value={results}
            readOnly={true}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  output: state.executionReducer.output,
  runCodeLoading: state.executionReducer.runCodeLoading,
  runCodeFail: state.executionReducer.runCodeFail,
  runCodeOk: state.executionReducer.runCodeOk,
});

export default connect(mapStateToProps, { runCode })(Execute);
