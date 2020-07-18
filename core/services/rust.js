const fs = require('fs');
const Path = require('path');
const exec = require('child_process').exec;
const { v1: uuidv1 } = require('uuid');
const config = require('./config');
const env = process.env.NODE_ENV;
const configPath = config.codePath;
const timeOut = config.timeOut;

const validate = (str) => {
    // Prevent bringing of std::io, std::net and std::process into scope
    if (str.match(RegExp(/(?:(?:std::net;)|(?:(?:std\:\:io\;))|(?:(?:std\:\:process\;)))/))) {
      return false;
    }
    // Prevent inline usage of td::io, std::net and std::process
    if (str.match(RegExp(/(?:(?:std::process)|(?:(?:std\:\:net))|(?:(?:std\:\:io)))/m))) {
      return false;
    }
    return true;
};

const runCode = (code, func) => {
    if (validate(code)) {
      // Validate rust code
      // include main function
      if (!code.match(RegExp(/fn main/m))) {
        return func({
          ERROR: 'Your Program must contain a `main` function!',
        });
      }

      var folderName = uuidv1();
      var file = "main"
      var extension = ".rs"
      var fullName = `${file}${extension}`;
      var folder = configPath + folderName;
      var path = folder + '/';

      fs.mkdir(folder, 0777, function (err) {
          if (err) {
              func({ ERROR: 'Server error' });
          } else {
              fs.writeFile(path + fullName, code, function (err) {
                  if (err) {
                      // handle error
                      console.log('Error creating file: ' + err);
                  } else {
                      var x =
                              'cd ' + folder + ' && ' + ' go run main.go';
                      var command = `cd ${folder} && rustc ${fullName} && chmod +x ${file} && ./${file}`;
                      exec(command, { timeout: timeOut }, function (
                          error,
                          stdout,
                          stderr
                      ) {
                          if (error) {
                              if (env != 'production') {
                                  console.log('Error: ' + error);
                                  console.log('Stderr: ' + stderr);
                              }

                              if (
                                  error
                                      .toString()
                                      .includes(
                                          'ERR_CHILD_PROCESS_STDIO_MAXBUFFER'
                                      )
                              ) {
                                  errorMessage =
                                      "Process terminated. 'maxBuffer' exceeded. This normally happens during an infinite loop.";
                              } else if (error.signal === 'SIGTERM') {
                                  errorMessage =
                                      'Process terminated. Please check your code and try again.';
                              } else if (stderr) {
                                  errorMessage = stderr;
                              } else {
                                  errorMessage =
                                      'Something went wrong. Please try again';
                              }
                              func({ ERROR: errorMessage }, folder);
                          } else {
                              if (env != 'production') {
                                  console.log('Successfully executed !');
                                  console.log('Stdout: ' + stdout);
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
        func({ ERROR: "Use of std::io, std::process and std::net is not allowed" });
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
