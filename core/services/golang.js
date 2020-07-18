const fs = require('fs');
const Path = require('path');
const exec = require('child_process').exec;
const { v1: uuidv1 } = require('uuid');
const config = require('./config');
const env = process.env.NODE_ENV;
const configPath = config.codePath;
const timeOut = config.timeOut;

const validate = (str) => {
    // Prevent OS Operations in Go
    reg1 = RegExp(/\bimport\W+(?:\w+\W+){0,}(?:os)\b/g);
    if (str.match(reg1)) {
        return false;
    }
    return true;
};

const runCode = (code, func) => {
    if (validate(code)) {
        // Go Basic Code Validation
        // include package main and main method
        if (!code.match(RegExp(/\bpackage\W+(?:\w+\W+){0}?main\b/g))) {
            return func({
                ERROR: 'Your Program must include a "main" package!',
            });
        } else if (!code.match(RegExp(/(?:func\ main)/))) {
            return func({ ERROR: 'You must include a "main()" function!' });
        }

        var folderName = uuidv1();
        var filename = 'main.go';
        var folder = configPath + folderName;
        var path = folder + '/';

        fs.mkdir(folder, 0777, function (err) {
            if (err) {
                func({ ERROR: 'Server error' });
            } else {
                fs.writeFile(path + filename, code, function (err) {
                    if (err) {
                        // handle error
                        console.log('Error creating file: ' + err);
                    } else {
                        var command =
                            'cd ' + folder + ' && ' + ' go run main.go';
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
        func({ ERROR: 'Not allowed!' });
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
