const fs = require("fs");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");
const config = require("./config");
const env = process.env.NODE_ENV;
const configPath = config.codePath;
const timeOut = config.timeOut;

// Hacky validation
const validate = (str) => {
  reg1 = RegExp(/\bimport\W+(?:\w+\W+){0,}?os\b/g);
  words = ["open("];

  if (str.match(reg1)) {
    return false;
  } else if (
    words.every((el) => str.toLowerCase().includes(el.toLowerCase()))
  ) {
    return false;
  }
  return true;
};

run = (code, func) => {
  if (validate(code)) {
    fs.writeFile(configPath + fileName + ".py", code, function (err) {
      var fileName = uuidv1();
      if (err) {
        // handle error
        console.log("Error creating file: " + err);
      } else {
        var command = "python3 " + configPath + fileName + ".py";
        exec(command, { timeout: timeOut }, function (error, stdout, stderr) {
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
            func({ ERROR: errorMessage });
          } else {
            if (env != "production") {
              console.log("Successfully executed !");
              console.log("Stdout: " + stdout);
            }
            func({ stdout: stdout });
          }
        });
      }
    });
  } else {
    func({ ERROR: "Not allowed!" });
  }
};

// run('print("Hello World")    \nprint(1+2)\nwhile(True):   1+2', function (
//   data
// ) {
//   console.log(data);
// });

module.exports = { run: run };
