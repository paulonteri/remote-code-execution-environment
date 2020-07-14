const fs = require("fs");
const Path = require("path");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");
const config = require("./config");
const env = process.env.NODE_ENV;
const configPath = config.codePath;
const timeOut = config.timeOut;

const validate = (str) => {
  // prevent handling files
  words = ["java.io.File"];
  if (words.every((el) => str.toLowerCase().includes(el.toLowerCase()))) {
    return false;
  }
  return true;
};

const runCode = (code, func) => {
  if (validate(code)) {
    if (!code.match(RegExp(/\bclass\W+(?:\w+\W+){0}?Main\b/g))) {
      return func({ ERROR: 'Include a correct "Main" class!' });
    } else if (!code.match(RegExp(/\bpublic\W+(?:\w+\W+){2}?main\b/g))) {
      return func({ ERROR: 'Include a correct "main()" method!' });
    }

    var folderName = uuidv1();
    var filename = "Main.java";
    var folder = configPath + folderName;
    var path = folder + "/";

    fs.mkdir(folder, 0777, function (err) {
      if (err) {
        func({ ERROR: "Server error" });
      } else {
        fs.writeFile(path + filename, code, function (err) {
          if (err) {
            // handle error
            console.log("Error creating file: " + err);
          } else {
            var command =
              "cd " + folder + " && " + " javac Main.java" + "&& java Main";
            exec(command, { timeout: timeOut }, function (
              error,
              stdout,
              stderr
            ) {
              if (error) {
                if (env != "production") {
                  console.log("Error: " + error);
                  console.log("Stderr: " + stderr);
                }

                if (
                  error.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")
                ) {
                  errorMessage =
                    "Process terminated. 'maxBuffer' exceeded. This normally happens during an infinite loop.";
                } else if (error.signal === "SIGTERM") {
                  errorMessage =
                    "Process terminated. Please check your code and try again.";
                } else if (stderr) {
                  errorMessage = stderr;
                } else {
                  errorMessage = "Something went wrong. Please try again";
                }
                func({ ERROR: errorMessage }, folder);
              } else {
                if (env != "production") {
                  console.log("Successfully executed !");
                  console.log("Stdout: " + stdout);
                }
                func({ stdout: stdout }, folder);
              }
            });
          }
        });
      }
    });
  } else {
    console.log(code);
    func({ ERROR: "Not allowed!" });
  }
};

const run = (code, func) => {
  runCode(code, function (data, dir = null) {
    if (dir) {
      if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach((file, index) => {
          const curPath = Path.join(dir, file);
          fs.unlinkSync(curPath);
        });
        fs.rmdirSync(dir);
      }
    }
    // add more logic
    func(data);
  });
};

module.exports = { run: run };
