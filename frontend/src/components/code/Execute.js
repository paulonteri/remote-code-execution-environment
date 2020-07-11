import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { runCode, runCodeTest } from "../../actions/Execute";
import "./css/Execute.css";

const languages = ["javascript", "java", "python"];
const themes = ["dracula", "monokai"];
themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

function Execute(props) {
  // state = {
  //   text: `print("This code is running remotely!")`,
  //   theme: "python",
  //   language: "python",
  //   results: null,
  // };

  const [codeText, setCodeText] = useState(
    `print("This code is running remotely!")`
  );
  const [theme, setTheme] = useState("dracula");
  const [language, setLangauge] = useState("python");
  const [results, setResults] = useState(null);
  const [inserted, setInserted] = useState(false);

  const onChange = (values) => {
    setCodeText(values);
  };

  const printSucResults = (res) => {
    setResults(res);
    if (document) {
      var el = document.getElementById("code-results");
      el.style.color = "azure";
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
    setInserted(false);
    // if (data) {
    //   const printSucResults = (res) => {
    //     setResults(res)
    //     if (document) {
    //       var el = document.getElementById("code-results");
    //       el.style.color = "azure";
    //     }
    //   };

    //   const printErrResults = (res) => {
    //     setResults(res)
    //     if (document) {
    //       var el = document.getElementById("code-results");
    //       el.style.color = "red";
    //     }
    //   };

    //   setCodeText("")
    //   var content = new FormData();
    //   content.append("text", data);
    //   content.append("language", language);
    //   e.preventDefault();
    //   runCode(content, function (res, failed) {
    //     if (failed) {
    //       if (res) {
    //         printErrResults(res);
    //       } else {
    //         printErrResults(
    //           "Something went wrong. Please check your code and try again later."
    //         );
    //       }
    //     } else {
    //       if (res) {
    //         if (res.ERROR) {
    //           printErrResults(res.ERROR);
    //         } else if (res.stdout) {
    //           printSucResults(res.stdout);
    //         } else {
    //           printSucResults("Code executed successfully with no outputs :)");
    //         }
    //       } else {
    //         printSucResults("Code executed successfully with no outputs :)");
    //       }
    //     }
    //   });
    // } else {
    //   // printErrResults("Please write some code.");
    // }
    setCodeText("");
    var content = new FormData();
    content.append("text", data);
    content.append("language", language);
    props.runCodeTest(content);
  };

  // useEffect(() => {
  //   console.log(props);
  //   console.log(props.runCodeOk);
  //   if (props.runCodeOk) {
  //     setResults(props.output);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    console.log(props);
    console.log(props.runCodeOk);

    if (props.runCodeOk && !inserted) {
      setResults(props.output.stdout);
      setInserted(true);
    }
    // eslint-disable-next-line
  }, [props.runCodeOk]);

  return (
    <Fragment>
      <header>
        <p>Hello there</p>
        <button onClick={handleSubmit}>Submit</button>
      </header>
      <div className="code-layout">
        <AceEditor
          placeholder="Write Code"
          mode={language}
          theme={theme}
          name="text-edit"
          // onLoad={onLoad}
          onChange={onChange}
          fontSize={15}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={codeText}
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
            theme={theme}
            name="code-results"
            fontSize={14}
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

export default connect(mapStateToProps, { runCodeTest })(Execute);
