var fs = require("fs");
var exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");

const path = process.env.CODE_PATH || "../../";

run = (code, func) => {
  var filename = uuidv1();

  // create python file
  fs.writeFile(path + filename + ".py", code, function (err) {
    if (err) {
      console.log("Error creating file: " + err);
    } else {
      //
      // run python
      var command = "python " + path + filename + ".py";
      exec(command, function (error, stdout, stderr) {
        // handle execution errors
        if (error) {
          console.log("Error:" + err);
          console.log("stderr:" + stderr);
          func({ error: stderr });
        }
        // success
        else {
          console.log("Python file successfully executed !");
          var out = { output: stdout };
          func(out);
        }
      });
    }
  });
};

module.exports = { run: run };
