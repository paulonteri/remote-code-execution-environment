const fs = require("fs");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");
const path = process.env.CODE_PATH || "../../";
const timeOut = process.env.TIME_OUT || 5000;
const env = process.env.NODE_ENV;

run = (code, func) => {
  var filename = uuidv1();

  fs.writeFile(path + filename + ".py", code, function (err) {
    if (err) {
      console.log("Error creating file: " + err);
    } else {
      var command = "python " + path + filename + ".py";
      exec(command, { timeout: timeOut }, function (error, stdout, stderr) {
        if (error) {
          if (env != "production") {
            console.log("Error: " + error);
            console.log("Stderr: " + stderr);
          }

          if (error.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")) {
            errorMessage =
              "Process terminated. 'maxBuffer' exceeded. This normally happened during an infinite loop.";
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
};

// run('print("Hello World")    \nprint(1+2)\nwhile(True):   1+2', function (
//   data
// ) {
//   console.log(data);
// });

module.exports = { run: run };
