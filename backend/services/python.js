const fs = require("fs");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");
const path = process.env.CODE_PATH || "../../";
const timeOut = process.env.TIME_OUT || 5000;

run = (code, func) => {
  var filename = uuidv1();

  fs.writeFile(path + filename + ".py", code, function (err) {
    if (err) {
      console.log("Error creating file: " + err);
    } else {
      var command = "python " + path + filename + ".py";
      exec(command, { timeout: timeOut }, function (error, stdout, stderr) {
        if (error) {
          console.log(error);
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          console.log(stderr);

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
          func(errorMessage);
        } else {
          console.log("Python file successfully executed !");
          func(stdout);
        }
      });
    }
  });
};

module.exports = { run: run };
