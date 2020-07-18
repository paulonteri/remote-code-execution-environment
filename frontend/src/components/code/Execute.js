import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import AceEditor from "react-ace";
import { AtomSpinner, SwappingSquaresSpinner } from "react-epic-spinners";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { runCode } from "../../actions/Execute";
import { csDefault, pyDefault, javaDefault, jsDefault, golangDefault, rustDefault } from "./defaults";
import "./css/Execute.css";
import "../header/css/Header.css";
import playGrayIcon from "../../media/icon-play-light-gray.png";
// import playBlackIcon from "../../media/icon-play-black.png";
// import gearsIcon from "../../media/icon-gears.png";
import octoGray from "../../media/icon-octocat-gray.png";
// import octoBlack from "../../media/icon-octocat-black.png";

const languages = ["javascript", "java", "python", "csharp", "golang", "rust"];
const themes = ["dracula", "monokai"];
const tabSizes = [2, 4, 8];
const fontSizes = [12, 14, 16, 18, 20, 22, 24, 28, 30, 32];
themes.forEach((theme) =>
  require(`ace-builds/src-min-noconflict/theme-${theme}`)
);
languages.forEach((lang) => {
  require(`ace-builds/src-min-noconflict/mode-${lang}`);
  require(`ace-builds/src-min-noconflict/snippets/${lang}`);
});

function Execute(props) {
  const [theme, setTheme] = useState("dracula");
  const [language, setLangauge] = useState("python");
  const [codeText, setCodeText] = useState(pyDefault);
  const [tabs, setTabs] = useState(4);
  const [fontSize, setFontSize] = useState(17);
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

  const onLanguageChange = (lang) => {
    if ([pyDefault, jsDefault, javaDefault, csDefault, golangDefault, rustDefault].includes(codeText) || !codeText) {
      if (lang === "python") {
        setCodeText(pyDefault);
      } else if (lang === "java") {
        setCodeText(javaDefault);
      } else if (lang === "javascript") {
        setCodeText(jsDefault);
      } else if (lang === "csharp") {
        setCodeText(csDefault);
      } else if (lang === 'golang') {
        setCodeText(golangDefault);
      } else if (lang === 'rust') {
        setCodeText(rustDefault);
      }
    }
    setLangauge(lang);
  };

  const onThemeChange = (th) => {
    setTheme(th);
    // more logic
  };

  const onTabChange = (tb) => {
    setTabs(tb);
  };

  const onFontSzChange = (fn) => {
    setFontSize(fn);
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

  useEffect(() => {
    if (props.runCodeLoading) {
      document.getElementById("overlay").style.display = "block";
    } else {
      document.getElementById("overlay").style.display = "none";
    }
    // eslint-disable-next-line
  }, [props.runCodeLoading]);

  return (
    <Fragment>
      <header>
        <div className="header-intro">
          <a
            href="https://github.com/paulonteri/remote-code-execution-environment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={octoGray} alt="Octocat Logo" />
          </a>
        </div>
        <div className="header-buttons">
          <div className="dropdown">
            <button id="langauge-btn">
              {language === "csharp" ? "C#" : language}
            </button>
            <ul className="dropdown-content">
              {languages
                .filter((lang) => lang !== language)
                .map((obj) => (
                  <li
                    key={obj}
                    onClick={() => {
                      onLanguageChange(obj);
                    }}
                  >
                    {obj === "csharp" ? "C#" : obj}
                  </li>
                ))}
            </ul>
          </div>
          <div className="dropdown hide-tablet">
            <button>{theme}</button>
            <ul className="dropdown-content">
              {themes
                .filter((th) => th !== theme)
                .map((obj) => (
                  <li
                    key={obj}
                    onClick={() => {
                      onThemeChange(obj);
                    }}
                  >
                    {obj}
                  </li>
                ))}
            </ul>
          </div>
          <div className="dropdown hide-mobile">
            <button>Tab Size: {tabs}</button>
            <ul className="dropdown-content">
              {tabSizes
                .filter((tb) => tb !== tabs)
                .map((obj) => (
                  <li
                    key={obj}
                    onClick={() => {
                      onTabChange(obj);
                    }}
                  >
                    {obj}
                  </li>
                ))}
            </ul>
          </div>

          <div className="dropdown  hide-tablet">
            <button>Font Size: {fontSize}</button>
            <ul className="dropdown-content">
              {fontSizes
                .filter((fn) => fn !== fontSizes)
                .map((obj) => (
                  <li
                    key={obj}
                    onClick={() => {
                      onFontSzChange(obj);
                    }}
                  >
                    {obj}
                  </li>
                ))}
            </ul>
          </div>

          <div className="run-code">
            {props.runCodeLoading ? (
              <SwappingSquaresSpinner
                size={45}
                color="var(--editer-light-gray)"
              ></SwappingSquaresSpinner>
            ) : (
                <Fragment>
                  <img
                    src={playGrayIcon}
                    alt="Play Button"
                    onClick={handleSubmit}
                  />
                  <span className="tooltiptext">Run Code</span>
                </Fragment>
              )}
          </div>
        </div>
      </header>
      <div className="code-layout" id="code-layout">
        <AceEditor
          placeholder="Write Code. Change the world. Have fun while doing it :)"
          mode={language}
          theme={theme}
          name="text-edit"
          // onLoad={onLoad}
          onChange={onChange}
          fontSize={fontSize}
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
            fontSize={fontSize + 2}
            showPrintMargin={false}
            showGutter={false}
            highlightActiveLine={false}
            value={results}
            readOnly={false}
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
      <div id="overlay">
        <AtomSpinner
          size={120}
          className="spinner"
          color="var(--editer-light-gray)"
        ></AtomSpinner>
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
