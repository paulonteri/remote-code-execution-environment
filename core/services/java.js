const fs = require("fs");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");
const config = require("./config");
const env = process.env.NODE_ENV;
const configPath = config.codePath;
const timeOut = config.timeOut;

run = (code, func) => {
  var folderName = uuidv1();
  var filename = "Main.java";
  var folder = configPath + folderName;
  console.log(configPath);
  var path = folder + "/";

  // https://nodejs.org/api/fs.html#fs_fs_mkdir_path_options_callbacks
  // fs.mkdir(path, mode, callback)
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
    }
  });
};

module.exports = { run: run };
